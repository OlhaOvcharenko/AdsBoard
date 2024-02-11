import React, { useState } from "react";
import { Form } from "react-bootstrap";
import  { Button } from "react-bootstrap";
import { API_URL } from "../../../config";
import { Alert, Spinner } from "react-bootstrap";
import { useForm } from 'react-hook-form';

const SignUpForm = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'
  
  const [avatarError, setAvatarError] = useState(false);
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
  
    setAvatarError(!avatar);

    if (login, password, phoneNumber, avatar){
      const fd = new FormData();
      fd.append("login", login);
      fd.append("password", password);
      fd.append("phoneNumber", phoneNumber);
      fd.append("avatar", avatar);
    
    
      const options = {
        method: "POST",
        body: fd,
      };

      setStatus("loading");
      fetch(`${API_URL}/auth/register`, options)

        .then((res) => {
          if (res.status === 201) {
            setStatus("success");
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
  };

  return (
    <Form onSubmit={validate(handleSubmit)} className="col-12 col-sm-4 mx-auto" >
      <h3 className="mb-4">Sign up!</h3>
      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfully registered! You can now log in</p>
        </Alert>
      )}
      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error, ty again!</p>
        </Alert>
      )}
      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data</Alert.Heading>
          <p>You have to fill all the fields</p>
        </Alert>
      )}
      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}
      {status === "loading" && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">loading...</span>
        </Spinner>
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
      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          {...register("phoneNumber", { required: true, minLength:8, maxLength:12})}  
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="tel"
          placeholder="Enter phone number"
        />
        {errors.phoneNumber && <small className="d-block form-text text-danger mt-2">Please add your mobile phone.</small>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          {...register("avatar", { required: true})} 
          accept=".jpeg, .png, .gif" 
          onChange={(e) => setAvatar(e.target.files[0])}
          type="file"
        />
        {avatarError && (<small className="d-block form-text text-danger mt-2">Image is required</small>)}
      </Form.Group>
      <Button type="submit" variant="secondary">
        Submit
      </Button>
    </Form>
  );
};

export default SignUpForm;