import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Nav }from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SignInForm = () => {
  return (
    <div>
      <Form className="col-12 col-sm-4 mx-auto">
        <h1 className="my-4 text-center">Sign in</h1>
        <Form.Control type="text" placeholder="Enter your login" className="my-2" />
        <Form.Control type="password" placeholder="Enter your password" className="my-2" />
        <Button variant="primary" type="submit" className="my-3">
          Submit
        </Button>
    
        <div className='text-center text-muted py-4'>
          <p>If you don't have a user profile, please register. Click the button below to sign up</p>
        </div>

        <Nav.Link as={NavLink} to="/auth/register" className="text-center">
          <span>Sign up!</span>
        </Nav.Link>
      </Form>
   
    </div>
  );
};
  
export default SignInForm;