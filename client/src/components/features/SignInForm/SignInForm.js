import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Nav }from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { API_URL } from "../../../config";
import { useDispatch } from "react-redux";
import { logIn } from "../../../redux/userRedux";
import { useForm } from 'react-hook-form';


const SignInForm = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit =() => {

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
          dispatch(logIn({login}));
          navigate('/')
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
      <Form className="col-12 col-sm-4 mx-auto" onSubmit={validate(handleSubmit)}>
        
        <h1 className="my-4 text-center">Sign in</h1>

    
        {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something  went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>)}
        {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Wrong data</Alert.Heading>
          <p> Login or password incorrect.</p>
        </Alert>)}
  
        
        {status === "loading" && (
        <Spinner color="primary" className="standard-box d-block me-auto ms-auto" />
        )}

        <Form.Group className="mb-3" controlId="formLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text"
            {...register("login", { required: true})} 
            value={login} onChange={e => setLogin(e.target.value)} 
            placeholder="Enter login"
          />
          {errors.login && <small className="d-block form-text text-danger mt-2">Login can not be empty.</small>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", { required: true})}  
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Password"
          />
          {errors.password && <small className="d-block form-text text-danger mt-2">Please, enter your password.</small>}
        </Form.Group>
        <Button variant="secondary" type="submit" className="my-3 mx-3">
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