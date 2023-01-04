import LoginDisplay from "./LoginDisplay";
import BlogDisplay from "./BlogDisplay";

const Home = ({ user }) => {
    return <div>{user === null ? <LoginDisplay /> : <BlogDisplay />}</div>;
};

export default Home;
