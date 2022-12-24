import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import "./App.css";

const App = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const clearUserCredentials = () => {
        setUsername("");
        setPassword("");
    };

    const clearBlogForm = () => {
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
    }

    const displayNotification = (msg, type) => {
        setNotification(msg);
        setNotificationType(type);
        setTimeout(() => {setNotification(null)}, 5000);
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem(
                "loggedBlogAppUser",
                JSON.stringify(user)
            );
            blogService.setToken(user.token);
            setUser(user);
            clearUserCredentials();
        } catch (exception) {
            displayNotification("Wrong credentials", "error");
        }
    };

    const handleLogout = () => {
        window.localStorage.removeItem("loggedBlogAppUser");
        setUser(null);
        clearUserCredentials();
    };

    const loginForm = () => (
        <div>
            <h2>Log in to application</h2>
            <Notification message={notification} notificationType={notificationType}/>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );

    const createBlog = async (event) => {
        event.preventDefault();
        try {
            const returnedBlog = await blogService.create({
                title: newTitle,
                author: newAuthor,
                url: newUrl
            });
            setBlogs(blogs.concat(returnedBlog));
            clearBlogForm();
            displayNotification(
                `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 
                "success"
            );
        } catch (exception) {
            displayNotification(exception.response.data.error, "error");
        }
    }

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value);
    };    

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value);
    };    

    const noteForm = () => (
        <div>
            <h2>blogs</h2>
            <Notification message={notification} notificationType={notificationType}/>
            <p>
                {user.name} logged-in{" "}
                <button type="submit" onClick={handleLogout}>
                    logout
                </button>
            </p>
            <h2>create new</h2>

            <form onSubmit={createBlog}>
                <div>title: <input value={newTitle} onChange={handleTitleChange} /></div>
                <div>author:<input value={newAuthor} onChange={handleAuthorChange} /></div>
                <div>url:<input value={newUrl} onChange={handleUrlChange} /></div>
                <div><button type="submit">create</button></div>
            </form>

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );

    return <div>{user === null ? loginForm() : noteForm()}</div>;
};

export default App;
