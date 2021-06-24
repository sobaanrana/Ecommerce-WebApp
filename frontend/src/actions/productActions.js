import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const getProducts = (keyword= '', pageNo = 1, price, category, rating=0) => async (dispatch) => {
    try {
        dispatch({type: ALL_PRODUCTS_REQUEST}) //when it is dispatched it set loading true and products to empty array in the state

        let link = ''
        if(category) {
             link = `/products?page=${pageNo}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`
        }
        else
        {
             link = `/products?page=${pageNo}&keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}` //price is an array
        }
        const { data } = await axios.get(link) //Get request

        

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL, //IN case of error this is dispatched
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message

        })
        
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
} 

