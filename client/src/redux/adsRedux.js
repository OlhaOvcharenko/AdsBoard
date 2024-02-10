import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';

/* SELECTORS */
export const getAllAds = ({ ads }) => ads.data;
export const getRequests = ({ads}) => ads.requests;

export const getAdById = ({ ads }, adId) =>
  ads.data.find((ad) => ad._id === adId);

export const getSearchedAds = ({ads}, searchPhrase ) =>
  ads.data.filter(ad => ad.title.toLowerCase().includes(searchPhrase.toLowerCase()) || ad.location.toLowerCase().includes(searchPhrase.toLowerCase()) );


/* ACTIONS */
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const LOAD_ADS = createActionName('LOAD_ADS');
export const UPDATE_SEARCHPHRASE = createActionName('UPDATE_SEARCHPHRASE'); 
export const CREATE_AD = createActionName("CREATE_AD");
export const EDIT_AD = createActionName("EDIT_AD");
export const DELETE_AD = createActionName("DELETE_AD");


export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const updateSearchPhrase = payload => ({ type: UPDATE_SEARCHPHRASE, payload });  
export const createAd = payload => ({ type: CREATE_AD, payload });  
export const editAd = payload => ({ type: EDIT_AD, payload });  
export const deleteAd = payload => ({ type: DELETE_AD, payload });  


/* THUNKS */
export const loadAdsRequest = () => {
  return async (dispatch) => {
    const requestName = LOAD_ADS;
    dispatch(startRequest({ name: requestName }));

    try {
      let res = await axios.get(`${API_URL}/api/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: requestName }));
    } catch (e) {
      dispatch(errorRequest({ name: requestName, error: e.message }));
    }
  };
};

export const createAdRequest = (newAd) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: CREATE_AD }));
    try {
      const formData = new FormData();
      formData.append('title', newAd.title);
      formData.append('price', newAd.price);
      formData.append('location', newAd.location);
      formData.append('description', newAd.description);
      formData.append('photo', newAd.photo);
      formData.append('author', newAd.author);
      formData.append('date', newAd.date);
      
      console.log(formData,'new ad form data')
      const res = await axios.post(
        `${API_URL}/api/ads`,
        formData,
        { 
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          credentials: 'include'
        },
      );

      //dispatch(createAd(res.data));
      dispatch(loadAds(res.data));
      dispatch(endRequest({ name: CREATE_AD }));
    } catch (e) {
      dispatch(errorRequest({ name: CREATE_AD, error: e.message }));
    }
  };
};

export const editAdRequest = (newAd) => {
  return async (dispatch) => {
    dispatch(startRequest({ name: EDIT_AD }));
    try {
      const formData = new FormData();
    
      formData.append('title', newAd.title);
      formData.append('price', newAd.price);
      formData.append('location', newAd.location);
      formData.append('description', newAd.description);
      formData.append('photo', newAd.photo);
      formData.append('author', newAd.author);
      formData.append('date', newAd.date);

      const requestOptions = {
        method: 'PUT',
        body: formData,
        credentials: 'include'
      };

      fetch(`${API_URL}/api/ads/edit/${newAd.id}`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            console.log("serverError");
            throw new Error('Network response was not ok');
          }
          console.log("success");
          dispatch(editAd(newAd));
        })
        .catch((error) => {
          console.error(error, "serverError");
          // Handle server errors
        });
    } catch (error) {
      console.error(error, "serverError");
      // Handle server errors
    } finally {
      dispatch(endRequest({ name: EDIT_AD }));
    }
  };
};

export const deleteAdsRequest = id => {
	return dispatch => {
		const options = {
			method: 'DELETE',
      credentials: 'include',
		}

		fetch(`${API_URL}/api/ads/${id}`, options)
      .then(() => {dispatch(deleteAd(id))})
	};
};



/* REDUCER */
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADS:
      console.log('LOAD_ADS action received:', action.payload);
      return { ...statePart, data: [...action.payload] };
    case UPDATE_SEARCHPHRASE:
      return {
        ...statePart,
        search: {
          ...statePart.search,
          searchPhrase: action.payload,
        },
      };
    case CREATE_AD: 
      console.log('CREATE_AD action received:', statePart.data);
      return { ...statePart, data: [...statePart.data, action.payload] };

    case EDIT_AD:
      console.log('EDIT_AD action received:', statePart.data);
      return {
        ...statePart,
        data: statePart.data.map(ad => (ad._id === action.payload._id ? { ...ad, ...action.payload } : ad))
      };

    case DELETE_AD:
      return {
        ...statePart,
        // Assuming data is an array of ads and you're removing the deleted ad from it
        data: statePart.data.filter(ad => ad._id !== action.payload),
      };

    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  }
}