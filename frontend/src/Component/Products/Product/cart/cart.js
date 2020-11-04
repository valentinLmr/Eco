import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CardProduct from './cartCardProduct'
import './bill.css'
import { addToCart } from '../../../../backend/Actions/cartAction'
import { useDispatch } from 'react-redux'

const Cart = (props) => {

    const productId = props.match.params.id
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, 1))
        }
    }, [dispatch, productId, 1])
    
    return(
        <div>
            <Link to={'/products'} className='link_to_products'>
                retour à votre shopping
            </Link>
            <div style={{display: 'flex', width: "90%", margin: "0 auto"}}>
                <section className='cardsOfProductCart'>
                <CardProduct/>
                </section>
                <section className="bill">
                    <div className=" flex center" id="title-bill">
                        <h1>Resumé de votre panier</h1>
                    </div>
                    <div className='flex space-between'>
                        <h4>Nombres d'artciles</h4>
                        <h4>1</h4>
                    </div>
                    <div className='flex space-between'>
                        <h4>Total Prix</h4>
                        <h4>39.99€</h4>
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
                        <h2>39.99€</h2>
                    </div>
                    <Link
            to={'/mycart'}
            className="button-product-add"
            >
              Valider
            </Link>

                </section>
            </div>
        </div>
    )

}

export default Cart