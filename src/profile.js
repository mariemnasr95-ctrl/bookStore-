import { useEffect, useState } from 'react';
import './signup.css';

const API = 'http://localhost:5000/api';
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('bookhubToken')}`,
});

const LISTS = [
  { status: 'favorite', label: 'Favorite books' },
  { status: 'read', label: 'Books I have read' },
  { status: 'to_read', label: 'Books to read' },
];

function Profile() {
  const [myBooks, setMyBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [pick, setPick] = useState({});

  const load = async () => {
    const mine = await fetch(`${API}/me/books`, { headers: authHeaders() });
    if (mine.ok) setMyBooks(await mine.json());
    const all = await fetch(`${API}/books`);
    setAllBooks(await all.json());
  };
  useEffect(() => { load(); }, []);

  if (!localStorage.getItem('bookhubToken'))
    return <p>Please <a href="/login">log in</a> to see your profile.</p>;

  const addToList = async (status) => {
    const bookId = pick[status];
    if (!bookId) return;
    await fetch(`${API}/me/books`, {
      method: 'POST', headers: authHeaders(), body: JSON.stringify({ bookId, status }),
    });
    load();
  };

  const removeFromList = async (bookId, status) => {
    await fetch(`${API}/me/books/${bookId}/${status}`, {
      method: 'DELETE', headers: authHeaders(),
    });
    load();
  };

  return (
    <div className="signup-page">
      <nav><h1>bookhub</h1></nav>
      <div className="signup-container">
        <h2>{localStorage.getItem('bookhubUsername')}'s profile</h2>
        {LISTS.map(({ status, label }) => (
          <section key={status}>
            <h3>{label}</h3>
            <ul>
              {myBooks.filter((b) => b.status === status).map((b) => (
                <li key={b.id}>
                  {b.title} ({b.genre}){' '}
                  <button onClick={() => removeFromList(b.id, status)}>Remove</button>
                </li>
              ))}
            </ul>
            <select
              value={pick[status] || ''}
              onChange={(e) => setPick({ ...pick, [status]: e.target.value })}
            >
              <option value="">Choose a book…</option>
              {allBooks.map((b) => (
                <option key={b.id} value={b.id}>{b.title}</option>
              ))}
            </select>
            <button onClick={() => addToList(status)}>Add</button>
          </section>
        ))}
      </div>
    </div>
  );
}
export default Profile;