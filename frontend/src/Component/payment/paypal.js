import React, { useEffect, useState } from 'react'
import {PayPalButton} from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios';

const Paypal = () => {

    const [sdkReady, setSdkReady] =  useState(false);
    const orderDetails = useSelector(state => state.orderDetails)
    const {order} = orderDetails

    const dispatch = useDispatch();

    useEffect(() => {
        if(order){
            const addPaypalScript = async () => {
                const {data} = await Axios.get('api/config/paypal');
                console.log(data)
                const script = document.createElement('script');
                script.type='text/javascript';
                script.src=`https://www.paypal.com/sdk/js?client-id=${data}`
                script.async = true
                script.onload = () => {
                    setSdkReady(true)
                }
                document.body.appendChild(script)
            }
        
            if(!order.isPaid){
                if(!window.paypal) {
                    addPaypalScript();
                } else{
                    setSdkReady(true)
                }
            }
        }
        
    }, [order, sdkReady])

    const successPaymentHandler = () => {
        
       
    }
    return (
        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
    )

}

export default Paypal

