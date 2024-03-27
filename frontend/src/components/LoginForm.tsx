
import { Form, Button, Container  } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
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
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" value={username} onChange={({target})=>setUsername(target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" value={password} onChange={({target})=>setPassword(target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
