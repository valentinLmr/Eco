import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_EMPTY, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING_ADDRESS } from "../../backend/constants/cartConstant";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product._id  === item.product._id)
            if(existItem){
                return {...state,
                cartItems: state.cartItems.map(x => x.product === existItem ? item : x)}
            } else {
                return { ...state, cartItems: [...state.cartItems, item]}
            }
            case CART_DELETE_ITEM:
                return {
                    ...state, cartItems : state.cartItems.filter(x => x._id !== action.payload._id)
                };
            case CART_SAVE_SHIPPING_ADDRESS:
                return {...state, shippingAddress: action.payload};
            case CART_SAVE_PAYMENT:
                return {...state, paymentMethod:  action.payload}
            case CART_EMPTY:
                return {...state, cartItems: []}
        default:
        return state;
    }
    
};
