import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../redux/userRedux";
import { API_URL } from "../../../config";
const LogOut = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const options = {
        method: "DELETE",
      };
      
      fetch(`${API_URL}/auth/logout`, options)
      .then(() => {
        dispatch(logout())
      })
    }, [dispatch]);

    return null;
};
  
export default LogOut;