import { useState, useEffect } from "react";
import usersService from "../services/users";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";


const Users = () => {
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        usersService.getAll()
            .then((returnedUsers) => {
                setUsers(returnedUsers);
            })
            .catch((exception) => {
                dispatch(setNotification(exception.response.data.error, "error"))
            })
    }, [dispatch]);

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
  }

export default Users;