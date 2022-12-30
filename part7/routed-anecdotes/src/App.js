import { useState } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate,
    useParams,
    useNavigate,
    useMatch,
} from "react-router-dom";
import Notification from "./components/Notification";
import "./App.css";
import  { useField } from './hooks'

const Anecdote = ({anecdote}) => (
    <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>has {anecdote.votes} votes</div>
        <br/>
        <div>
            for more info see
            <a href={anecdote.info}> {anecdote.info}</a>
        </div>
    </div>
);

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map((anecdote) => (
                // <li key={anecdote.id}>{anecdote.content}</li>
                <li key={anecdote.id}>
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
            ))}
        </ul>
    </div>
);

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>
            An anecdote is a brief, revealing account of an individual person or
            an incident. Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter but
            to reveal a truth more general than the brief tale itself, such as
            to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative. An anecdote is "a
            story with a point."
        </em>

        <p>
            Software engineering is full of excellent anecdotes, at this app you
            can find the best and add more.
        </p>
    </div>
);

const Footer = () => (
    <div>
        Anecdote app for{" "}
        <a href="https://fullstackopen.com/">Full Stack Open</a>. See{" "}
        <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
            https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
        </a>{" "}
        for the source code.
    </div>
);

const CreateNew = (props) => {
    const { resetField: contentReset, ...content } = useField("content");
    const { resetField: authorReset, ...author } = useField("author");
    const { resetField: infoReset, ...info } = useField("info");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
    };

    const handleReset = () => {
        contentReset();
        authorReset();
        infoReset();
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content}/>
                </div>
                <div>
                    author
                    <input {...author}/>
                </div>
                <div>
                    url for more info
                    <input {...info}/>
                </div>
                <button type="submit">create</button>
                <button type="button" onClick={handleReset}>reset</button>
            </form>
        </div>
    );
};

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1,
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2,
        },
    ]);

    const [notification, setNotification] = useState("");
    const [notificationType, setNotificationType] = useState(null);
    const navigate = useNavigate();

    const displayNotification = (msg, type) => {
        setNotification(msg);
        setNotificationType(type);
        setTimeout(() => {setNotification(null)}, 5000);
    }

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
        navigate("/");
        displayNotification(`${anecdote.content} by ${anecdote.author} was added`,"success");
    };

    const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };

    const padding = {
        padding: 5,
    };

    const match = useMatch("/anecdotes/:id");
    const anecdote = match ? anecdoteById(Number(match.params.id)) : null;

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Notification message={notification} notificationType={notificationType}/>
            <div>
                <Link style={padding} to="/">
                    anecdotes
                </Link>
                <Link style={padding} to="/create">
                    create new
                </Link>
                <Link style={padding} to="/about">
                    about
                </Link>
            </div>

            <Routes>
                <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
                <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote}/>} />
            </Routes>

            <br />
            <Footer />
        </div>
    );
};

export default App;
