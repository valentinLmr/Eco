import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const colorSchema = new mongoose.Schema({
    
    color: {type: String, required: true},
    productRef:{
        type: Schema.Types.ObjectId,
        ref:'Product'
    },
    sizes:[{
            type: Schema.Types.ObjectId,
            ref: 'Size'}]   
}, {
    timestamps: true,
})

const Color = mongoose.model('Color', colorSchema);

export default Color