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
                cartItems: req.body.cartItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                deliveryPrice: req.body.deliveryPrice,
                reductionPrice: req.body.reductionPrice,
                totalPrice: req.body.totalPrice,
                user: req.user._id,
                PaidAt: Date
            });
            const createdOrder = await order.save()
            console.log(createdOrder)
            res.status(201).send({ message : 'New Order Created', order: createdOrder });
        };
    })
)

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req,res) => {
    console.log('je suis bien ici')
    const order = await Order.findById(req.params.id)
    console.log(order)
    if(order){
        res.send(order)
    }else{
        res.status(404).send ({message: 'Order not found'})
    }
}))

export default orderRouter