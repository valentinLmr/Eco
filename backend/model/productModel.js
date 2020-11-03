import mongoose from 'mongoose';

const Schema = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    image:{type: String, required:true},
    brand:{type: String, required:true},
    category:{type: String, required:true},
    description:{type: String, required:true},
    price:{type: Number, required:true},
    colors:[{type: Schema.Types.ObjectId,
        ref: "Color"
    }],
    rating:{type: Number, required:true},
    numberOfReview:{type: Number, required:true},
    date: {type: Date, default: Date.now}
    
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema);

export default Product