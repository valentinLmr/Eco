import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteFromCar } from '../../backend/Actions/cartAction'
import { MessageBox } from '../Helper/MessageBox'
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
                        
                                <h4>{props.item.brand} - <i> {props.item.name}</i></h4>  
                            
                            <div className='flex space-between details center'>
                                <h5>couleur</h5>
                                <b><p>{props.item.color}</p></b>
                            </div>
                            <div className='flex space-between details center'>
                                <h5>Taille</h5>
                                <b><p>{props.item.size}</p></b>
                            </div>
                            <div className='flex space-between details center'>
                                <h5>Quantité</h5>
                                <b><p>{props.item.qty}</p></b>
                            </div>
                            <div className='flex space-between details center'>
                                <h5>Référence</h5>
                                <b><p>{props.item._id}</p></b>
                            </div>
                        </div>
                        <div id='card-cart-product-aside-section-top-price'>
                            <div className='element'>
                                <input type="text" defaultValue="Code promo" />
                                <h4>{props.item.price}€</h4>
                            </div>
                        </div>

                    </section>
                        
                        <div id ='card-cart-product-aside-section-bottom'>
                        <section className='flex space-between'>
                            <button className="primary button-card-cart-product"> Modifer</button>
                            <button className="primary button-card-cart-product" onClick={ (e) => deleteItemHandler(props.item)} > Supprimer</button>
                        </section> 
                        {props.order && !props.deliver ?
                        <MessageBox variant='danger'>Order Isn't deliverd yet</MessageBox>
                        : props.order && props.deliver ? <MessageBox variant='success'>Order Is delivered</MessageBox>
                        : ''
                        }
                        </div> 
                        
                        
                </aside>
        </div>
    )

}

export default CartCardProduct