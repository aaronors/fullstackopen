import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        addVote(state, action) {
            const id = action.payload;
            const anecdote = state.find((n) => n.id === id);
            const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

            const anecdoteList = state.map((quote) =>
                quote.id !== id ? quote : updatedAnecdote
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

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

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

export default anecdoteSlice.reducer;