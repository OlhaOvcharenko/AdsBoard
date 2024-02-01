import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */
export const getAllAds = ({ ads }) => ads.data;
export const getRequest = ({ ads }, name) => ads.requests[name];

/* ACTIONS */

// Action name creator
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const LOAD_ADS = createActionName('LOAD_ADS');

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });
export const loadAds = payload => ({ payload, type: LOAD_ADS });

/* THUNKS */

export const loadAdsRequest = () => {
  return async dispatch => {
    dispatch(startRequest({ name: LOAD_ADS }));
    try {
      let res = await axios.get(`${API_URL}/ads`); // adjust the endpoint based on your API
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: LOAD_ADS }));
    } catch (e) {
      dispatch(errorRequest({ name: LOAD_ADS, error: e.message }));
    }
  };
};
/* INITIAL STATE */

const initialState = {
  data: [],
  requests: {},
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADS:
      console.log('LOAD_ADS action received:', action.payload);
      return { ...statePart, data: [...action.payload] };
    case START_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: true, error: null, success: false },
        },
      };
    case END_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: null, success: true },
        },
      };
    case ERROR_REQUEST:
      return {
        ...statePart,
        requests: {
          ...statePart.requests,
          [action.payload.name]: { pending: false, error: action.payload.error, success: false },
        },
      };
    default:
      return statePart;
  }
}