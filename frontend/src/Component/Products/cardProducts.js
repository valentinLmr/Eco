import React from 'react';
import { Link } from "react-router-dom";

const Product = (props) =>{

  return (
    <Link data='hello'
      className="product-card"
      to={"/products/" + props.product._id}
    >
      <div className="container-image-product-card">
        <img alt='fix' src={props.product.image} className="cart_photo" />
      </div>
      <div className="card-trip-infos">
        <div>
          <h5>{props.product.name}</h5>
          <p><i>{props.product.brand}</i></p>
        </div>
        <h5 className="card-trip-pricing">{props.product.price} €</h5>
      </div>
    </Link>
  );
}

export default Product;
