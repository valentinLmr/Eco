
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../../backend/Actions/cartAction';
import CheckOutStep from '../checkOut/checkOutSteps'

const ShippingAddress = () => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefaul();
      dispatch(saveShippingAddress(fullName, address, city, postalCode, country))
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
                <input type="text" id='fullName' placeholder='Enter ful name' value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
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
                <button className='primary' type='submit'></button>
            </div>
            </form>
        </div>
    )
}

export default ShippingAddress;