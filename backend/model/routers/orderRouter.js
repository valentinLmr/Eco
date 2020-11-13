import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../../utils.js';
import Order from '../orderModel.js';

const orderRouter = express.Router();

orderRouter.get('/mine', isAuth, expressAsyncHandler(async(req,res) => {
    const orders = await Order.find({user: req.user._id});
    res.send (orders)
    })
)

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

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async(req,res) => {
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id : req.params.id,
            status: req.params.status, 
            update_time: req.params.update_time, 
            email_address: req.body.email_address 
        };
        const orderUpdate = await order.save();
        res.send(orderUpdate)
    } else {
        res.status(404).send({message:'Order Not Found'})
    }
}))

export default orderRouter