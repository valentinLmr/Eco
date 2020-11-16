import { BRAND, CATEGORIES, COLOR, PRICE, SIZE } from '../constants/filterConstant';

export const filteringProduct = (actionType, filter) => async (dispatch) => {
    switch(actionType){
        case 'CATEGORIES':
            dispatch({
                type: CATEGORIES, payload: filter
            });
        break
        case 'PRICE':
            dispatch({
                type: PRICE, payload: filter
            });
        break
        case 'BRAND':
            dispatch({
                type: BRAND, payload: filter
            });
        break
        case 'SIZE':
            dispatch({
                type: SIZE, payload: filter
            });
        break
        case 'COLOR':
            dispatch({
                type: COLOR, payload: filter
            });
        break
       default:
           return console.log('')
        break
        
    }
}
  
