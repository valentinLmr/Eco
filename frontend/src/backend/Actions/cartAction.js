import Axios from 'axios';
import { CART_ADD_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstant';



export const addToCart = (productId, qty) => async(dispatch, getState) => {
    console.log('je suis ici')
    console.log(productId)
    const {data} = await Axios.get(`/api/products/${productId}`)
    console.log(data)
    dispatch({ type: CART_ADD_ITEM, payload: {
        name: data.name,
        image: data.image,
        price: data.price,
        color: null,
        countInStock: null,
        product: data._id,
        qty,
    }})
}
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}