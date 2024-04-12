import {
  useMatch,
} from "react-router-dom";
import { Post, User } from "../types";
import { Box, Container, CssBaseline, ThemeProvider, Typography } from "@mui/material";
interface Props {
  posts: Post[]
}
const PostPage = ({ posts }: Props) => {

  const match = useMatch("/posts/:id");

  const post = match
    ? posts.find((post) => post.id === String(match.params.id)) //OBS! string, not number
    : null;

  if (!post) {
    return (
      <div>
        <CssBaseline />

        <h1>no post here</h1>

      </div>

    )
  }

  return (
    <Container component="main" maxWidth="xl">
    <CssBaseline />
    <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
    <Typography component="h1" variant="h4">
    <h1>{post.title}</h1>
      <p>{post.content}</p>
      <img src={post.imgSrc} />
      <p>date:{post.datePosted?.toString()}</p>
      <p>created by: {post.user?.name} </p>

        </Typography>
    </Box>
    </Container>
  );
};
export default PostPage;
