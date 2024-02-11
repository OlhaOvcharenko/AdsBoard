import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout} from "../../../redux/userRedux";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";


const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const logoutUser = async () => {
      try {
        const options = {
          method: 'DELETE',
        };
        await fetch(`${API_URL}/auth/logout`, options);
        dispatch(logout());
        setTimeout(() => {
          window.location.reload();

          navigate('/')
        },2000);
       
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return (
    <Alert>
      <Alert.Heading>You have been logged out!</Alert.Heading>
    </Alert>
  )
};


export default LogOut;