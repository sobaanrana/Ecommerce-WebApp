
import { ADD_TO_CART, REMOVE_ITEM_CART } from "../constants/cartConstants"

export const cartReducer = (state = {cartItems : []} , action) => { //cartItems will contain whatever user has selected
    switch(action.type)  {
        
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find(i => i.product === item.product) //ids of project are checked

            if(isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item :
                        i)
                }


            } else {
                return{
                    ...state,
                    cartItems: [...state.cartItems, item] //from whatever in array of cart items, take item

                }
              

            }
        
        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.product !== action.payload)//filter all the products instead this 
            }

        default :
            return state

    }
}
