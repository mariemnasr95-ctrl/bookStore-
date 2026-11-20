import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Signup from './signup';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

test('submits the required email and navigates to login after signup', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    const fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Account created' }),
    });

    render(<Signup />);

    fireEvent.change(screen.getByLabelText('Username:'), { target: { value: 'reader' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'reader@example.com' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/login'));
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({
        username: 'reader',
        email: 'reader@example.com',
        password: 'password123',
    });

    fetchMock.mockRestore();
});
