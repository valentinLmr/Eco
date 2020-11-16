import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_RESET, CREATE_PRODUCT_SUCCESS } from "../../backend/constants/productConstant";

export const productDetailsReducer = (state = { product: {}, loading: false}, action) => {
    switch(action.type){
        case 'PRODUCT_DETAILS_REQUEST':
            return {...state, loading: true};
        case 'PRODUCT_DETAILS_SUCCESS':
                return {...state, product: action.payload, loading: false};
        case 'PRODUCT_DETAILS_FAIL':
            return {...state,  product: action.payload, loading: false};
        default:
        return state
    }
}

export const productCreatedReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_PRODUCT_REQUEST:
            return {loading: true};
        case CREATE_PRODUCT_SUCCESS:
                return {success:true, loading: false, product: action.payload};
        case CREATE_PRODUCT_FAIL:
            return {loading: false, error: action.payload};
        case CREATE_PRODUCT_RESET:
            return {}
        default:
        return state
    }
}