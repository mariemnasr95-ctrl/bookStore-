import { useState } from 'react';
import { LockKeyhole, LogIn, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Unable to log in.');
                return;
            }

            window.localStorage.setItem('bookhubToken', data.token);
            window.localStorage.setItem('bookhubRole', data.role || 'user');
            window.localStorage.setItem('bookhubUsername', data.username || form.username);
            navigate('/');
        } catch (err) {
            setError('Cannot reach the server. Is it running?');
        }
    };

    return (
        <div className="login-page">
            <nav>
               <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">Genre</a></li>
                    <li><a href="/type">type</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="username">Username:</label>
                        <div className="input-with-icon">
                            <User className="input-icon" size={18} aria-hidden="true" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <div className="input-with-icon">
                            <LockKeyhole className="input-icon" size={18} aria-hidden="true" />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                    {error && <p className="error" role="alert">{error}</p>}
                    <button type="submit"><LogIn size={18} aria-hidden="true" /> Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;