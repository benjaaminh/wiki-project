import { useState, useEffect } from 'react';
import './App.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, Route, Routes } from "react-router-dom";
import wikiService from './services/posts';
import loginService from './services/login';
import userService from './services/users'
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Notification from './components/Notification';
import { User } from './types';
import UserList from './components/UserList';
import UserPage from './components/User';
import ResponsiveAppBar from './components/ResponsiveAppBar';
const App = () => {
  const [user, setUser] = useState<User|null>(null);
  const [users, setUsers] = useState<User[]>([])
  const [notification, setNotification] = useState<string|null>(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedWikiAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      wikiService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    userService.getAll().then(users =>
      setUsers(users)
    )
  }, [])

  
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
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin}/>} />
            <Route path="/users" element={<UserList users={users}/>}/>
            <Route path="/users/:id" element={<UserPage users={users}/>} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
