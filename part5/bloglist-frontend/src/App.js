import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import "./App.css";

const App = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

    const blogFormRef = useRef();

    const sortBlogs = (blogList) => {
        return blogList.sort((a, b) => {return b.likes - a.likes});
    }

    useEffect(() => {
        blogService.getAll().then((blogs) => {
            setBlogs(sortBlogs(blogs));
        });
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

    const loginDisplay = () => (
        <div>
            <h2>Log in to application</h2>
            <Notification message={notification} notificationType={notificationType}/>
            <LoginForm
                    handleLogin = {handleLogin}
                    username = {username}
                    password = {password}
                    setUsername = {setUsername}
                    setPassword = {setPassword}
            />
        </div>
    );

    const createBlog = async (blogObject) => {
        try {
            const returnedBlog = await blogService.create(blogObject);
            setBlogs(blogs.concat(returnedBlog));
            displayNotification(
                `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 
                "success"
            );
            blogFormRef.current.toggleVisibility();
        } catch (exception) {
            displayNotification(exception.response.data.error, "error");
        }
    }

    const updateBlogLikes = async (blogObject) => {
        try {
            const returnedBlog = await blogService.updateLikes(blogObject);
            const updatedBlogList = blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog));

            setBlogs(sortBlogs(updatedBlogList));
            displayNotification(
                `A like has been added to ${returnedBlog.title}`, 
                "success"
            );
        } catch (exception) {
            console.log(exception);
            displayNotification(exception.response.data.error, "error");
        }
    }

    const blogDisplay = () => (
        <div>
            <h2>blogs</h2>
            <Notification message={notification} notificationType={notificationType}/>
            <p>
                {user.name} logged-in{" "}
                <button type="submit" onClick={handleLogout}>
                    logout
                </button>
            </p>

            <Togglable showLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
                <BlogForm createBlog = {createBlog} />
            </Togglable>

            {blogs.map((blog) => (
                <Blog 
                    key={blog.id} 
                    blog={blog} 
                    updateBlogLikes={() => updateBlogLikes(blog)}
                />
            ))}
        </div>
    );

    return <div>{user === null ? loginDisplay() : blogDisplay()}</div>;
};

export default App;
