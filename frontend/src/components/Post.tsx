import {
    useMatch,
  } from "react-router-dom";
  import { Post, User } from "../types";
  import { CssBaseline } from "@mui/material";
  interface Props {
      posts: Post[] 
  }
  const PostPage = ({ posts }: Props) => {
   
    const match = useMatch("/posts/:id");
  
    const post = match
      ? posts.find((post) => post.id === String(match.params.id)) //OBS! string, not number
      : null;
  
    if (!post) {
      return null;
    }
  
    return (
      <div>
            <CssBaseline />
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <img src={post.imgSrc}/>
            <p>date:{post.datePosted?.toString()}</p>
            <p>created by: {post.user?.name} </p>
        
      </div>
    );
  };
  export default PostPage;
  