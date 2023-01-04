import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "../reducers/notificationReducer";

const sortBlogs = (blogList) => {
    return blogList.sort((a, b) => {return b.likes - a.likes});
}

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        updateList(state, action) {
            const updatedBlog = action.payload;

            const blogList = state.map((blog) =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            );

            return sortBlogs(blogList);
        },
        updateListRemove(state, action) {
            const removedBlog = action.payload;
            return state.filter(blog => blog.id !== removedBlog.id);
        },
        appendBlog(state, action) {
            state.push(action.payload);
        },
        setBlogs(state, action) {
            return action.payload;
        }    
    },
});

export const { updateList, appendBlog, setBlogs, updateListRemove } = blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        sortBlogs(blogs);
        dispatch(setBlogs(blogs));
    };
};

export const createNewBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blog);
            dispatch(appendBlog(newBlog));
            dispatch(setNotification(
                `A new blog ${blog.title} by ${blog.author} added`, 
                "success"
            ))
        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    };
};    

export const updateBlog = (blog) => {
    return async (dispatch) => {
        try {
            const returnedBlog = await blogService.updateLikes(blog);
            dispatch(updateList(returnedBlog));
            dispatch(setNotification(
                `A like has been added to ${blog.title}`, 
                "success"
            ))            
        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    };
};    

export const addComment = (blog, comment) => {
    return async (dispatch) => {
        try {
            const returnedBlog = await blogService.createComment(blog, comment);
            dispatch(updateList(returnedBlog));
            dispatch(setNotification(
                `A comment has been added to ${blog.title}`, 
                "success"
            ))            
        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    };
};    

export const removeBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blog);
            dispatch(updateListRemove(blog));
            dispatch(setNotification(
                `${blog.title} has been deleted`, 
                "success"
            ))            
        } catch (exception) {
            console.log(exception);
            dispatch(setNotification(exception.response.data.error, "error"))
        }
    };
};    

export default blogSlice.reducer;
