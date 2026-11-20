import React from 'react';
import './sciencefiction.css';
import { BookGrid, toGenreSlug, useBooks } from './book-catalog';
import sf1 from './media/sf1.jpg';  
import sf2 from './media/sf2.jpg';
import sf3 from './media/sf3.jpg';
import sf4 from './media/sf4.jpg';
import sf5 from './media/sf5.jpg';
import sf6 from './media/sf6.jpg';
import sf7 from './media/sf7.jpg';
import sf8 from './media/sf8.jpg';

const scienceFictionBooks = [
    { image: sf1, title: 'Transcendental' },
    { image: sf2, title: 'Humanity Lost' },
    { image: sf3, title: 'Beyond The Veil ' },    
    { image: sf4, title: 'First Encounter' },
    { image: sf5, title: 'The Dark World ' },
    { image: sf6, title: 'Outsphere ' },
    { image: sf7, title: 'Climate Of Chaos ' },
    { image: sf8, title: 'Year Zero' }
]



function ScienceFiction() {
    const { books, error } = useBooks();
    const scienceFictionCatalogBooks = books.filter((book) => {
        const slug = toGenreSlug(book.genre || '');
        return slug === 'science-fiction' || slug === 'sciencefiction';
    });

    return (
        <main className="science-fiction-page">
            <div className="science-fiction-content">
                <h1>Science Fiction</h1>
                <p>Science fiction explores futuristic ideas, advanced technology, space travel, and the possibilities of other worlds.</p>
                {error && <p className="catalog-error" role="alert">{error}</p>}
                <BookGrid
                    books={[
                        ...scienceFictionCatalogBooks,
                        ...scienceFictionBooks.map((book, index) => ({
                            ...book,
                            id: `featured-scifi-${index}`,
                            url: book.image,
                        })),
                    ]}
                />
            </div>
        </main>

    );
 }
export default ScienceFiction;