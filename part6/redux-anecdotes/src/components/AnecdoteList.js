import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { createNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === "") {
            return anecdotes;
        }

        return anecdotes.filter(a => a.content.includes(filter));

    });

    const dispatch = useDispatch();

    const vote = (anecdote) => {
        dispatch(updateAnecdote(anecdote));
        dispatch(createNotification("A user has voted"));
        setTimeout(() => {dispatch(removeNotification())}, 5000);
    };
    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AnecdoteList;
