import Axios from 'axios';
import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstant';



export const addToCart = (productId, colorSelected,  sizeSelected) => async(dispatch, getState) => {
    const {data} = await Axios.get(`/api/products/${productId}`)
    const color = data.colors.find(el => el.color === colorSelected)
    const size = color.sizes.find(el => el.size === sizeSelected)

    dispatch({ type: CART_ADD_ITEM, payload: {
        _id : data._id,
        name: data.name,
        image: data.image,
        brand: data.brand,
        price: data.price,
        description: data.description,
        color: colorSelected,
        size: sizeSelected,
        colorId: color,
        sizeId: size,
        countInStock: size.countInStock,
        product: data,
        qty: 1,
    }})
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const deleteFromCar = (id) => (dispatch, getState) => {
    dispatch({ type: CART_DELETE_ITEM, payload: id})
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data});
    localStorage.setItem('shippingAddress',  JSON.stringify(data));
};

export const savePaymentMethod = (paymentMethod) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: paymentMethod})
}