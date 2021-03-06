import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; //middleware allows you to write action creators that return a function instead of an action.
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productsReducer } from './reducers/productReducers'
import { contactUsReducer, userReducer } from './reducers/userReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    //we have reducers for every resource like product, users reducer. So we will add all the reducers in this combined reducer function
    products: productsReducer,
    productDetails: productDetailsReducer,
    loggedInUser : userReducer,
    //loadUser : userReducer,
    contactUs : contactUsReducer,
    cart : cartReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems'))  //converting into JSON
                                                    : []
    }
} //contains all the data we want to put in the state just before loading the application

//Now create store

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;