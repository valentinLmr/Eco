import React, { useState } from 'react';
import CheckoutSteps from '../checkOut/checkOutSteps';
import { savePaymentMethod } from '../../backend/Actions/cartAction';
import { useDispatch, useSelector } from 'react-redux';
import './payment.css'

const PaymentMethod = (props) => {

    const cart = useSelector(state => state.cart)

    const {shippingAddress} = cart
    console.log(shippingAddress)


    if(!shippingAddress.address) {
        props.history.push('/shipping')
    }

        const [paymentMethod, setPayement] = useState('')
        const dispatch = useDispatch();

        const selectHandler = (e) => {
            e.preventDefault();
            e.target.parentElement.classList.toggle('selectedPayment')
            e.target.previousSibling.checked = true
            e.target.parentElement.dataset.payment === 'Paypal' ? e.target.parentElement.nextSibling.classList.remove('selectedPayment'): e.target.parentElement.previousSibling.classList.remove('selectedPayment') ;
        }

        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(savePaymentMethod(paymentMethod));
            props.history.push('/placeorder')
        }
    return(
        <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form className='form' onSubmit={submitHandler}>
            <div><h1>Payement Method</h1></div>
            <div className='paymentSelectionContainer'>
                <div onClick={(e) => selectHandler(e)}  className='PaymentChoice selectedPayment' data-payment='Paypal'>
                    <input  type='radio' id='paypal' name='paymentMethod' required ></input>
                     <img alt='fix' src='/image/paypal.png'  className="payment_photo" onClick={(e) => setPayement('Paypal')}/>
                </div>
                <div  onClick={(e) => selectHandler(e)} className='PaymentChoice' data-payment='Stripe'>
                    <input type='radio' id='stripe' name='paymentMethod' required ></input>
                    <img  alt='fix' src='/image/cb.png'  className="payment_photo"  onClick={(e) => setPayement('Stripe')}/>
                </div>
            </div>
            <div>
                <button className='primary' type='submit'> Continue</button>
            </div>
        </form>
        </div>
    )
}

export default PaymentMethod