import LoginForm from "./LoginForm";
import Notification from "./Notification";

const LoginDisplay = () => {
    return (
        <div>
            <h2>Log in to application</h2>
            <Notification />
            <LoginForm />
        </div>
    );
};

export default LoginDisplay;
