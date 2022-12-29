import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        updateList(state, action) {
            const updatedAnecdote = action.payload;

            const anecdoteList = state.map((quote) =>
                quote.id !== updatedAnecdote.id ? quote : updatedAnecdote
            );

            return anecdoteList.sort((a, b) => {
                return b.votes - a.votes;
            });
        },
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload
        }    
    },
});

export const { updateList, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const notes = await anecdoteService.getAll();
        dispatch(setAnecdotes(notes));
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {

        const newNote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(newNote));
    };
};    

export const updateAnecdote = (anecdote) => {
    return async (dispatch) => {
        const modifiedAnecdote = {...anecdote, votes: anecdote.votes + 1};
        const returnedAnecdote = await anecdoteService.update(modifiedAnecdote);
        dispatch(updateList(returnedAnecdote));
    };
};    

export default anecdoteSlice.reducer;
