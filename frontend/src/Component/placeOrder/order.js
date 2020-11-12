import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MessageBox } from '../Helper/MessageBox';
import { LoadingBox } from '../Helper/LoadingBox';

import CartCardProduct from '../Products/Product/cart/cartCardProduct';
import Paypal from '../payment/paypal';
import { orderDetail } from '../../backend/Actions/orderActions';



 const PlaceOrder = (props) => {

    const orderId = props.match.params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(orderDetail(orderId))
    }, [dispatch, orderId])

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
                                {order.cartItems.map((item) => <CartCardProduct key={item._id} item={item} deliver={order.isDelivered} ></CartCardProduct>)}   
                        </section> 
                        
                
                    
                    <section className="bill">

                        <div className='flex center'>
                            <h1>Résumé de vos informations</h1>
                        </div>
                            <h4>{order.shippingAddress.fullName} </h4>
                        
                            <h4>{order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.city}  </h4>
                        
                            <h4>{order.shippingAddress.country} </h4>
                        
                        <div className=" flex center" id="title-bill">
                            <h1>Resumé de votre panier</h1>
                        </div>
                        <div className='flex space-between'>
                            <h4>Nombres d'articles</h4>
                            <h4>{order.cartItems.length}</h4>
                        </div>
                        <div className='flex space-between'>
                            <h4>Articles</h4>
                            <h4>{(order.totalPrice).toFixed(2)}€</h4>
                        </div>
                        <div className='flex space-between'>
                            <h4>Reduction</h4>
                            <h4>0</h4>
                        </div>
                        <div className='flex space-between'>
                            <h4>Frais de Livraison</h4>
                            <h4>{(order.deliveryPrice.toFixed(2))}€</h4>
                        </div>
                        <div className='flex space-between'>
                            <h2>Total Prix</h2>
                            <h2>{(order.totalPrice + order.deliveryPrice).toFixed(2)}€</h2>
                        </div>

                        <Paypal></Paypal>                       
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