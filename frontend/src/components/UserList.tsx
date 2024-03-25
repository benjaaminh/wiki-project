
import {
  Link,
} from "react-router-dom";
import { User } from "../types";

interface Props {
    users: User[] | undefined
}
const UserList = ({ users }: Props) => {
    // Check if users is undefined or null, and render a message or return null
    if (!users) {
      return <div>No users found</div>; // Or any other message you want to display
    }
  
    return (
      <div>
        <h2>users</h2>
        <table>
          <tbody>
            <tr>
              <td></td> {/*empty cell to make the second above amount*/}
              <td>users</td>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
export default UserList;
