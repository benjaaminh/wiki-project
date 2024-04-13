import { useState, useEffect } from 'react';
import './App.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Route, Routes } from "react-router-dom";
import wikiService from './services/posts';
import loginService from './services/login';
import userService from './services/users';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Notification from './components/Notification';
import { Post, User } from './types';
import UserList from './components/UserList';
import UserPage from './components/User';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import postService from './services/posts';
import PostList from './components/PostList';
import PostPage from './components/Post';
const App = () => {
  const [user, setUser] = useState<User|null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [notification, setNotification] = useState<string|null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWikiAppUser');
    
    if (loggedUserJSON) {
      const fetchUser = async () => {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        wikiService.setToken(user.token);
      };
      void fetchUser();
    }
   
  

  const fetchUsers = async () => {
    const users = await userService.getAll();
    setUsers(users);
  
  };
  void fetchUsers();
  const fetchPosts = async () => {
    const posts = await postService.getAll();
    setPosts(posts);
    
  };
  void fetchPosts();
}, []);

  const addPost = async (postObject : Post) => {
    const post = await postService
    .create(postObject);
    setPosts(posts.concat(post));
  };

  const addPostWithImage = async (image:File,postObject : Post) => {
    const postWithImage = await postService
    .postWithFile(image,postObject)
    setPosts(posts.concat(postWithImage))
  }

  
  const handleLogin = async (username: string, password: string) => {//handling login without event, passed to loginform component to handle state
    try {
      const user = await loginService.login({
        username, password,
      });
      wikiService.setToken(user.token);
      window.localStorage.setItem(
        'loggedWikiAppUser', JSON.stringify(user)
      );
      setUser(user);
    //  setNotification(`${username} logged in` )
    } catch (exception) {
      console.log(exception);
    }
  };


  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const padding = {
    padding:5
  };
  

  return (
    <div>
      <ResponsiveAppBar user={user} onLogout={handleLogout}/>

      <Notification notification={notification} />
      {!user && ( //if no user is logged in, render this
          <LoginForm onLogin={handleLogin} />
      )}

      {user && ( //if a user is logged in, render this
        <div>
          <Routes>
            <Route path="/" element={<Home user={user} posts={posts} />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
            <Route path="/users" element={<UserList users={users}/>}/>
            <Route path="/users/:id" element={<UserPage users={users}/>} />
            <Route path="/posts" element={<PostList posts={posts} createPost={addPost} createPostWithImage={addPostWithImage}/>}/>
            <Route path="/posts/:id" element={<PostPage posts={posts}/>}/>
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
