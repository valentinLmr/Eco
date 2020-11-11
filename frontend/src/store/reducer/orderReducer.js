import { ORDER_CREATE_REQUEST, ORDER_FAIL_REQUEST, ORDER_RESET_REQUEST, ORDER_SUCCESS_REQUEST } from "../../backend/constants/order";

export const orderCreateReducer = (state = {}, action) => {

    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: true}
        case ORDER_SUCCESS_REQUEST:
            return { loading: false, success: true, order: action.payload}
        case ORDER_FAIL_REQUEST:
            return {loading:false, success: false, error: action.payload}
        case ORDER_RESET_REQUEST:
            return {};
        default:
        return state
    }   

}