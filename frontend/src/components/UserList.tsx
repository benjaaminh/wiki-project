
import {
  Link,
} from "react-router-dom";
import { User } from "../types";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
interface Props {
    users: User[] | undefined
}
const UserList = ({ users }: Props) => {
    // Check if users is undefined or null, and render a message or return null
    if (!users) {
      return <div>No users found</div>; // Or any other message you want to display
    }
    const  defaultTheme = createTheme();
  
    return (
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
      <CssBaseline /> {/*so the appbar is stuck to the top of the page */}
      <h2>users</h2>
        <table>
          <tbody>
            <tr>
              <td></td> {/*empty cell to make the second above amount*/}
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
        </Container>
      </ThemeProvider>
    );
  };
  
export default UserList;
