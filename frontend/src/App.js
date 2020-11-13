import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./Component/homeScreen";
import ProductsScreen from "./Component/Products/productsScreen";
import Product from "./Component/Products/Product/Product";
import Cart from './Component/Products/Product/cart/cart'
import SignIn from "./Component/User/signIn";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Register from "./Component/User/register";
import ShippingAddress from "./Component/Shipping/ShippingAddress";
import PaymentMethod from "./Component/payment/payment";
import { signout } from "./backend/Actions/userActions";
import PlaceOrder from "./Component/placeOrder/placeOrder";
import Order from './Component/placeOrder/order';
import OrdersHistory from './Component/placeOrder/orderHistory'
import Profil from "./Component/User/profil";

function App() {

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  const OpensideBar = () =>
    document.querySelector(".sidebar").classList.add("open");
  const RemovesideBar = () =>
    document.querySelector(".sidebar").classList.remove("open");

  const userSignIn = useSelector((state) => state.userSignin)
  const {userInfo} = userSignIn
  

  const dispatch = useDispatch()
  const signoutHandler = (e) => {
    e.preventDefault();
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
            <Link to="/cart"> panier { cartItems.length > 0 && ( <span className='badge'>{cartItems.length}</span>)}</Link>
            {userInfo ? (
            <div className='dropdown'>
              <Link to="#"> 
                {userInfo.name} <i className='fa fa-caret-down'></i>{' '}
              </Link>  
              <ul className='dropdown-content'> 

              <li>
                <Link to='#signout' onClick={e => signoutHandler(e)}>Sign Out</Link>
              </li>
              
              <li>
                <Link to='/profile'>Profile</Link>
              </li>

              <li>
                <Link to='/ordershistory'>Order History</Link>
              </li>
                
                
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
          <Route path='/cart/:id?' component={Cart} />
          <Route path="/products/:id" component={Product} />
          <Route path='/orders/:id' component={Order}/>
          <Route path="/products" component={ProductsScreen} exact />
          <Route path="/signin"  component={SignIn}></Route>
          <Route path="/register"  component={Register}></Route>
          <Route path='/shipping' component={ShippingAddress}></Route>
          <Route path='/payment' component={PaymentMethod}></Route>
          <Route path='/placeorder' component={PlaceOrder}></Route>
          <Route path='/ordershistory' component={OrdersHistory}></Route>
          <Route path='/profile' component={Profil}/>
          <Route path="/"  component={HomeScreen} exact/>
        </main>
        <footer className="footer">
          <p>Thanks for passing By</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
