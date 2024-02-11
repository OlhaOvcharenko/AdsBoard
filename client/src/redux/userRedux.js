import { API_URL } from "../config";

//selector
export const getUser = ({user}) => user;


// actions
const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName("LOG_IN");
const LOG_OUT = createActionName("LOG_OUT");


// action creators
export const logIn = (payload) => ({
  type: LOG_IN,
  payload,
});

export const logout = (payload) => ({
  type: LOG_OUT,
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

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        currentUser: action.payload,
      };
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