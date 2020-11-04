import React from 'react';
import './checkOutSteps.css'

const CheckOutStep = (props) => {
    return(
        <div className='row checkout-steps'>
            <div className={props.step1? 'active' : ''}>SignIn</div>
            <div className={props.step2? 'active' : ''}>Shipping</div>
            <div className={props.step3? 'active' : ''}>Payment</div>
            <div className={props.step4? 'active' : ''}>PlaceHolder</div>
        </div>
    )
}

export default CheckOutStep