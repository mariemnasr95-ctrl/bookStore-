import React, { useState } from 'react';
import './home.css';
import bookOne from './media/py.jpg';
import bookTwo from './media/i.jpg';
import bookThree from './media/focus.jpg';
import bookFour from './media/eye.jpg';
import bookFive from './media/d.jpg';
import bookSix from './media/cr.jpg';
import bookSeven from './media/b0360b33709e7f91eaee46c9e2382e3f.jpg';
import bookEight from './media/b.jpg';
import bookNine from './media/7e59eeb54539866ffc05e048e89013e5.jpg';
import bookTen from './media/076fa88280945a082c48b51f42f78329.jpg';
import { BookGrid, useBooks } from './book-catalog';

const books = [
    { image: bookOne, title: 'Book collection 1' },
    { image: bookTwo, title: 'Book collection 2' },
    { image: bookThree, title: 'Book collection 3' },
    { image: bookFour, title: 'Book collection 4' },
    { image: bookFive, title: 'Book collection 5' },
    { image: bookSix, title: 'Book collection 6' },
    { image: bookSeven, title: 'Book collection 7' },
    { image: bookEight, title: 'Book collection 8' },
    { image: bookNine, title: 'Book collection 9' },
    { image: bookTen, title: 'Book collection 10' },
];

function Home(){
    const { books: catalogBooks, error: booksError } = useBooks();
    const [session, setSession] = useState(() => ({
        username: window.localStorage.getItem('bookhubUsername'),
        role: window.localStorage.getItem('bookhubRole'),
    }));

    const handleLogout = () => {
        window.localStorage.removeItem('bookhubToken');
        window.localStorage.removeItem('bookhubRole');
        window.localStorage.removeItem('bookhubUsername');
        setSession({ username: null, role: null });
    };

    return (
        <div className="home-container">
            <nav>
               <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">Genre</a></li>
                    <li><a href="/type">type</a></li>
                    {session.role === 'admin' && (
                        <li><a href="/admin/books/new">Add book</a></li>
                    )}
                    {session.username ? (
                        <>
                            <li className="home-account">
                                Signed in as {session.username}{session.role === 'admin' ? ' (Admin)' : ''}
                            </li>
                            <li><button className="home-logout" type="button" onClick={handleLogout}>Log out</button></li>
                        </>
                    ) : (
                        <li><a href="/login">Login</a></li>
                    )}
                </ul>
            </nav>
            <div className="home-content">
                <h2>{session.username ? `Welcome back, ${session.username}` : 'Welcome to BookHub'}</h2>
                <p>Your one-stop destination for all things books!</p>
                {booksError && <p className="catalog-error" role="alert">{booksError}</p>}
                <BookGrid
                    books={[
                        ...catalogBooks,
                        ...books.map((book, index) => ({
                            ...book,
                            id: `featured-${index}`,
                            url: index === 0 ? '/Welcome-To-The-Hyunam-Dong-Bookshop.pdf' : book.image,
                        })),
                    ]}
                    emptyMessage="No books are available yet."
                />
            </div>
        </div>
    )
}
export default Home;