import Axios from "axios"
import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCES } from "../constants/userConstants";

export const signin = (email, password) => async(dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: { email, password}})
    try{
        console.log('je vais envoyer formulaire signin')
         const {data} = await Axios.post('/api/users/signin', { email, password });
         console.log(data)
        dispatch({type : USER_SIGNIN_SUCCES, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        console.log(error)
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message ? error.response.data.message : error.message })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_SIGNIN_SIGNOUT})
}
