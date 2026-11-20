import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from './home';

afterEach(() => {
    window.localStorage.clear();
});

test('shows the admin add-book link and signed-in status after login', () => {
    window.localStorage.setItem('bookhubUsername', 'reader');
    window.localStorage.setItem('bookhubRole', 'admin');
    window.localStorage.setItem('bookhubToken', 'token');

    render(<Home />);

    expect(screen.getByText('Signed in as reader (Admin)')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Add book' })).toHaveAttribute('href', '/admin/books/new');
    expect(screen.getByRole('heading', { name: 'Welcome back, reader' })).toBeInTheDocument();
});

test('logs out and hides the admin add-book link', () => {
    window.localStorage.setItem('bookhubUsername', 'reader');
    window.localStorage.setItem('bookhubRole', 'admin');
    window.localStorage.setItem('bookhubToken', 'token');

    render(<Home />);
    fireEvent.click(screen.getByRole('button', { name: 'Log out' }));

    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Add book' })).not.toBeInTheDocument();
    expect(window.localStorage.getItem('bookhubToken')).toBeNull();
});

test('shows books returned by the server on the home page', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [{
            id: 42,
            title: 'New Fantasy Book',
            author: 'Book Author',
            genre: 'Fantasy',
            cover_url: 'https://example.com/cover.jpg',
            pdf_url: 'https://example.com/book.pdf',
        }],
    });

    render(<Home />);

    await waitFor(() => expect(screen.getByText('New Fantasy Book')).toBeInTheDocument());
    expect(screen.getByText('Book Author')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /New Fantasy Book/ })).toHaveAttribute(
        'href',
        'https://example.com/book.pdf'
    );
});
