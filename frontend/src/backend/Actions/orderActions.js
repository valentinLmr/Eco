import Axios from "axios";
import { CART_EMPTY } from "../constants/cartConstant";
import { ORDER_CREATE_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_FAIL_REQUEST, ORDER_RESET_REQUEST, ORDER_SUCCESS_REQUEST } from "../constants/order"

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
     localStorage.setItem('order', JSON.stringify(getState().order))

     
    } catch (error){
    dispatch({type: ORDER_FAIL_REQUEST, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const orderDetail = (id) => async(dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST});
    const {userSignin: {userInfo}} = getState()
    try{
        const {data} = await Axios.get(`/api/orders/${id}`, 
        {headers : {
            Authorization:`Bearer ${userInfo.token}`
        },
    })
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data})
    } catch(error){
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

    