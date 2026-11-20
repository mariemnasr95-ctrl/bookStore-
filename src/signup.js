import { useState } from 'react';
import { LockKeyhole, Mail, User, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function Signup() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Unable to create your account.');
                return;
            }
            navigate('/login');
        } catch (err) {
            setError('Cannot reach the server. Is it running?');
        }
    };

    return (
        <div className="signup-page">
            <nav>
                <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">Genre</a></li>
                    <li><a href="/type">type</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <div className="signup-container">
                <h2>Sign Up</h2>
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
                        <label htmlFor="email">Email:</label>
                        <div className="input-with-icon">
                            <Mail className="input-icon" size={18} aria-hidden="true" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
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
                    {error && <p className="error">{error}</p>}
                    <button type="submit">
                        <UserPlus size={18} aria-hidden="true" /> Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Signup;