import { useParams } from 'react-router-dom';
import { BookGrid, toGenreSlug, useBooks } from './book-catalog';
import './genre-detail.css';

const genres = {
    horror: {
        title: 'Horror',
        description: 'Explore unsettling stories built to thrill, surprise, and keep you turning pages after dark.',
        themes: ['Supernatural encounters', 'Gothic settings', 'Psychological suspense'],
    },
    thriller: {
        title: 'Thriller',
        description: 'Follow high-stakes stories full of danger, secrets, and unexpected twists.',
        themes: ['Mystery and suspense', 'Fast-paced action', 'High-stakes secrets'],
    },
    romance: {
        title: 'Romance',
        description: 'Find stories about love, relationships, and the journeys that bring people together.',
        themes: ['New beginnings', 'Friends to lovers', 'Second chances'],
    },
    'historical-fiction': {
        title: 'Historical Fiction',
        description: 'Step into stories set in the past, where imagined characters meet real eras and events.',
        themes: ['Life in another era', 'Historical events', 'Family legacies'],
    },
    'young-adult': {
        title: 'Young Adult',
        description: 'Discover coming-of-age stories about identity, friendship, and finding your place in the world.',
        themes: ['Coming of age', 'Friendship', 'Finding your voice'],
    },
    'slice-of-life': {
        title: 'Slice of Life',
        description: 'Enjoy thoughtful stories about everyday moments, personal connections, and small changes.',
        themes: ['Everyday life', 'Personal growth', 'Community and connection'],
    },
    'childrens-literature': {
        title: "Children's Literature",
        description: 'Explore imaginative, welcoming stories made for young readers and the people who read with them.',
        themes: ['Adventure and imagination', 'Friendship', 'Learning about the world'],
    },
    'popular-science': {
        title: 'Popular Science',
        description: 'Get curious about scientific discoveries and ideas explained for a general audience.',
        themes: ['Space and the universe', 'Nature and discovery', 'Science in daily life'],
    },
    physics: {
        title: 'Physics',
        description: 'Explore the forces, matter, energy, and laws that shape the physical universe.',
        themes: ['Space and time', 'Energy and matter', 'The laws of nature'],
    },
    biology: {
        title: 'Biology',
        description: 'Learn about living things, from the smallest cells to the ecosystems they inhabit.',
        themes: ['The human body', 'Plants and animals', 'Evolution and ecosystems'],
    },
    history: {
        title: 'History',
        description: 'Travel through the people, places, and events that have shaped our world.',
        themes: ['Ancient civilizations', 'World-changing events', 'People and everyday life'],
    },
    'self-help': {
        title: 'Self-Help',
        description: "Find practical ideas for building habits, reaching goals, and navigating life's challenges.",
        themes: ['Personal growth', 'Healthy habits', 'Work and wellbeing'],
    },
    'true-crime': {
        title: 'True Crime',
        description: 'Read carefully researched accounts of real investigations, cases, and their impact.',
        themes: ['Investigations', 'Forensic evidence', 'Justice and its impact'],
    },
    philosophy: {
        title: 'Philosophy',
        description: 'Explore enduring questions about knowledge, ethics, meaning, and how we should live.',
        themes: ['Ethics and choices', 'Knowledge and reality', 'Meaning and purpose'],
    },
    psychology: {
        title: 'Psychology',
        description: 'Discover how people think, feel, learn, and relate to one another.',
        themes: ['How the mind works', 'Behavior and habits', 'Relationships and emotions'],
    },
    biography: {
        title: 'Biography',
        description: 'Get to know the lives, experiences, and achievements of real people.',
        themes: ['Remarkable lives', 'Personal journeys', 'People who changed the world'],
    },
};

export default function GenreDetail() {
    const { genreSlug } = useParams();
    const genre = genres[genreSlug];
    const { books, error } = useBooks();

    if (!genre) {
        return <main className="genre-detail-page"><p>Genre not found. <a href="/genre">Browse all genres</a>.</p></main>;
    }

    const genreBooks = books.filter((book) => toGenreSlug(book.genre || '') === genreSlug);

    return (
        <div className="genre-detail-page">
            <nav>
                <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">All genres</a></li>
                    <li><a href="/type">Type</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <main className="genre-detail-content">
                <a className="genre-back-link" href="/genre">&lt; Browse all genres</a>
                <h2>{genre.title}</h2>
                <p className="genre-detail-intro">{genre.description}</p>
                <section className="genre-highlights" aria-labelledby="genre-highlights-title">
                    <h3 id="genre-highlights-title">Explore {genre.title}</h3>
                    <p>Start with a theme that interests you:</p>
                    <ul>
                        {genre.themes.map((theme) => <li key={theme}>{theme}</li>)}
                    </ul>
                </section>
                <section className="genre-books" aria-labelledby="genre-books-title">
                    <h3 id="genre-books-title">Books in {genre.title}</h3>
                    {error && <p className="catalog-error" role="alert">{error}</p>}
                    <BookGrid books={genreBooks} />
                </section>
            </main>
        </div>
    );
}
