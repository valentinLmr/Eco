import findItem from '../../backend/filters'
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
             console.log(state.filters)
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
        case PRODUCT_LIST_FILTERING:
            console.log('je vais bien demarer la fonction filtering')
        const newArray = findItem(state.allProducts, action.payload)
        return{
            ...state,
            productsToDisplay: newArray
        }
        default: 
        return state;
    }
}
