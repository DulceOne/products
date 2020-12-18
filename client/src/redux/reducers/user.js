import {
    SIGN_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
  } from '../actions/user';
import * as storage from '../../services/storage.service';
const initialState = {
    token: storage.getToken() || '',
    loading: false,
    error: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                loading: true,
            }
        case SIGN_IN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload,
                error: '',
            }
        default:
            return state;
    }
}


export default userReducer;

