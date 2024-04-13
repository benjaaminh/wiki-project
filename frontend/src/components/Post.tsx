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
  let imgSrc
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
  if (post.img) {
    //retrieve image using base64string of the images data
    const base64String = btoa(String.fromCharCode(...new Uint8Array(post.img.data.data)));
    imgSrc = `data:${post.img.contentType};base64,${base64String}`;
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
          {post.img ? <img src={imgSrc} /> : <img src={post.imgSrc} />}
          <p>date:{post.datePosted?.toString()}</p>
          <p>created by: {post.user?.name} </p>

        </Typography>
      </Box>
    </Container>
  );
};
export default PostPage;
