
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Post } from "../types";
interface Props {
  createPost: (post: Post) => void
  createPostWithImage: (image: File, post: Post) => void
}

const PostForm = ({ createPost, createPostWithImage }: Props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [image, setImage] = useState<File | null>(null)


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (image) {//if image file is included, post with that file
      createPostWithImage(image, { title, content })
    } else {//else post with url
      createPost({
        title,//title:title etc
        content,
        imgSrc,
      });
    }
    //settitle ('')etc
  };
  const defaultTheme = createTheme();
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              create post
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title of post"
                name="title"
                autoFocus
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="content"
                label="Text content"
                id="content"
                value={content} onChange={({ target }) => setContent(target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="imgsrc"
                label="Source of image"
                name="imgsrc"
                autoFocus
                value={imgSrc}
                onChange={({ target }) => setImgSrc(target.value)}
              />
              <input type="file" onChange={handleImageChange} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit post
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default PostForm;
