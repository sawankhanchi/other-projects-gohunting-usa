import axios from 'axios';
 
const FAQ_DATA = process.env.REACT_APP_FAQ_PAGE_CONTENT_URL;

const initialState= {
    loading: false,
    contents: {},
    error: '',
}

// Action types
 
export const FAQ_DATA_REQUEST = 'FAQ_DATA_REQUEST';
export const FAQ_DATA_SUCCESS = 'FAQ_DATA_SUCCESS';
export const FAQ_DATA_ERROR = 'FAQ_DATA_ERROR';

// Reducer

export default function faqPageReducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch(type) {
        
        case "FAQ_DATA_REQUEST":

            // console.log('here request');
            return {
                ...state,
                loading: true, 
                
            };
        case "FAQ_DATA_SUCCESS":

            // console.log('here success');
            return {
                loading: false, 
                contents: action.payload,
                error: ''
            };
        case "FAQ_DATA_ERROR":
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

export const faqRequest = () => { 
    
    // console.log('ddd');
    return { type: FAQ_DATA_REQUEST };
  }
  
const faqSuccess = contents => ({
    type: FAQ_DATA_SUCCESS,
    payload: contents,
  });
  
const faqError = e => ({
    type: FAQ_DATA_ERROR,
    error: true,
    payload: e,
  });

// Thunks

export const getData = () => {

        return (dispatch) => {

        // console.log('here.......');

        dispatch(faqRequest())
        let result = axios.get(FAQ_DATA)
            result.then(response => {

                console.log('here', response);
                dispatch(faqSuccess(response.data))
                return response.data
            })
            .catch(error => {
                const errMsg = error.message
                dispatch(faqError(errMsg))
            })
    
        }
}


