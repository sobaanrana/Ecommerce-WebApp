/*import { ADD_TO_CART } from "../constants/cartConstants"

export const addToCart = () => async (dispatch) => {
    dispatch({type: ALL_PRODUCTS_REQUEST}) //when it is dispatched it set loading true and products to empty array in the state

        const { data } = await axios.get('/products/${id}') //Get request

        dispatch({
            type: ADD_TO_CART,
            payload: data.product
        })
}
*/

import axios from 'axios'
//import { ADD_TO_CART, REMOVE_ITEM_CART,  } from '../constants/cartConstants'
import { ADD_TO_CART, REMOVE_ITEM_CART,SAVE_SHIPPING_INFO } from "../constants/cartConstants"
export const addItemToCart = (id, quantity) => async (dispatch, getState) => { //getState will get current state
    const { data } = await axios.get(`/products/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) //getting cart and in it cart items
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))

}