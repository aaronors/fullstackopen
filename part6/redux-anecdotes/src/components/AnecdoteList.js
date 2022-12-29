import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { createNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes);
    const dispatch = useDispatch();

    const vote = (id) => {
        dispatch(addVote(id));
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default AnecdoteList;
