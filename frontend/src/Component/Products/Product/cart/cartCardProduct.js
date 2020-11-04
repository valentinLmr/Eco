import React from 'react'
import './cartCardProduct.css'

function cart() {

    return(
        <div className='card_cart_product'>
                <img className='cart_photo' alt="fix" src="/image/pants.jpeg"  />
                <aside id="card-cart-product-aside">
                    <section id='card-cart-product-aside-section-top'>
                        <div id='card-cart-product-aside-section-top-infos'>
                            <h1> Pantalon Beige toile</h1>
                            <h3> Zadig and Voltaire</h3>
                            <p> plus que 5 dispos</p>
                            <div className='flex space-between details'>
                                <p>couleur</p>
                                <p>rose</p>
                            </div>
                            <div className='flex space-between details'>
                                <p>Taille</p>
                                <p>L</p>
                            </div>
                            <div className='flex space-between details'>
                                <p>Quantité</p>
                                <p>1</p>
                            </div>
                            <div className='flex space-between details'>
                                <p>Référence</p>
                                <p>1234567</p>
                            </div>
                        </div>
                        <div id='card-cart-product-aside-section-top-price'>
                            <div className='element'>
                                <input type="text" defaultValue="Code promo" />
                                <h2>59.99€</h2>
                            </div>
                        </div>

                    </section>
                    <section id='card-cart-product-aside-section-bottom' >
                        <button id="button-card-cart-product"> Modifer</button>
                        <button id="button-card-cart-product"> Supprimer</button>
                    </section>
                </aside>
        </div>
    )

}

export default cart