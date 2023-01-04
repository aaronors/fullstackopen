import { useDispatch } from "react-redux";
import { updateBlog, removeBlog, addComment } from '../reducers/blogReducer'

const BlogView = ({ blog }) => {
    const dispatch = useDispatch();

    const handleSubmitComment = (event) => {
        event.preventDefault();
        dispatch(addComment(blog, event.target.comment.value));
        event.target.reset();        
    }

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
            <h2>comments</h2>
            <form onSubmit={handleSubmitComment}>
                <div>
                    <input type="text" name="comment"/>
                    <button type="submit">add comment</button>
                </div>
            </form>
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
};

export default BlogView;
