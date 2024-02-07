import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout} from "../../../redux/userRedux";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router";
import { useState } from "react";


const LogOut = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const options = {
      method: "DELETE",
    };

    fetch(`${API_URL}/auth/logout`, options)
    .then((user) => {
      console.log('user logged out')
      dispatch(logout(user));
      navigate('/');
    })
  }, [dispatch]); 
   
  return null;
};

export default LogOut;