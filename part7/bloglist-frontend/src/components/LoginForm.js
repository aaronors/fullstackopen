
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            dispatch(login(event.target.username.value, event.target.password.value));
            event.target.reset();
        } catch (exception) {
            dispatch(setNotification("Wrong credentials", "error"))
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input id="username" type="text" name="Username" />
            </div>
            <div>
                password
                <input id="password" type="password" name="Password" />
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    );
};

export default LoginForm;
