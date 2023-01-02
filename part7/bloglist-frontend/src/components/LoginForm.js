
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
    const dispatch = useDispatch();

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(login(event.target.username.value, event.target.password.value));
        event.target.reset();
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
