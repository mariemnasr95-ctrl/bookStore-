import { useEffect, useState } from 'react';
import './book-catalog.css';

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        fetch('http://localhost:5000/api/books')
            .then(async (response) => {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Unable to load books.');
                }
                return data;
            })
            .then((data) => {
                if (active) setBooks(data);
            })
            .catch(() => {
                if (active) setError('Could not load books from the server.');
            });

        return () => {
            active = false;
        };
    }, []);

    return { books, error };
}

export function toGenreSlug(genre) {
    return genre
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function BookCard({ book }) {
    const image = book.image || book.cover_url || book.coverUrl;
    const link = book.url || book.pdf_url || book.book_url || book.bookUrl || image;
    const content = (
        <>
            {image
                ? <img src={image} alt={`Cover of ${book.title}`} />
                : <div className="catalog-book-placeholder" aria-hidden="true">BookHub</div>}
            <span>{book.title}</span>
            {book.author && <span className="catalog-book-author">{book.author}</span>}
        </>
    );

    return (
        <article className="catalog-book-card">
            {link
                ? <a href={link} target="_blank" rel="noreferrer">{content}</a>
                : content}
        </article>
    );
}

export function BookGrid({ books, emptyMessage = 'No books in this collection yet.' }) {
    if (books.length === 0) {
        return <p className="catalog-empty">{emptyMessage}</p>;
    }

    return (
        <div className="catalog-book-grid">
            {books.map((book, index) => (
                <BookCard key={book.id || `${book.title}-${index}`} book={book} />
            ))}
        </div>
    );
}
