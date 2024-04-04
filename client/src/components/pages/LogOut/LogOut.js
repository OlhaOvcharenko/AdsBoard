import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout} from "../../../redux/userRedux";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*useEffect(() => {
    const logoutUser = async () => {
      try {
        const options = {
          method: 'DELETE',
        };
        const res = await fetch(`${API_URL}/auth/logout`, options);
        if (res.status === 200) {
          setStatus("success");
          dispatch(logout());
        } else {
          // Handle other status codes if needed
          setStatus("error");
        }
      } catch (error) {
        console.error('Error logging out:', error);
        // Handle error state if necessary
        setStatus("error");
      }
    };
  
    logoutUser();
  }, [dispatch, navigate]);*/

  return (
    <Alert>
      <Alert.Heading>You have been logged out!</Alert.Heading>
      <Link to="/">Come back home</Link>
    </Alert>
  )
};


export default LogOut;