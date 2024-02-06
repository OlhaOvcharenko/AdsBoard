import { API_URL } from "../config";
import initialState from "./initialState";
//selector
export const getUser = ({user}) => user;


// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");

const LOG_OUT = createActionName("LOG_OUT");

const SET_LOGGED_USER = createActionName("SET_LOGGED_USER");
// action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logout = (payload) => ({
  type: LOG_OUT,
  payload,
});

export const userIdentification = (payload) => ({
  type: SET_LOGGED_USER,
  payload,
});

export const fetchUserData = () => {
  return (dispatch) => {
    const options = {
      method: "GET",
      credentials: 'include'
    };
  
    fetch(`${API_URL}/auth/user`, options)
      .then((res) => {
        if (res.ok) {
          return res.json(); 
        } else {
          throw new Error("Server error");
        }
      })
      .then((data) => {
        dispatch(userIdentification({ user: data }));
        console.log(data, 'logged user')
      })
      .catch((err) => {
        throw new Error("Server error");
      });
  };
};


const usersReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...statePart, user: action.payload }; // Assuming action.payload contains user data
    case SET_LOGGED_USER:
      return { ...statePart, user: action.payload }; // Assuming action.payload contains user data
    case LOG_OUT:
      return { ...statePart, user: null }; // Reset user data upon logout
    default:
      return statePart;
  }
};

export default usersReducer;