import { useSelector, useDispatch } from "react-redux";
import { updateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
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
