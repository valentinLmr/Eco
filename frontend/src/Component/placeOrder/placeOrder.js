import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../../backend/Actions/orderActions';
import CheckOutStep from '../checkOut/checkOutSteps';
import { MessageBox } from '../Helper/MessageBox';
import { LoadingBox } from '../Helper/LoadingBox';

import CartCardProduct from '../Products/Product/cart/cartCardProduct';
import { CART_EMPTY } from '../../backend/constants/cartConstant';
import { ORDER_RESET_REQUEST } from '../../backend/constants/order';



 const PlaceOrder = (props) => {

    const cart = useSelector(state => state.cart)
    const {cartItems, shippingAddress, paymentMethod} = cart


    if (!paymentMethod){
        props.history.push('/payment')
    }

    const orderCreate = useSelector(state => state.orderCreate)
    const {loading,success, error, order } = orderCreate

    cart.itemsPrice = cartItems.reduce((a,c) => a + c.price, 0)
    cart.totalPrice = cartItems.reduce((a,c) => a + c.price, 0)
    cart.deliveryPrice = cart.totalPrice > 100 ? 0 : (cart.totalPrice * 0.15)
    cart.reductionPrice = 0

    
    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart}))
    }

    useEffect(() => {
        if (success) {
            props.history.push(`/orders/${order._id}`);
            dispatch({ type: ORDER_RESET_REQUEST });
          }
        }, [dispatch, order, props.history, success]);

   

    return (
        <div>
            <CheckOutStep step1 step2 step3 step4>
            </CheckOutStep>

            <div>
                <Link to={'/products'} className='link_to_products'>
                    retour à votre shopping
                </Link>
                <div style={{display: 'flex', width: "90%", margin: "0 auto"}}>

                    {order ? 
                        <section className='cardsOfProductCart'>
                            {order.cartItems.map((item) =>  <CartCardProduct key={item._id} item={item}></CartCardProduct>)}
                        </section> :
                        <section className='cardsOfProductCart'>
                            {cartItems.length === 0 ?                 
                                <div className='card_cart_product'>
                                    <MessageBox><Link to='/'>Keep Shopping</Link></MessageBox> 
                                </div> :
                                cartItems.map((item) => <CartCardProduct key={item._id} item={item}></CartCardProduct>)
                            }
                        </section> 
                        
                    }
                    
                    <section className="bill">

                        <div className='flex center'>
                            <h1>Résumé de vos informations</h1>
                        </div>
                            <h4>{shippingAddress.fullName} </h4>
                        
                            <h4>{shippingAddress.address}, {shippingAddress.postalCode}, {shippingAddress.city}  </h4>
                        
                            <h4>{shippingAddress.country} </h4>
                        
                        <div className=" flex center" id="title-bill">
                            <h1>Resumé de votre panier</h1>
                        </div>
                        <div className='flex space-between'>
                            <h4>Nombres d'articles</h4>
                            <h4>{cartItems.length}</h4>
                        </div>
                        <div className='flex space-between'>
                            <h4>Articles</h4>
                            <h4>{(cart.totalPrice).toFixed(2)}€</h4>
                        </div>
                        <div className='flex space-between'>
                            <h4>Reduction</h4>
                            <h4>0</h4>
                        </div>
                        <div className='flex space-between'>
                            <h4>Frais de Livraison</h4>
                            <h4>{(cart.deliveryPrice.toFixed(2))}€</h4>
                        </div>
                        <div className='flex space-between'>
                            <h2>Total Prix</h2>
                            <h2>{(cart.totalPrice + cart.deliveryPrice).toFixed(2)}€</h2>
                        </div>
                            <button
                                type='button'
                                className="primary block button-product-add"
                                onClick={placeOrderHandler}
                                >
                                Valider
                            </button>     
                        {loading && <LoadingBox></LoadingBox>}
                        {error && <MessageBox variant="danger">{error}</MessageBox>}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder