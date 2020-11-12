import mongoose from 'mongoose'
const orderSchema = new mongoose.Schema(
    {
        cartItems: [
            {
                name: {type: String, required: true},
                qty: {type: Number, required: true},
                image: {type: String, required: true},
                color: {type: String, required: true},
                size: {type: String, required: true},
                price: {type: Number, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
            },
        ],
        shippingAddress: 
            {
                fullName: { type: String, required: true},
                address: { type: String, required: true},
                city: { type: String, required: true},
                postalCode: { type: String, required: true},
                country: { type: String, required: true},
            },
        paymentMethod: {type: String, required: true},
        itemsPrice: {type: Number, required: true},
        deliveryPrice: {type: Number, required: true},
        reductionPrice: {type: Number, required: true},
        totalPrice: {type: Number, required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        isPaid: { type:Boolean, default: false},
        paidAt: { type: Date},
        isDelivered: { type:Boolean, default: false},
        deliveredAt: { type:Boolean, default: false},
        },{
        timestamps: true
        }
);

const Order = mongoose.model('Order', orderSchema);

export default Order