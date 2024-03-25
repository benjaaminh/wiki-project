import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import loginService from '../services/login';
import { SyntheticEvent, useState } from "react";
import wikiService from '../services/posts';
import { User } from "../types";
interface Props {
  onLogin: (username: string, password: string) => void
}

const LoginForm = ({onLogin}:Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  //handlesubmit is the event that happens when logging in
  //onlogin uses login-handler from app.tsx and adds right values from loginform state as well as the event
  const handleSubmit = (event: SyntheticEvent) =>{
    event.preventDefault();
    onLogin(username,password);
  };  
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" value={username} onChange={({target})=>setUsername(target.value)}/>
          <Form.Label>password:</Form.Label>
          <Form.Control name="password" type="password" value={password} onChange={({target})=>setPassword(target.value)}/>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
