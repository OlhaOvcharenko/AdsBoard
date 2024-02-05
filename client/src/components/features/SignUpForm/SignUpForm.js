import React from "react";
import { Form } from "react-bootstrap";

const SignInForm = () => {
  return (
    <div>
      <Form>
        <Form.Control type="text" placeholder="Enter your login" />
        <Form.Control type="password" placeholder="Enter your password" />
      </Form>
      
      <p>If you don't have a user profile, please register. Click button below to sign up</p>
    </div>
  );
};

export default SignInForm;