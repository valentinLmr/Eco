import mongoose from 'mongoose';

const Schema = mongoose.Schema

const sizeSchema = mongoose.Schema({
    size: {type: String, required: true},
    countInStock: {type: Number},
    productRef:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    }
}, {
    timestamps:true
})

const Size = mongoose.model('Size', sizeSchema);

export default Size