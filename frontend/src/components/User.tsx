import {
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
    </div>
  );
};
export default UserPage;
