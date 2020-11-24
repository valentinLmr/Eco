import {createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { cartReducer } from './reducer/cartsReducer';
import { orderCreateReducer, orderDeleteReducer, orderDetailReducer, orderListReducer, orderMineListReducer, orderPayReducer } from './reducer/orderReducer';
import {productListReducer} from './reducer/productListReducer'
import { productCreatedReducer, ProductDeletedReducer, productDetailsReducer, ProductUpdatedReducer } from './reducer/productReducer';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer} from './reducer/userReducer';

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
    productDetails: productDetailsReducer,
    userSignin : userSigninReducer,
    userRegister : userRegisterReducer,
    cart : cartReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer, 
    createdProduct: productCreatedReducer,
    productUpdate: ProductUpdatedReducer,
    productDelete : ProductDeletedReducer,
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store