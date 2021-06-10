import axios from 'axios';
 
const CONTENT_DATA = process.env.REACT_APP_ABOUT_PAGE_CONTENT_URL;

const initialState= {
    loading: false,
    contents: {},
    error: '',
}

// Action types
 
export const CONTENT_DATA_REQUEST = 'CONTENT_DATA_REQUEST';
export const CONTENT_DATA_SUCCESS = 'CONTENT_DATA_SUCCESS';
export const CONTENT_DATA_ERROR = 'CONTENT_DATA_ERROR';

// Reducer

export default function aboutPageReducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch(type) {
        
        case "CONTENT_DATA_REQUEST":

            // console.log('here request');
            return {
                ...state,
                loading: true, 
                
            };
        case "CONTENT_DATA_SUCCESS":

            // console.log('here success');
            return {
                loading: false, 
                contents: action.payload,
                error: ''
            };
        case "CONTENT_DATA_ERROR":
            return {
                loading: false,
                contents: {},
                error: action.payload
            };
        default:
            return state;
    }

}

// Action creators

export const contentRequest = () => { 
    
    // console.log('ddd');
    return { type: CONTENT_DATA_REQUEST };
  }
  
const contentSuccess = contents => ({
    type: CONTENT_DATA_SUCCESS,
    payload: contents,
  });
  
const contentError = e => ({
    type: CONTENT_DATA_ERROR,
    error: true,
    payload: e,
  });

// Thunks

export const getData = () => {

        return (dispatch) => {

        // console.log('here.......');

        dispatch(contentRequest())
        let result = axios.get(CONTENT_DATA)
            result.then(response => {

                console.log('here', response);
                dispatch(contentSuccess(response.data))
                return response.data
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(contentError(errMsg))
            })
    
        }
}


