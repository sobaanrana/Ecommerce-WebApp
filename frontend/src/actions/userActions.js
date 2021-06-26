import axios from 'axios';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_FAIL,
    MESSAGE_REQUEST,
    MESSAGE_SUCCESS,
    MESSAGE_FAIL
} from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST})

        const config = {
            headers: {

            }
        }

        const {data} = await axios.post('/user/login', {email, password}, config) //remove config


        dispatch({ //if user log in
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch({type: LOGOUT_USER_REQUEST})


        dispatch({ //if user log in
            type: LOGOUT_USER_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {

            }
        }
        const {data} = await axios.post('/user/register', {name, email,password});
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user //
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.reponse.data.message
        })
        
    }
}

export const contactUs = (email, message) => async (dispatch) => {
    try {
        dispatch({type: MESSAGE_REQUEST})

        const {data} = await axios.post('contact/message', {email,message});
        dispatch({
            type: MESSAGE_SUCCESS,
            payload: data.detail //
        })

    } catch (error) {
        dispatch({
            type: MESSAGE_FAIL,
            payload: error.reponse.data.message
        })
        
    }
}
/*
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({type: LOAD_USER_REQUEST})

        const config = {
            headers: {

            }
        }
        const {data} = await axios.get('/user/:id');
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,suer
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.reponse.data.message
        })
        
    }
}
*/
//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
} 

