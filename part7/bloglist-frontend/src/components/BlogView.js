import { useDispatch } from "react-redux";
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const BlogView = ({ blog }) => {
    const dispatch = useDispatch();

    if (!blog) {
        return null;
    }

    return(
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <div>{blog.likes} likes<button onClick={() => {dispatch(updateBlog(blog))}}>like</button></div>
            <div>added by {blog.user.name}</div>
            <button onClick={() => {dispatch(removeBlog(blog))}}>remove</button>
        </div>
    )
};

export default BlogView;
