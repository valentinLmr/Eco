import Axios from "axios"
import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_REGISTER_SUCCESS, USER_SIGNIN_SUCCESS, USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS } from "../constants/userConstants";

export const signin = (email, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: { email, password}})
    try{
         const {data} = await Axios.post('/api/users/signin', { email, password });
        dispatch({type : USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message ? error.response.data.message : error.message })
    }
}

export const signout = () => async(dispatch) => {
   localStorage.removeItem('userInfo');
   localStorage.removeItem('shippingAddress')
   localStorage.removeItem('cartItems')
    dispatch({type: USER_SIGNIN_SIGNOUT})
}

export const registerIn = (name, email, password) => async(dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}})
    try{
         const {data} = await Axios.post('/api/users/register', {name, email, password });
         dispatch({type : USER_REGISTER_SUCCESS, payload: data});
        dispatch({type : USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message ? error.response.data.message : error.message })
    }
}

export const detailsUser = (userId) => async(dispatch, getState) => {
    dispatch({type:USER_DETAILS_REQUEST, payload: userId});
    const {userSignin: {userInfo}} = getState();
    try{
        const {data} =  await Axios.get(`/api/users/${userId}`,{
            header:{ Authorization : `Bearer ${userInfo.token}`}
        });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data})
        

    }catch(error){
        dispatch({type: USER_DETAILS_FAIL, payload: error.message && error.response.data.message ? error.response.data.message : error.message})
    }
}

