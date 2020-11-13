import { USER_DETAILS_FAIL,
         USER_DETAILS_REQUEST, 
         USER_DETAILS_SUCCESS, 
         USER_REGISTER_FAIL, 
         USER_REGISTER_REQUEST, 
         USER_REGISTER_SUCCESS, 
         USER_SIGNIN_FAIL, 
         USER_SIGNIN_REQUEST, 
         USER_SIGNIN_SIGNOUT, 
         USER_SIGNIN_SUCCESS, 
         USER_UPDATE_PROFIL_FAIL,
         USER_UPDATE_PROFIL_REQUEST,
         USER_UPDATE_PROFIL_RESET,
         USER_UPDATE_PROFIL_SUCCESS} 
from "../../backend/constants/userConstants"

const Signin = {
        userInfo: null,
        loading: false,
        error: null
}

const Register = {
    userInfo: null,
    loading: false,
    error: null
}

export const userSigninReducer = (state = Signin, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {...state, loading: true}
        case USER_SIGNIN_SUCCESS:
            return {...state, userInfo: action.payload, loading: false};
        case USER_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload};
        case USER_SIGNIN_SIGNOUT:
            console.log('je suis ici')
            return {}
        default:
        return state
    }
}

export const userRegisterReducer = (state = Register, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {...state, loading: true}
        case USER_REGISTER_SUCCESS:
            return {...state, userInfo: action.payload, loading: false};
        case USER_REGISTER_FAIL:
            return { ...state, loading: false, error: action.payload}
        default:
        return state
    }
}

export const userDetailsReducer = (state = {loading: true} , action) => {
    switch(action.type){
    case USER_DETAILS_REQUEST:
        return {loading: true}
    case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload}
    case USER_DETAILS_FAIL:
        return {loading: false, error: action.payload}    
    default: 
    return state
    }
}

export const userUpdateProfileReducer = (state = {loading: true} , action) => {
    switch(action.type){
        case USER_UPDATE_PROFIL_REQUEST:
            return {loading: true}
        case USER_UPDATE_PROFIL_SUCCESS:
            return {loading: false, success: true}
        case USER_UPDATE_PROFIL_FAIL:
            return { loading: false, error: action.payload}
        case USER_UPDATE_PROFIL_RESET: 
            return {}        
        default:
        return state
    }
}