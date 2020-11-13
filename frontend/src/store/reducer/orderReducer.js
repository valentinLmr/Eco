import { ORDER_CREATE_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_FAIL_REQUEST, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, ORDER_RESET_REQUEST, ORDER_SUCCESS_REQUEST } from "../../backend/constants/order";

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

export const orderDetailReducer = (state = {loading:true, order:{}}, action) => {
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {...state, loading:true}
        case ORDER_DETAILS_SUCCESS:
            return {...state, loading: false, order: action.payload}
        case ORDER_DETAILS_FAIL: 
            return {...state, loading: false, error: action.payload}
        default:
        return state
    }
}

export const orderPayReducer = ( state = {}, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading: true}
        
        case ORDER_PAY_SUCCESS:
            return {loading: false, success: true, }
        
        case ORDER_PAY_FAIL:
            return {loading: false, error : action.payload}
        case ORDER_PAY_RESET:
            return {}
        default:

        return state
    }
}

export const orderMineListReducer = (state = {orders: []}, action) => {
    switch(action.type){
        case ORDER_MINE_LIST_REQUEST:
            return {loading: true}
        case ORDER_MINE_LIST_SUCCESS:
            return {loading: false, orders: action.payload}
        case ORDER_MINE_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}