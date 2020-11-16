import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


const PrivateRoute = ({component: Component, ...rest}) => {
const userSignin = useSelector(state => state.userSignin);
const {userInfo} = userSignin
console.log(rest);

return (
    <Route
        {...rest} render={(props) => userInfo ? <Component {...props}></Component> : 
        <Redirect to='/signin/'></Redirect>}>
    </Route>

)
}

export default PrivateRoute
