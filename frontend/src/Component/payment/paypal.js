import React, { useEffect, useState } from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import { useDispatch } from 'react-redux'
import Axios from 'axios';
import { payOrder } from '../../backend/Actions/orderActions';
import { MessageBox } from '../Helper/MessageBox';

const Paypal = (props) => {

    const [sdkReady, setSdkReady] =  useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(props.orderDetail){
            const addPaypalScript = async () => {
                const {data} = await Axios.get('/api/config/paypal');
                const script = document.createElement('script');
                script.type='text/javascript';
                script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
        
            if(!props.orderDetail.isPaid){
                if(!window.paypal) {
                    addPaypalScript();
                } else{
                    setSdkReady(true)
                }
            }
        }
        
    }, [props, sdkReady])

    const successPaymentHandler = (paymentResult) => {
        
        dispatch(payOrder(props.orderDetail, paymentResult))
       
    }
    return (
        <div>
            {props.error ? 
                <div>
                    <MessageBox variant='danger'>{props.error}</MessageBox>
                    <PayPalButton amount={props.orderDetail.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                </div> 
                :
                <PayPalButton amount={props.orderDetail.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
            }
        </div>
    )

}

export default Paypal

