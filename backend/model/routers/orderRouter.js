import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../../utils.js';
import Order from '../orderModel.js';

const orderRouter = express.Router();

orderRouter.post('/',
    isAuth,
    expressAsyncHandler(async(req,res)=> {
        if(req.body.orderItems.length === 0) {
            res.status(400).send({ message:'cart is empty'});
        } else {
            const order = new Order({
                orderItems: res.body.orderitems,
                shippingAddress: res.body.shippingAddress,
                paymentMethod: res.body.paymentMethod,
                itemsPrice: res.body.itemsPrice,
                shippingPrice: res.body.shippingPrice,
                deliveryprice: res.body.deliveryPrice,
                reductionPrice: res.body.reductionPrice,
                totalPrice: res.body.totalPrice,
                user: req.user_id,
            });
            const createdOrder = await order.save()
            res.status(201).send({ message : 'New Order Created', order: createdOrder });
        };
    })
)

export default orderRouter