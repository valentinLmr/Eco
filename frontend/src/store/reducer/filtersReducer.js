import { BRAND, CATEGORIES, COLOR, PRICE, SIZE } from '../../backend/constants/filterConstant';

const filters = {
    categories: [],
    size: null,
    brand: null,
    color: null,
    price: null,
    data: false
}


const filterReducer = (state = filters, action) => {
   

    switch (action.type) {
        case CATEGORIES:
            if (
                state.categories.includes(action.payload) &&
                state.categories.length === 1
              ) {
                return {
                ...state, 
                categories: []} 
                
            } else if (
                state.categories.includes(action.payload) &&
                state.categories.length > 1
              ) {

                const updateArray = state.categories.filter( categorie => categorie !== action.payload);
                return {
                    ...state, 
                    categories: updateArray
                }
            } else {
                return {...state,
                    data: true,
                    categories: state.categories.concat(action.payload)
                }                 
        };
        
        case SIZE:
            return {
                ...state, 
                size: action.payload
            }

        case BRAND:
            return {
                ...state, 
                brand: action.payload
            }

        case COLOR:
            return {
                ...state,
                color: action.payload
            }
        case PRICE:
            return {
            ...state, 
            price: action.payload

            }
        default:
            return state
    };
}

export default filterReducer

    
 