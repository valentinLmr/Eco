import React from "react";

function homeScreen(props) {
  return (
    <div className="main-home-page">
      <section className="banner">
        <a href="product"> About us</a>
      </section>

      <section className="promos-section">
        <a href='anchor' className="promos dress">
          <img alt="fix"  src="/image/dress.jpg" />
          <h1>Dress & SKirt</h1>
        </a>
        <a href='anchor' className="promos pant">
          <img alt="fix" src="/image/pants.jpeg" />
          <h1>Pants</h1>
        </a>
        <a href='anchor' className="promos vest">
          <img alt="fix" src="/image/vest.jpeg" />
          <h1>Top</h1>
        </a>
        <a href='anchor' className="promos accesories">
          <img alt="fix" src="/image/accesories.jpg" />
          <h1>Accesories</h1>
        </a>
      </section>

      <section className="products">
        <div className="carouselle-new-products">
          <h2>New collection</h2>
          <a href='anchor'>learn More</a>
        </div>
      </section>
    </div>
  );
}

export default homeScreen;
