import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardProduct from './cartCardProduct'
import './bill.css'
import { addToCart } from '../../../../backend/Actions/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import { MessageBox } from '../../../Helper/MessageBox'

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
    }, [dispatch, productId, color, size, 1])

    const checkOutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }
    
    return(
        <div>
            <Link to={'/products'} className='link_to_products'>
                retour à votre shopping
            </Link>
            <div style={{display: 'flex', width: "90%", margin: "0 auto"}}>
                <section className='cardsOfProductCart'>
                    {cartItems.length === 0 ?                 <div className='card_cart_product'>
<MessageBox>Cart is emmpty <Link to='/'>Go to Shopping</Link></MessageBox> </div> :
                   cartItems.map((item) => 
                        <CardProduct key={item._id} item={item}></CardProduct>
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