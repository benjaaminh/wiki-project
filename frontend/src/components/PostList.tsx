
import {
    Link,
  } from "react-router-dom";
  import { Post, User } from "../types";
  import { useState } from 'react';
  import ResponsiveAppBar from './ResponsiveAppBar';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import Container from '@mui/material/Container';
  import CssBaseline from '@mui/material/CssBaseline';
  import Box from '@mui/material/Box';
  import { Typography } from '@mui/material';
import PostForm from "./PostForm";
  interface Props {
      posts: Post[] ,
      createPost: (post: Post) => void
  }
  const PostList = ({ posts, createPost }: Props) => {
      // Check if users is undefined or null, and render a message or return null
      if (posts?.length<1) {
        return (
            <PostForm createPost={createPost}/>
        ); // Or any other message you want to display
      }
      const  defaultTheme = createTheme();
    
      return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline /> {/*so the appbar is stuck to the top of the page */}
        <h2>posts</h2>
          <table>
            <tbody>
              <tr>
                <td></td> {/*empty cell to make the second above amount*/}
              </tr>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PostForm createPost={createPost}/>
          </Container>
        </ThemeProvider>
      );
    };
    
  export default PostList;
  