import { createBrowserRouter, Navigate } from 'react-router-dom';
import Genre from './genre';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Type from './type';
import Fantasy from './fantasy';
import ScienceFiction from './sciencefiction';
import GenreDetail from './genre-detail';
import TypeDetail from './type-detail';
import AddBook from './add-book';
import Profile from './profile';
import Admin from './admin';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/about',
        element: <Genre />,
    },
    {
        path: '/genre',
        element: <Genre />,
    },
    {
        path: '/contact',
        element: <Type />,
    },
    {
        path: '/type',
        element: <Type />,
    },
    {
        path: '/type/:typeSlug',
        element: <TypeDetail />,
    },
    {
        path: '/admin/books/new',
        element: <AddBook />,
    },
    {
        path: '/fantasy',
        element: <Fantasy />,
    },
    {
        path: '/science-fiction',
        element: <ScienceFiction />,
    },
    {
        path: '/:genreSlug',
        element: <GenreDetail />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/admin',
        element: <Admin />,
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

export default router;
