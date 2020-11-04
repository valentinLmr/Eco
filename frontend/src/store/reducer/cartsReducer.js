import { CART_ADD_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../../backend/constants/cartConstant";
import ShippingAddress from "../../Component/Shipping/ShippingAddress";

export const cartReducer = (state= {cartItems: []}, action) => {
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product  === item.product)
            if(existItem){
                return {...state,
                cartItems: state.cartItems.map(x => x.product === existItem.product? item : x)}
            } else {
                return { ...state, cartItems: [...state.cartItems, item]}
            }
            default:
            return state;
    }
}

export const cartShippingreducer = (state = { product: {}, loading: false}, action) => {
    switch(action.type){
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, ShippingAddress: action.payload};
        case 'PRODUCT_DETAILS_SUCCESS':
                return {...state, product: action.payload, loading: false};
        case 'PRODUCT_DETAILS_FAIL':
            return {...state,  product: action.payload, loading: false};
        default:
        return state
    }
}