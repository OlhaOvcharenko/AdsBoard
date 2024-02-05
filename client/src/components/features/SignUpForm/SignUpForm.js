import React from "react";
import { Form } from "react-bootstrap";
import  { Button } from "react-bootstrap";

const SignUpForm = () => {


  return (
    <div>
      <Form className="col-12 col-sm-4 mx-auto">

        <h1 className="my-4">Sign Up!</h1>

        <Form.Group className="mb-3" controlId="formLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" placeholder="Enter login"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" placeholder="Phone number"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFile">
          <Form.Label>Avatar</Form.Label>
          <Form.Control type="file"/>
        </Form.Group>

        <Button variant="primary" type="submit" className="my-3">
          Submit
        </Button>
      </Form>
   
    </div>
  );
};

export default SignUpForm;