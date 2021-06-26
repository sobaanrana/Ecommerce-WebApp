import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    MESSAGE_SUCCESS,
    MESSAGE_FAIL,
    MESSAGE_REQUEST
} from '../constants/userConstants'

export const userReducer = (state = { user: {}}, action) => {
    switch(action.type) {

        case REGISTER_USER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case LOGOUT_USER_REQUEST:
            return{
                loading: true,
                loggedIn: false
            }
        
        case REGISTER_USER_SUCCESS:
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                loggedIn: true,
                user: action.payload
            }

        case LOGOUT_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                loggedIn: false

            }
        case REGISTER_USER_FAIL:    
        case LOGIN_FAIL:
        case LOGOUT_USER_FAIL:
            return{
                ...state,
                loading:false,
                loggedIn: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading: false,
                loggedIn: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null
            }
        default:
            return state

    }
}

export const contactUsReducer = (state = { user: {}}, action) => {
    switch(action.type) {
        case MESSAGE_REQUEST:
            return{
                messageSent: false
            }
        case MESSAGE_SUCCESS:
            return {
                messageSent: false,
                user: action.payload


            }
        case MESSAGE_FAIL:
            return {
                messageSent: false,
                error: action.payload

    
            }

        case CLEAR_ERRORS:
            return{
                //...state,
                error: null
            }
        

        default:
            return state
    
    }
}