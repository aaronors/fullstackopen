import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload;
        },
        removeNotification(state) {
            return null;
        },
    },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (text, seconds) => {
    return async (dispatch) => {

        dispatch(createNotification(text));
        setTimeout(() => {dispatch(removeNotification())}, seconds * 1000);
    };
};  

export default notificationSlice.reducer;

