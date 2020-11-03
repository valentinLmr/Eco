import {createStore, compose, applyMiddleware, combineReducers, bindActionCreators } from 'redux'
import thunk from 'redux-thunk';
import filterReducer from './reducer/filtersReducer';
import {productListReducer} from './reducer/productListReducer'
import { productDetailsReducer } from './reducer/productReducer';
import { userSigninReducer } from './reducer/userReducer';

const initialState = {}

const reducer = combineReducers({
    productList: productListReducer,
    filters: filterReducer,
    productDetails: productDetailsReducer,
    userSignin : userSigninReducer
})
const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSIONS_COMPOSE || compose;
const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store