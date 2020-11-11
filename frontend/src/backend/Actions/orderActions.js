import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstant";
import { ORDER_CREATE_REQUEST, ORDER_FAIL_REQUEST, ORDER_RESET_REQUEST, ORDER_SUCCESS_REQUEST } from "../constants/order"

export const createOrder = (order) => async(dispatch, getState) => {
    console.log(order)
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try{
        const {userSignin: {userInfo}} = getState();
        const {data} = await Axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
     dispatch({type: ORDER_SUCCESS_REQUEST, payload: data.order});
     dispatch({type: CART_EMPTY});
     localStorage.removeItem('cartItems');
    } catch (error){
        dispatch({type: ORDER_FAIL_REQUEST, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

    