import { Link } from "react-router-dom";

const UserList = ({userList}) => {
    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                        {userList.map((user) => (
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
  }

export default UserList;