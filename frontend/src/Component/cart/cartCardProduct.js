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
                <img className='cart_photo' alt="fix" src={props.item.image}  />
                <aside id="card-cart-product-aside">
                <button className="button-card-cart-product" onClick={ (e) => deleteItemHandler(props.item)} ><i class="fas fa-trash-alt"></i></button>

                <h4 className='center'>{props.item.brand} - {props.item.name}</h4> 

                    <section id='card-cart-product-aside-section-top'>
                        <div id='card-cart-product-aside-section-top-infos'>
                        
                                 <h5>Infos</h5>
                            
                            <div className='flex space-between details center'>
                                <p> <strong>couleur</strong></p>
                                <b><p>{props.item.color}</p></b>
                            </div>
                            <div className='flex space-between details center'>
                                <p> <strong>Tailles</strong></p>
                                <b><p>{props.item.size}</p></b>
                            </div>
                            <div className='flex space-between details center'>
                                <p><strong>Quantité</strong></p>
                                <b><p>{props.item.qty}</p></b>
                            </div>
                            <div className='flex space-between details center'>
                                <p><strong>référence</strong></p>
                                <b><p>1234455</p></b>
                            </div>
                            <div className=' flex center details justify-center'>
                            <h4>{props.item.price}€</h4>
                            </div>

                        </div>
                        <div id='card-cart-product-aside-section-top-price'>
                            <div className='element'>
                                <h5> Description</h5>
                                <p>{props.item.description}</p>
                                
                            </div>
                        </div>

                    </section>
                        
                        <div id ='card-cart-product-aside-section-bottom'>
                        {/* {props.order && !props.deliver ? */}
                        <MessageBox variant='danger'>Order Isn't deliverd yet</MessageBox>
                        {/* : props.order && props.deliver ? <MessageBox variant='success'>Order Is delivered</MessageBox>
                        : ''
                        } */}
                        </div> 
                       
                        
                </aside>
        </div>
    )

}

export default CartCardProduct