import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { signin } from '../../backend/Actions/userActions';
import './signIn.css'

const SignIn = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userSignIn = useSelector((state) => state.userSignin)
    const {userInfo} = userSignIn

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [userInfo])

    return (
        <div>
            <form className = 'form' onSubmit={submitHandler}>
                <div>
                    <h1>Sign IN</h1>
                </div>
                <div>
                    <label htmlFor='form'>Email adress</label>
                    <input type='email' id='email' placeholder='Enter Email' required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='form'>Password</label>
                    <input type='password' id='password' placeholder='Enter password' required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                <label/>
                <button className="primary" type="submit"> Sign In</button>
                </div>
                <div>
                    New customer ? {' '}
                    <Link to="/register"> Create your accoumpt</Link>
                </div>
            </form>
        </div>
    )
}

export default SignIn