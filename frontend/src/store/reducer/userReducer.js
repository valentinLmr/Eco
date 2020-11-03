import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCES } from "../../backend/constants/userConstants"

const initalState = {
        userInfo: null,
        loading: false,
        error: null
}

export const userSigninReducer = (state = initalState, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {...state, loading: true}
        case USER_SIGNIN_SUCCES:
            return {...state, userInfo: action.payload, loading: false};
        case USER_SIGNIN_FAIL:
            return { ...state, loading: false, error: action.payload};
        case USER_SIGNIN_SIGNOUT:
            return {}
        default:
        return state
    }
}