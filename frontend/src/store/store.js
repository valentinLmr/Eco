import {createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from './reducer/cartsReducer';
import filterReducer from './reducer/filtersReducer';
import {productListReducer} from './reducer/productListReducer'
import { productDetailsReducer } from './reducer/productReducer';
import { userRegisterReducer, userSigninReducer } from './reducer/userReducer';

const initialState = {}

const reducer = combineReducers({
    productList: productListReducer,
    filters: filterReducer,
    productDetails: productDetailsReducer,
    userSignin : userSigninReducer,
    userRegister : userRegisterReducer,
    cart : cartReducer

})
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSIONS_COMPOSE || compose;
const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store