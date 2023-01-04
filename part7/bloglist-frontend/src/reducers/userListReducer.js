import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { setNotification } from "./notificationReducer";

const userListSlice = createSlice({
    name: "userList",
    initialState: [],
    reducers: {
        set(state, action) {
            return action.payload;
        }
    },
});

export const { set } = userListSlice.actions;

export const initializeUserList = () => {
    return async (dispatch) => {
        try {
            const returnedUsers = await usersService.getAll();
            dispatch(set(returnedUsers));
        } catch (exception) {
            dispatch(setNotification("Wrong credentials", "error"))
        }
    };
};  


export default userListSlice.reducer;

