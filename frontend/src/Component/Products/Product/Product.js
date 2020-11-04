import React, { useEffect, useState } from "react";
import "./Product.css";
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { detailsProduct } from "../../../backend/Actions/productActions";

const Product = (props) => {

   const dispatch = useDispatch();
   const productId = props.match.params.id
  const productDetails = useSelector( state => state.productDetails);
  const {loading, product} = productDetails
  const {color, setColor} = useState('')
  
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId])

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}`)
  }


  console.log(product)
  return (
    <div className="product-display-screen">
      <aside className="product-side-pictures">
        <div className="container-photos-product-sider">
          <img alt='fix' className="photo" src={product.image}></img>
          <img alt='fix' className="photo" src={product.image}></img>
          <img alt='fix' className="photo" src={product.image}></img>
          <img alt='fix' className="photo" src={product.image}></img>
          <img alt='fix' className="photo" src={product.image}></img>
        </div>
      </aside>
      <div className="product-picture-selected">
        <img alt='fix' className="central-photo" src={product.image}></img>
      </div>
      <aside className="product-side-infos">
        <div className="product-infos">
          <div className="product-name">
            <h4>{product.band}</h4>
            <h1>{product.name}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ textDecoration: "underline" }}>Détails</p>
              <p>5/5</p>
            </div>
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
                <div className="circle-color-product"></div>
                <p>Rose</p>
              </div>
              <div className="setting-color-product">
                <p>Nb of color</p>
                <i className="fas fa-caret-down"></i>
              </div>
            </div>

            <div
              className="detail"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>color</p>
              <div className="setting-color-product">
                <select value={color} onChange={e => setColor(e.target.value)}>{
                  [...Array(product.colors)].map((x) => console.log(x))
                }
                  </select>
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
            <div className="detail">
              <p>Guide des tailles</p>
            </div>
            <div className="detail">
              <input type="text" defaultValue="Code promo" />
            </div>
            <h2>59.99€</h2>
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
    </div>
  );
}


export default Product;
