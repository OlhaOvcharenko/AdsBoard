import { API_URL } from "../config";
import initialState from "./initialState";

//selector
export const getUser = ({user}) => user;


// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");

const SET_LOGGED_USER = createActionName("SET_LOGGED_USER");

const LOG_OUT = createActionName("LOG_OUT");


// action creators
export const logIn = (payload) => {
  // Store the user data in local storage
  localStorage.setItem('user', JSON.stringify(payload));
  
  return {
    type: LOG_IN,
    payload,
  };
};
export const userIdentification = (payload) => ({
  type: SET_LOGGED_USER,
  payload,
});

export const logout = (payload) => ({
  type: LOG_OUT,
  payload,
});

export const fetchUserData = () => {
  return (dispatch) => {
    // Check if user data exists in local storage
    /*const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(logIn({ user }));
    }*/

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
      .then((user) => {
        // Update user data in local storage
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(logIn({ user }));
        console.log('user logged in:', user )
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };
};

/*export const logoutUser = () => {
  return (dispatch) => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    // Dispatch action to update Redux store
    dispatch(logout());
  };
};*/

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case SET_LOGGED_USER:
      return { ...state, user: action.payload }; 
    case LOG_OUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default usersReducer;