import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Nav }from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/userRedux";

const SignInForm = () => {
  
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'
  
  const dispatch = useDispatch();

  const handleSubmit =(e) => {
    e.preventDefault();
    console.log(login,password, 'login data')
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ login, password })
    }

    setStatus("loading");
    fetch(`${API_URL}/auth/login`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus("success");
          dispatch(logIn({login}))
        } else if (res.status === 400) {
          setStatus("clientError");
        } else if (res.status === 409) {
          setStatus("loginError");
        } else {
          setStatus("serverError");
        }
      })
      .catch((err) => {
        setStatus("serverError");
      });
  }

  return (
    <div>
      <Form className="col-12 col-sm-4 mx-auto" onSubmit={handleSubmit}>
        
        <h1 className="my-4 text-center">Sign in</h1>

        {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have successfully logged in.</p>
        </Alert> )}
        {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something  went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>)}
        {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Not enought data.</Alert.Heading>
          <p>You have to fill all the fileds.</p>
        </Alert>)}
        {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use.</Alert.Heading>
          <p>You have to use another login.</p>
        </Alert>)}
        
        {status === "loading" && (
        <Spinner color="primary" className="standard-box d-block me-auto ms-auto" />
        )}

        <Form.Group className="mb-3" controlId="formLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter login"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
        </Form.Group>
        <Button variant="primary" type="submit" className="my-3">
          Submit
        </Button>
    
        <div className='text-center text-muted py-4'>
          <p>If you don't have a user profile, please register. Click the button below to sign up</p>
        </div>

        <Nav.Link as={NavLink} to="/register" className="text-center">
          <span>Sign up!</span>
        </Nav.Link>
      </Form>
    
    </div>
  );
};
  
export default SignInForm;