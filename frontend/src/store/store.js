import {createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from './reducer/cartsReducer';
import filterReducer from './reducer/filtersReducer';
import { orderCreateReducer, orderDetailReducer, orderPayReducer } from './reducer/orderReducer';
import {productListReducer} from './reducer/productListReducer'
import { productDetailsReducer } from './reducer/productReducer';
import { userRegisterReducer, userSigninReducer } from './reducer/userReducer';

const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: 'Paypal',
    }, 
    orderCreate : localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
};

const reducer = combineReducers({
    productList: productListReducer,
    filters: filterReducer,
    productDetails: productDetailsReducer,
    userSignin : userSigninReducer,
    userRegister : userRegisterReducer,
    cart : cartReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailReducer,
    orderPay: orderPayReducer,

})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store