import './type.css';

export default function Type() {
    return (
        <div className="type-page">
            <nav>
               <h1>bookhub</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/genre">Genre</a></li>
                    <li><a href="/type">type</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </nav>
            <main className="type-content">
                <h2>Type</h2>
                <p className="type-intro">Find the reading format that fits your next escape.</p>
                <div className="type-grid">
                    <section className="type-card">
                    <h3>Fictional Formats</h3>
                    <ul>
                    <li><a href="/type/novels">Novels</a></li>
                    <li><a href="/type/short-stories">Short Stories</a></li>
                    <li><a href="/type/graphic-novels-manga">Graphic Novels/Manga</a></li>
                    <li><a href="/type/plays">Plays</a></li>
                    <li><a href="/type/poetry">Poetry</a></li>
                    <li><a href="/type/collections">Collections</a></li>
                    </ul>
                    </section>
                    <section className="type-card">
                    <h3>Non-Fictional Formats</h3>
                    <ul>
                    <li><a href="/type/biographies">Biographies</a></li>
                    <li><a href="/type/history">History</a></li>
                    <li><a href="/type/science">Science</a></li>
                    <li><a href="/type/self-help">Self-Help</a></li>
                    </ul>
                    </section>
                </div>
            </main>
        </div>
    )
}