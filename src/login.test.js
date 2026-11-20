import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Login from './login';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

afterEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
});

test('navigates home after successful login', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ token: 'token', username: 'reader', role: 'admin' }),
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'reader' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /^login$/i }));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
        username: 'reader',
        password: 'password123',
    });
    expect(window.localStorage.getItem('bookhubToken')).toBe('token');
    expect(window.localStorage.getItem('bookhubRole')).toBe('admin');
    expect(window.localStorage.getItem('bookhubUsername')).toBe('reader');
});
