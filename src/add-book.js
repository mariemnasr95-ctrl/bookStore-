import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './add-book.css';

const emptyBook = {
    title: '',
    author: '',
    genre: '',
    description: '',
    coverUrl: '',
    bookUrl: '',
};

export default function AddBook() {
    const [form, setForm] = useState(emptyBook);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();
    const isAdmin = window.localStorage.getItem('bookhubRole') === 'admin';

    if (!isAdmin) {
        return (
            <main className="add-book-page">
                <p>Admin access is required to add books.</p>
                <a href="/">Return home</a>
            </main>
        );
    }

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        setSaved(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSaved(false);

        try {
            const response = await fetch('http://localhost:5000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${window.localStorage.getItem('bookhubToken') || ''}`,
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'Unable to add this book.');
                return;
            }

            setForm(emptyBook);
            setSaved(true);
        } catch (requestError) {
            setError('Cannot reach the server. Is it running?');
        }
    };

    return (
        <div className="add-book-page">
            <nav>
                <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">Genre</a></li>
                    <li><a href="/type">Type</a></li>
                </ul>
            </nav>
            <main className="add-book-container">
                <a className="add-book-back" href="/">Return home</a>
                <h2>Add a book</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input id="title" name="title" value={form.title} onChange={handleChange} required />

                    <label htmlFor="author">Author</label>
                    <input id="author" name="author" value={form.author} onChange={handleChange} required />

                    <label htmlFor="genre">Genre</label>
                    <input id="genre" name="genre" value={form.genre} onChange={handleChange} required />

                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={form.description} onChange={handleChange} rows="4" />

                    <label htmlFor="coverUrl">Cover image URL</label>
                    <input id="coverUrl" name="coverUrl" type="url" value={form.coverUrl} onChange={handleChange} />

                    <label htmlFor="bookUrl">Book or PDF URL</label>
                    <input id="bookUrl" name="bookUrl" type="url" value={form.bookUrl} onChange={handleChange} />

                    {error && <p className="add-book-error" role="alert">{error}</p>}
                    {saved && <p className="add-book-success" role="status">Book added successfully.</p>}
                    <button type="submit">Add book</button>
                </form>
                <button className="home-button" type="button" onClick={() => navigate('/')}>Home</button>
            </main>
        </div>
    );
}
