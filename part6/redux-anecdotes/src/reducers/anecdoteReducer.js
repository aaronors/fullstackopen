import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            const content = action.payload;
            state.push({
                content,
                id: getId(),
                votes: 0,
            });
        },
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

export const { addVote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
