import { useParams } from 'react-router-dom';
import './type-detail.css';

const types = {
    novels: {
        title: 'Novels',
        description: 'Settle into a longer work of prose with room for layered characters, detailed settings, and a story that unfolds over time.',
        features: ['Long-form storytelling', 'Character development', 'Many genres and styles'],
    },
    'short-stories': {
        title: 'Short Stories',
        description: 'Enjoy complete, focused stories that make the most of a shorter reading experience.',
        features: ['Quick to read', 'A focused moment or idea', 'Often collected in anthologies'],
    },
    'graphic-novels-manga': {
        title: 'Graphic Novels and Manga',
        description: 'Experience stories told through a combination of illustrations, dialogue, and visual pacing.',
        features: ['Illustrated storytelling', 'A wide range of genres', 'Standalone stories and series'],
    },
    plays: {
        title: 'Plays',
        description: 'Read dialogue and stage directions written to bring a story to life in performance.',
        features: ['Dialogue-driven scenes', 'Stage directions', 'Comedy, tragedy, and drama'],
    },
    poetry: {
        title: 'Poetry',
        description: 'Explore language shaped by sound, rhythm, imagery, and carefully chosen words.',
        features: ['Verse and free verse', 'Rhythm and sound', 'Imagery and emotion'],
    },
    collections: {
        title: 'Collections',
        description: 'Browse a curated group of works gathered around a writer, subject, theme, or style.',
        features: ['Stories or poems in one volume', 'A shared theme or author', 'Read in any order'],
    },
    biographies: {
        title: 'Biographies',
        description: 'Learn about a real person’s life, experiences, accomplishments, and historical context.',
        features: ['Biographies', 'Personal experiences and milestones', 'A window into a time and place'],
    },
    history: {
        title: 'History',
        description: 'Explore researched accounts of past people, societies, events, and ideas.',
        features: ['Primary sources and evidence', 'People and societies', 'Events across different eras'],
    },
    science: {
        title: 'Science',
        description: 'Discover explanations and evidence-based accounts of the natural world and scientific ideas.',
        features: ['Research and discovery', 'The natural world', 'Ideas explained for different readers'],
    },
    'self-help': {
        title: 'Self-Help',
        description: 'Find practical guidance and ideas for personal development, habits, and everyday challenges.',
        features: ['Practical strategies', 'Personal goals and habits', 'Wellbeing and daily life'],
    },
};

export default function TypeDetail() {
    const { typeSlug } = useParams();
    const type = types[typeSlug];

    if (!type) {
        return <main className="type-detail-page"><p>Type not found. <a href="/type">Browse all types</a>.</p></main>;
    }

    return (
        <div className="type-detail-page">
            <nav>
                <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">Genre</a></li>
                    <li><a href="/type">All types</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <main className="type-detail-content">
                <a className="type-back-link" href="/type">&lt; Browse all types</a>
                <h2>{type.title}</h2>
                <p className="type-detail-intro">{type.description}</p>
                <section className="type-highlights" aria-labelledby="type-highlights-title">
                    <h3 id="type-highlights-title">About {type.title}</h3>
                    <ul>
                        {type.features.map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                </section>
            </main>
        </div>
    );
}
