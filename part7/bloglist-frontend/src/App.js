import { useEffect } from "react";
import blogService from "./services/blogs";
import Users from "./components/Users";
import Home from "./components/Home";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";

import { initializeBlogs } from './reducers/blogReducer'
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

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
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

    return (
        <div>

            <div>
                <Link style={padding} to="/">
                    blogs
                </Link>
                <Link style={padding} to="/users">
                    users
                </Link>
            </div>

            <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<Home user={user}/>} />
            </Routes>
        </div>
    );
};

export default App;
