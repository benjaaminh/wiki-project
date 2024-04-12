import { useState } from 'react';

import { Post, User } from '../types';
import ResponsiveAppBar from './ResponsiveAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
interface Props {
    user: User,
    posts: Post[]
}
const Home = ({user, posts} : Props) => {

  const  defaultTheme = createTheme();
  //const randomPost = posts[(Math.floor(Math.random() * posts.length))]
  //console.log(randomPost.title)
  if (posts.length<1){
    return (<p>loading</p>)
  }else{
    const randomPost = posts[(Math.floor(Math.random() * posts.length))]
     return(
  <ThemeProvider theme={defaultTheme}>
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
          welcome to the wiki
        </Typography>
        <Typography component="h1" variant="h5">
          post of the day: <Link to={`/posts/${randomPost.id}`}>{randomPost.title}</Link>
        </Typography>
    </Box>
    </Container>
    </ThemeProvider>
 );

  }
 



};
export default Home;
