import React from "react";
import { Link } from "react-router-dom";

function product(props) {
  return (
    <Link data='hello'
      className="product-card"
      to={"/products/" + props.product._id}
      key={props.key}
    >
      <div className="container-image-product-card">
        <img alt='fix' src={props.product.image} className="cart_photo" />
      </div>
      <div className="card-trip-infos">
        <div>
          <h2>{props.product.name}</h2>
          <p>{props.product.brand}</p>
        </div>
        <h2 className="card-trip-pricing">{props.product.price}</h2>
      </div>
    </Link>
  );
}

export default product;
