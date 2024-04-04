

import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const LogOut = () => {
  return (
    <Alert>
      <Alert.Heading>You have been logged out!</Alert.Heading>
      <Link to="/">Come back home</Link>
    </Alert>
  )
};


export default LogOut;