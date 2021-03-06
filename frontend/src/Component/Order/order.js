import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MessageBox } from '../Helper/MessageBox';
import { LoadingBox } from '../Helper/LoadingBox';

import CartCardProduct from '../cart/cartCardProduct';
import Paypal from '../payment/paypal';
import { orderDetail } from '../../backend/Actions/orderActions';
import {ORDER_PAY_RESET} from '../../backend/constants/order'



 const PlaceOrder = (props) => {

    const orderId = props.match.params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const orderPay = useSelector(state => state.orderPay)
    const {error: errorPay, success: successPay} = orderPay
    const {order, loading, error} = orderDetails
    const dispatch = useDispatch();

    useEffect(() => {
        if(!order || successPay || (order && order._id !== orderId)){
        dispatch({type: ORDER_PAY_RESET});
        dispatch(orderDetail(orderId))};
    }, [dispatch, orderId, successPay, order])

    console.log(order)
    return loading ?
        (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ):(
        <div>
            <div>
                <Link to={'/products'} className='link_to_products'>
                    retour à votre shopping
                </Link>
                <div style={{display: 'flex', width: "90%", margin: "0 auto"}}>
                        <section className='cardsOfProductCart'>
                                {order.cartItems.map((item) => <CartCardProduct key={item._id} item={item} order={order.createdAt} deliver={order.isDelivered} ></CartCardProduct>)}   
                        </section> 
                        
                
                    
                    <section className="bill">

                        <div className='flex center'>
                            <u><h5>Résumé de vos informations</h5></u>
                        </div>
                            <p>{order.shippingAddress.fullName} </p>
                        
                            <p>{order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.city}  </p>
                        
                            <p>{order.shippingAddress.country} </p>
                        
                        <div className=" flex center" id="title-bill">
                            <u><h5>Resumé de votre panier</h5></u>
                        </div>
                        <div className='flex space-between'>
                            <p>Nombres d'articles</p>
                            <p>{order.cartItems.length}</p>
                        </div>
                        <div className='flex space-between'>
                            <p>Articles</p>
                            <p>{(order.totalPrice).toFixed(2)}€</p>
                        </div>
                        <div className='flex space-between'>
                            <p>Reduction</p>
                            <p>0</p>
                        </div>
                        <div className='flex space-between'>
                            <p>Frais de Livraison</p>
                            <p>{(order.deliveryPrice.toFixed(2))}€</p>
                        </div>
                        <div className='flex space-between'>
                            <u><h5>Total Prix</h5></u>
                            <h5>{(order.totalPrice + order.deliveryPrice).toFixed(2)}€</h5>
                        </div>

                        {!order.isPaid && <Paypal orderDetail={order} error={errorPay}></Paypal>}                      
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                        {!order.isPaid ?  <MessageBox variant="danger">Command isn't Paid</MessageBox> : <MessageBox variant="success">Command is Paid</MessageBox>}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder