import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../backend/Actions/cartAction';
import CheckOutStep from '../checkOut/checkOutSteps'

const ShippingAddress = (props) => {
    const userSignIn = useSelector ((state)=> state.userSignin)

    const {userInfo} = userSignIn;
    const cart =  useSelector(state => state.cart)

    const { shippingAddress } = cart

    console.log(cart)

    if(!userInfo) {
        props.history.push('/signin')
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    console.log(fullName, address, city, postalCode, country)

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
      dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
      props.history.push('/payment')
    }
    return (
        <div>
            <CheckOutStep step1 step2 ></CheckOutStep>
            <form className='form' onSubmit={submitHandler}>
            <div>
                <h1>shipping address</h1>
            </div>
            <div>
                <label htmlFor='fullName'>Fullname</label>
                <input type="text" id='fullName' placeholder='Enter full name' value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor='address'>Address</label>
                <input type="text" id='address' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor='city'>City</label>
                <input type="text" id='city' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor='postalCode'>PostalCode</label>
                <input type="text" id='postalCode' placeholder='Enter postalCode' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
            </div>
            <div>
                <label htmlFor='country'>Country</label>
                <input type="text" id='country' placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)} required></input>
            </div>
            <div>
                <label/>
                <button className='primary' type='submit'> Continue</button>
            </div>
            </form>
        </div>
    )
}

export default ShippingAddress;