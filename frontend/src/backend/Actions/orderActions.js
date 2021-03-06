import Axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_FAIL_REQUEST, ORDER_SUCCESS_REQUEST, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_SUCCESS, ORDER_DELETE_REQUEST, ORDER_DELETE_FAIL, ORDER_DELETE_SUCCESS } from "../constants/order"

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

export const payOrder = (order , paymentResult) => async(dispatch, getState) => {
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}})
    const {userSignin: {userInfo}} = getState()
    try{
        console.log(order._id)
        console.log(paymentResult)
        const {data} = await Axios.put(`/api/orders/${order._id}/pay`, 
            paymentResult,
            {headers : {
                Authorization:`Bearer ${userInfo.token}`
            },
        })
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data})

    } catch (error) {
        dispatch({type: ORDER_PAY_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

export const listOrderMine = () => async(dispatch, getState) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST});
    const {userSignin:{userInfo}} = getState();
    try{
        const {data} = await Axios.get('/api/orders/mine', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
         });
         console.log(data)
        dispatch({type: ORDER_MINE_LIST_SUCCESS, payload: data});

    }catch(error){
        dispatch({type: ORDER_MINE_LIST_FAIL, payload: error.message && error.response.data.message ? error.response.data.message : error.message})
    }

}

export const listOrder = () => async(dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try{
        const {data} = await Axios.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
         });
        dispatch({type: ORDER_LIST_SUCCESS, payload: data});

    }catch(error){
        dispatch({type: ORDER_LIST_FAIL, payload: error.message })
    }
}

export const deleteOrder = (productId) => async(dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST});
    const {userSignin:{userInfo}} = getState();
    try{

        const {data} = await Axios.delete(`/api/orders/${productId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
         });
        dispatch({type: ORDER_DELETE_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: ORDER_DELETE_FAIL, payload: error.message })

    }
}

