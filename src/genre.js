import './genre.css';

export default function Genre() {
    return (
        <div className="genre-page">
            <nav>
               <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">Genre</a></li>
                    <li><a href="/type">type</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <main className="genre-content">
                <h2>Genre</h2>
                <p className="genre-intro">Explore stories by the worlds, ideas, and feelings they bring to life.</p>
                <div className="genre-grid">
                    <section className="genre-card">
                        <h3>Fiction</h3>
                        <ul>
                            <li><a href="/fantasy">Fantasy</a></li>
                            <li><a href="/science-fiction">Science Fiction</a></li>
                            <li><a href="/horror">Horror</a></li>
                            <li><a href="/thriller">Thriller</a></li>
                            <li><a href="/romance">Romance</a></li>
                            <li><a href="/historical-fiction">Historical Fiction</a></li>
                            <li><a href="/young-adult">Young Adult</a></li>
                            <li><a href="/slice-of-life">slice of life</a></li>
                            <li><a href="/childrens-literature">children's literature</a></li>
                        </ul>
                    </section>
                    <section className="genre-card">
                        <h3>Non-Fiction</h3>
                        <ul>
                            <li><a href="/popular-science">Popular Science</a></li>
                            <li><a href="/physics">Physics</a></li>
                            <li><a href="/biology">Biology</a></li>
                            <li><a href="/history">History</a></li>
                            <li><a href="/self-help">Self-Help</a></li>
                            <li><a href="/true-crime">True Crime</a></li>
                            <li><a href="/philosophy">Philosophy</a></li>
                            <li><a href="/psychology">Psychology</a></li>
                            <li><a href="/biography">Biography</a></li>
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    )
}