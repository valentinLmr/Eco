import React, { useEffect, useState } from "react";
import "./Product.css";
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from "../../../backend/Actions/productActions";

const Product = (props) => {

   const dispatch = useDispatch();
   const productId = props.match.params.id
  const productDetails = useSelector( state => state.productDetails);
  const  {product, productSibling } = productDetails;
  console.log(productSibling)
  const [size, setSize] = useState('')

  const [color, setColor] = useState('')
  const [imageCentral, setImageCentral] = useState('')
  
  useEffect(() => {
    if(product){
      console.log(product)
      setImageCentral(product.image)
    }

    if(!product){
    dispatch(detailsProduct(productId));
    }
  }, [dispatch, productId, product])

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?clr=${product.color}&?sz=${size ? size : product.colors[0].sizes[0].size}`)
  }

  const changeProductHandler = (id) => {
    if (id) {
    dispatch(detailsProduct(id));
    }
  }

  const selectedSizeHandler= (e)=> {
  
    const target = e.target;
    const parent = target.parentElement;
    let siblings = Array.from(parent.children).filter(el => el !== target);

    siblings.map(el => {
      
        el.classList.remove('selected')

    })

    target.classList.add('selected')
    setSize(target.innerText.toLowerCase())
  }

  console.log(size)

  


    return (
      <>
      {product ? <div className="product-display-screen">
      <aside className="product-side-pictures">
        <div className="container-photos-product-sider">
          <img alt='fix' className="photo" src={product.image} onClick={ e => setImageCentral(product.image)}></img>
          <img alt='fix' className="photo" src={product.image2} onClick={ e => setImageCentral(product.image2)}></img>
          <img alt='fix' className="photo" src={product.image3} onClick={ e => setImageCentral(product.image3)}></img>
          <img alt='fix' className="photo" src={product.image4} onClick={ e => setImageCentral(product.image4)} ></img>
          <img alt='fix' className="photo" src={product.image5} onClick={ e => setImageCentral(product.image5)}></img>
        </div>
      </aside>
      <div className="product-picture-selected">
        <img alt='fix' className="central-photo" src={imageCentral}></img>
      </div>
      <aside className="product-side-infos">
        <div className="product-infos">
          <div className="product-name">
              <h4>{product.name} - {product.brand}</h4>
              <p style={{ textDecoration: "underline" }}>Détails</p> 
          </div>
          <div className="details-product">
            
            <div className="detail couleur-product">
             
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                    {
                      // Need to implement the change product Handler
                      productSibling?  productSibling.map(product => <img className='photo_sibling_product'src={product.image} onClick={ e => changeProductHandler(product._id)}></img>) : ''
                    }
                </div>
            </div>

            <div
              className="detail"
            >
              <div className='boxSize-Container'>
                  {product.sizes ?  product.sizes.map(size => <h5 className='boxSize-Option' onClick={ e => selectedSizeHandler(e)} key={size._id} value={size.size}> {size.size.toUpperCase()}</h5> ) : '' }
              </div>
            </div>
            <div className="detail">
              <p>Guide des tailles</p>
            </div>
            <div className="detail center">
              <input type="text" defaultValue="Code promo" />
            </div>
            <div className='flex center'>
            <h4>59.99€</h4>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
            onClick={addToCartHandler}
            className="button-product-add"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </aside>
    </div> : ''}
      </>
    
  );
}


export default Product;
