import Axios from 'axios';
import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstant';



export const addToCart = (productId,  sizeSelected) => async(dispatch, getState) => {
    const {data} = await Axios.get(`/api/products/${productId}`)
    const size = data.product.sizes.find(el => el.size === sizeSelected)
    console.log(data.product._id)

    dispatch({ type: CART_ADD_ITEM, payload: {
        _id : data.product._id,
        name: data.product.name,
        image: data.product.image,
        brand: data.product.brand,
        price: data.product.price,
        description: data.product.description,
        color: data.product.color,
        size: sizeSelected,
        sizeId: size,
        countInStock: size.countInStock,
        product: data.product,
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