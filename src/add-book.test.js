import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import AddBook from './add-book';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

afterEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
});

test('allows an admin to submit a book with their login token', async () => {
    window.localStorage.setItem('bookhubRole', 'admin');
    window.localStorage.setItem('bookhubToken', 'admin-token');
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Book added.' }),
    });

    render(<AddBook />);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'A Book' } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'An Author' } });
    fireEvent.change(screen.getByLabelText('Genre'), { target: { value: 'Fantasy' } });
    fireEvent.click(screen.getByRole('button', { name: 'Add book' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Book added successfully.'));
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:5000/api/books', expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer admin-token' }),
    }));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
        title: 'A Book',
        author: 'An Author',
        genre: 'Fantasy',
    });
});

test('does not show the add-book form to a regular user', () => {
    window.localStorage.setItem('bookhubRole', 'user');
    useNavigate.mockReturnValue(jest.fn());

    render(<AddBook />);

    expect(screen.getByText(/admin access is required/i)).toBeInTheDocument();
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument();
});
