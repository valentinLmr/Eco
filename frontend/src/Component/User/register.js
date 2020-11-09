import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { registerIn } from '../../backend/Actions/userActions';
import { LoadingBox } from '../Helper/LoadingBox';
import {MessageBox} from '../Helper/MessageBox'
import './signIn.css'

const Register = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')


    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    const userRegister = useSelector((state) => state.userRegister)
    const {userInfo, loading, error} = userRegister

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert('Password and confirm password are not similar')
        }else {
        dispatch(registerIn(name, email, password))
         }
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [userInfo, props, redirect])

    return (
        <div>
            <form className = 'form' onSubmit={submitHandler}>
                <div>
                    <h1>Create Accoumpt</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor='form'>Name </label>
                    <input type='name' id='name' placeholder='Enter name' required onChange={(e) => setName(e.target.value)}></input>
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
                    <label htmlFor='confirmPassword'>Confirm password</label>
                    <input type='password' id='password' placeholder='Enter password' required onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <div>
                <label/>
                <button className="primary" type="submit"> Register</button>
                </div>
                <div>
                Already have an account  ? {' '}
                    <Link to={`/signIn?redirect=${redirect}`}> SignIn</Link>
                </div>
            </form>
        </div>
    )
}

export default Register