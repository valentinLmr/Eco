export const productDetailsReducer = (state = { product: {}, loading: false}, action) => {
    switch(action.type){
        case 'PRODUCT_DETAILS_REQUEST':
            return {...state, loading: true};
        case 'PRODUCT_DETAILS_SUCCESS':
            console.log('succes')
                return {...state, product: action.payload, loading: false};
        case 'PRODUCT_DETAILS_FAIL':
            return {...state,  product: action.payload, loading: false};
        default:
        return state
    }
}