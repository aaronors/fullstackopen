import { useEffect } from "react";
import blogService from "./services/blogs";
import UserList from "./components/UserList";
import Home from "./components/Home";
import User from "./components/User";
import Notification from "./components/Notification";
import BlogView from "./components/BlogView";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUserList } from "./reducers/userListReducer";
import { logout } from "./reducers/userReducer";

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

import "./App.css";

const App = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const userList = useSelector(state => state.userList)
    const blogs = useSelector(state => state.blogs)

    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUserList());
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
            blogService.setToken(user.token);
        }
    }, [dispatch]);

    const padding = {
        padding: 5,
    };

    const userMatch = useMatch("/users/:id");

    const selectedUser = userMatch
        ? userList.find((user) => user.id === userMatch.params.id)
        : null;

    const blogMatch = useMatch("/blogs/:id");
    const selectedBlog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null;

    return (
        <div>
            
            <div>
                <Link style={padding} to="/"> blogs </Link>
                <Link style={padding} to="/users"> users </Link>
                {user ? (
                    <>
                        <em>{user.name} logged in</em>&nbsp;
                        <button type="submit" onClick={() => {dispatch(logout())}}>
                        logout
                        </button>
                    </>
                ) : (
                    <em></em>
                )}
            </div>

            <Notification />
            <Routes>
                <Route path="/users" element={<UserList userList={userList}/>} />
                <Route path="/users/:id" element={<User user={selectedUser} />} />
                <Route path="/blogs/:id" element={<BlogView blog={selectedBlog} />} />
                <Route path="/" element={<Home user={user}/>} />
            </Routes>

        </div>
    );
};

export default App;
