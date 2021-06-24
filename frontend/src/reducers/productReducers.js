import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const productsReducer = (state = { products:[] }, action) => {//state contains products that is empty array
    switch(action.type) {
        case ALL_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
            
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false, //products fetched successfully
                products: action.payload.products, //we are goung to set products in this state
                productsCount: action.payload.productsCount,
                resPerPage: action.payload.resPerPage

            }
            
        case ALL_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state, // whatver in state
                error: null
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {product : {}}, action) => { //product is an empty object by default in state
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state, //spreading state
                loading: true,
            }

        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state, //spreading state
                loading: false,//products fetched from backend
                product: action.payload
            }
            
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state, //spreading state
                loading: true,
                //error: action.payload
                error: null
            }

        case CLEAR_ERRORS:
            return {
                ...state, // whatver in state
                error: null
            }
            
            
        default:
            return state
    }
}