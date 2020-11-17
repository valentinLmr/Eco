import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './cart.css'
import { addToCart } from '../../backend/Actions/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import { MessageBox } from '../Helper/MessageBox'
import CartCardProduct from './cartCardProduct'

const Cart = (props) => {

    const productId = props.match.params.id ? props.match.params.id : ''

        const detailProducts = props.location.search ? props.location.search : '';
        const color = detailProducts ? detailProducts.split('&')[0].split('=')[1] : ''
        const size = detailProducts ? detailProducts.split('&')[1].split('=')[1] : '';
    

    const cart = useSelector((state) => state.cart)

    const {cartItems} = cart
    
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, color, size, 1))
        }
    }, [dispatch, productId, color, size])

    const checkOutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    
    return(
        <div>
            <Link to={'/products'} className='link_to_products'>
            <p className='back flex center'><i className='fa fa-caret-left'></i>retour à votre shopping</p>
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
                        <h5>Resumé de votre panier</h5>
                    </div>
                    <div className='flex space-between'>
                        <p>Nombres d'articles</p>
                        <p>{cartItems.length}</p>
                    </div>
                    <div className='flex space-between'>
                        <p>Total Prix</p>
                        <p>{cartItems.reduce((a,c) => a + c.price, 0)}€</p>
                    </div>
                    <div className='flex space-between'>
                        <p>Reduction</p>
                        <p>0€</p>
                    </div>
                    <div className='flex space-between'>
                        <p>Frais de Livraison</p>
                        <p>GRATUIT</p>
                    </div>
                    <div className='flex space-between'>
                        <h5>Total Prix</h5>
                        <h5>{cartItems.reduce((a,c) => a + c.price, 0)}€</h5>
                    </div>
                    <button
                        type='button'
                        className="primary block button-product-add"
                        onClick={checkOutHandler}
                        >
                        Valider
                    </button>

                </section>
            </div>
        </div>
    )

}

export default Cart