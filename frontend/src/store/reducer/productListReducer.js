import { PRODUCT_LIST_FAIL, PRODUCT_LIST_FILTERING, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../../backend/constants/productConstant';

const initialState = {
    loading:false,
    allProducts: [],
    productsToDisplay: [],
    error:null,
    
}

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return{...state,
                loading: true}
        case  PRODUCT_LIST_SUCCESS:
            return {
                ...state, 
                loading: false,
                productsToDisplay: action.payload,
                allProducts: action.payload

            }
        case PRODUCT_LIST_FAIL:
        return {
            ...state,
            loading: false, 
            error: action.payload
        }
        default: 
        return state;
    }
}
