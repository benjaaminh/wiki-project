import {
  Link,
  useMatch,
} from "react-router-dom";
import { User } from "../types";
import { CssBaseline } from "@mui/material";
interface Props {
    users: User[] 
}
const UserPage = ({ users }: Props) => {
 
  const match = useMatch("/users/:id");

  const user = match
    ? users.find((user) => user.id === String(match.params.id)) //OBS! string, not number
    : null;

  if (!user) {
    return null;
  }

  return (
    <div>
          <CssBaseline />
      <h1>{user.name}</h1>
      <h3>posts</h3>
          <table>
            <tbody>
              <tr>
                <td></td> {/*empty cell to make the second above amount*/}
              </tr>
              {user.posts?.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};
export default UserPage;
