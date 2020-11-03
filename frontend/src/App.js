import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./Component/homeScreen";
import ProductsScreen from "./Component/Products/productsScreen";
import Product from "./Component/Products/Product/Product";
import Cart from './Component/Products/Product/cart/cart'
import SignIn from "./Component/User/signIn";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "./backend/Actions/userActions";

function App() {
  const OpensideBar = () =>
    document.querySelector(".sidebar").classList.add("open");
  const RemovesideBar = () =>
    document.querySelector(".sidebar").classList.remove("open");

  const userSignIn = useSelector((state) => state.userSignin)
  const {userInfo} = userSignIn

  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout());
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={OpensideBar}> Amazonia</button>
          </div>

          <div className="header-links">
            <Link to="/products"> Vêtement</Link>
            <Link to="/mycart"> Panier</Link>
            {userInfo ? (
            <div className='dropdown'>
              <Link to="#"> 
                {userInfo.name} <i class='fa fa-caret-down'></i>{' '}
              </Link>  
              <ul className='dropdown-content'> 
                <Link to='#signout' onClick={signoutHandler}>Sign Out</Link>
              </ul>
            </div>
            ) : (
            <Link to="/signin"> SignIn</Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={RemovesideBar}>
            x
          </button>
          <ul>
            <li>
              <Link to="/">Pants</Link>
            </li>

            <li>
              <Link to="/">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <Route path='/mycart' exact={true} component={Cart} />
          <Route path="/products/:id" exact={true} component={Product} />
          <Route path="/products" exact={true} component={ProductsScreen} />
          <Route path="/signin"  exact={true} component={SignIn}></Route>
          <Route path="/" exact={true} component={HomeScreen} />
        </main>
        <footer className="footer">
          <p>Thanks for passing By</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
