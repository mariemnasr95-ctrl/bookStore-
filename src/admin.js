import { useEffect, useState } from 'react';
import './signup.css'; // reuse your existing styles for now

const API = 'http://localhost:5000/api';
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('bookhubToken')}`,
});

function Admin() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', genre: '', type: '' });
  const [error, setError] = useState('');

  const loadBooks = async () => {
    const res = await fetch(`${API}/books`);
    setBooks(await res.json());
  };
  useEffect(() => { loadBooks(); }, []);

  if (localStorage.getItem('bookhubRole') !== 'admin')
    return <p>Admins only.</p>;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addBook = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch(`${API}/books`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setError(data.error);
    setForm({ title: '', genre: '', type: '' });
    loadBooks();
  };

  const removeBook = async (id) => {
    if (!window.confirm('Remove this book?')) return;
    await fetch(`${API}/books/${id}`, { method: 'DELETE', headers: authHeaders() });
    loadBooks();
  };

  return (
    <div className="signup-page">
      <nav><h1>bookhub</h1></nav>
      <div className="signup-container">
        <h2>Add a book</h2>
        <form onSubmit={addBook}>
          <div className="form-field">
            <label htmlFor="title">Title:</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="genre">Genre:</label>
            <input id="genre" name="genre" value={form.genre} onChange={handleChange} required />
          </div>
          <div className="form-field">
            <label htmlFor="type">Type:</label>
            <input id="type" name="type" value={form.type} onChange={handleChange} required />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Add book</button>
        </form>

        <h2>All books</h2>
        <table>
          <thead><tr><th>Title</th><th>Genre</th><th>Type</th><th></th></tr></thead>
          <tbody>
            {books.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td><td>{b.genre}</td><td>{b.type}</td>
                <td><button onClick={() => removeBook(b.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Admin;