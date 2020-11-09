import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutStep from '../checkOut/checkOutSteps';
import { MessageBox } from '../Helper/MessageBox';
import CartCardProduct from '../Products/Product/cart/cartCardProduct';

 const PlaceOrder = () => {

    const cart = useSelector(state => state.cart)

    const {cartItems, shippingAddress, paymentMethod} = cart
    return (
        <div>
            <CheckOutStep step1 step2 step3 step4>
            </CheckOutStep>

            <div>
            <Link to={'/products'} className='link_to_products'>
                retour à votre shopping
            </Link>
            <div style={{display: 'flex', width: "90%", margin: "0 auto"}}>
                <section className='cardsOfProductCart'>
                    {cartItems.length === 0 ?                 <div className='card_cart_product'>
                <MessageBox>Cart is empty <Link to='/'>Go to Shopping</Link></MessageBox> </div> :
                   cartItems.map((item) => 
                        <CartCardProduct key={item._id} item={item}></CartCardProduct>
                    )}
                </section>
                <section className="bill">
                    <div className=" flex center" id="title-bill">
                        <h1>Resumé de votre panier</h1>
                    </div>
                    <div className='flex space-between'>
                        <h4>Nombres d'articles</h4>
                        <h4>{cartItems.length}</h4>
                    </div>
                    <div className='flex space-between'>
                        <h4>Total Prix</h4>
                        <h4>{cartItems.reduce((a,c) => a + c.price, 0)}€</h4>
                    </div>
                    <div className='flex space-between'>
                        <h4>Reduction</h4>
                        <h4>0€</h4>
                    </div>
                    <div className='flex space-between'>
                        <h4>Frais de Livraison</h4>
                        <h4>GRATUIT</h4>
                    </div>
                    <div className='flex space-between'>
                        <h2>Total Prix</h2>
                        <h2>{cartItems.reduce((a,c) => a + c.price, 0)}€</h2>
                    </div>
                    <button
                        type='button'
                        className="primary block button-product-add"
                        >
                        Valider
                    </button>

                </section>
            </div>
        </div>
        </div>
    )
}

export default PlaceOrder