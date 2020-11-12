import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteFromCar } from '../../../../backend/Actions/cartAction'
import { MessageBox } from '../../../Helper/MessageBox'
import './cartCardProduct.css'

const CartCardProduct = (props)  => {

     const dispatch = useDispatch();
 const deleteItemHandler = (id) => {
     if(id){
        dispatch(deleteFromCar(id))
     }
 }
    return(
        <div className='card_cart_product'>
                <img className='cart_photo' alt="fix" src="/image/pants.jpeg"  />
                <aside id="card-cart-product-aside">
                    <section id='card-cart-product-aside-section-top'>
                        <div id='card-cart-product-aside-section-top-infos'>
                            <h1> {props.item.name}</h1>
                            <h3> {props.item.brand}</h3>
                            <p> {props.item.countInStock}</p>
                            <div className='flex space-between details'>
                                <p>couleur</p>
                                <p>{props.item.color}</p>
                            </div>
                            <div className='flex space-between details'>
                                <p>Taille</p>
                                <p>{props.item.size}</p>
                            </div>
                            <div className='flex space-between details'>
                                <p>Quantité</p>
                                <p>{props.item.qty}</p>
                            </div>
                            <div className='flex space-between details'>
                                <p>Référence</p>
                                <p>{props.item._id}</p>
                            </div>
                        </div>
                        <div id='card-cart-product-aside-section-top-price'>
                            <div className='element'>
                                <input type="text" defaultValue="Code promo" />
                                <h2>{props.item.price}€</h2>
                            </div>
                        </div>

                    </section>
                        {!props.deliver ? 
                        <div id ='card-cart-product-aside-section-bottom'>
                        <section className='flex space-between'>
                            <button className="primary button-card-cart-product"> Modifer</button>
                            <button className="primary button-card-cart-product" onClick={ (e) => deleteItemHandler(props.item)} > Supprimer</button>
                        </section>
                        <MessageBox variant='danger'>Order Isn't deliverd yet</MessageBox>
                        </div> : <MessageBox variant='success'>Order Is delivered</MessageBox>
                        }
                        
                </aside>
        </div>
    )

}

export default CartCardProduct