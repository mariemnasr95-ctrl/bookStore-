import React from 'react';
import './fantasy.css';
import { BookGrid, toGenreSlug, useBooks } from './book-catalog';
import fs from './media/fantasy.jpg';
import fs2 from './media/fantasy2.jpg';
import fs3 from './media/fantasy3.jpg';
import fs4 from './media/fantasy4.jpg';
import fs5 from './media/fantasy5.jpg';
import fs6 from './media/fantasy6.jpg';
import fs7 from './media/fantasy7.jpg';

const fantasyBooks = [
    { image: fs, title: 'Soulfyre' },
    { image: fs2, title: 'The Bells of Ivory' },
    { image: fs3, title: 'Ash of the FLameBorne' },
    { image: fs4, title: 'The Floating World ' },
    { image: fs5, title: 'The Threads of Elyndra ' },
    { image: fs6, title: 'The Age Storms' },
    { image: fs7, title: 'Ravent of Three Calamities' }

];

function Fantasy() {
    const { books, error } = useBooks();
    const fantasyCatalogBooks = books.filter((book) => toGenreSlug(book.genre || '') === 'fantasy');

    return (
        <main className="fantasy-page">
            <div className="fantasy-content">
                <h2>Fantasy</h2>
                <p>Fantasy is a genre of fiction that involves magic, mythical creatures, and imaginary worlds.</p>
                {error && <p className="catalog-error" role="alert">{error}</p>}
                <BookGrid
                    books={[
                        ...fantasyCatalogBooks,
                        ...fantasyBooks.map((book, index) => ({
                            ...book,
                            id: `featured-fantasy-${index}`,
                            url: index === 0 ? '/Welcome-To-The-Hyunam-Dong-Bookshop.pdf' : book.image,
                        })),
                    ]}
                />
            </div>
        </main>
    )
}

export default Fantasy;