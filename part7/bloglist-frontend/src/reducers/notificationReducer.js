import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    notificationType: ""
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        createNotification(state, action) {
            return {
                message: action.payload.message,
                notificationType: action.payload.notificationType            
            };
        },
        removeNotification(state) {
            return initialState;
        },
    },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (message, notificationType ) => {
    return async (dispatch) => {
        const messageState = {
            message,
            notificationType
        }
        dispatch(createNotification(messageState));
        setTimeout(() => {dispatch(removeNotification())}, 5000);
    };
};  

export default notificationSlice.reducer;

