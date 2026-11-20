import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import TypeDetail from './type-detail';

jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
}));

test('shows details for the selected reading type', () => {
    useParams.mockReturnValue({ typeSlug: 'graphic-novels-manga' });

    render(<TypeDetail />);

    expect(screen.getByRole('heading', { name: 'Graphic Novels and Manga' })).toBeInTheDocument();
    expect(screen.getByText(/illustrations, dialogue, and visual pacing/i)).toBeInTheDocument();
    expect(screen.getByText('Standalone stories and series')).toBeInTheDocument();
});
