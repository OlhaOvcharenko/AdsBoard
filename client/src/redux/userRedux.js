

/* ACTIONS */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

export const LOG_IN = createActionName('LOG_IN');

export const logIn = payload => ({ payload, type: LOG_IN });

/* REDUCER */
const usersReducer = (statePart = {}, action) => {
    switch (action.type) {
      case LOG_IN:
        return action.payload;
      default:
        return statePart;
    }
  };
  
export default usersReducer;