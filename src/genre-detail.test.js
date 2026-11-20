import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import GenreDetail from './genre-detail';

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

afterEach(() => {
    jest.restoreAllMocks();
});

test('shows the details for the selected genre', () => {
    useParams.mockReturnValue({ genreSlug: 'biology' });

    render(<GenreDetail />);

    expect(screen.getByRole('heading', { name: 'Biology' })).toBeInTheDocument();
    expect(screen.getByText(/living things/i)).toBeInTheDocument();
    expect(screen.getByText('Evolution and ecosystems')).toBeInTheDocument();
});

test('shows books matching the current genre', async () => {
    useParams.mockReturnValue({ genreSlug: 'romance' });
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => [
            { id: 1, title: 'Romance Book', genre: 'Romance' },
            { id: 2, title: 'History Book', genre: 'History' },
        ],
    });

    render(<GenreDetail />);

    await waitFor(() => expect(screen.getByText('Romance Book')).toBeInTheDocument());
    expect(screen.queryByText('History Book')).not.toBeInTheDocument();
});
