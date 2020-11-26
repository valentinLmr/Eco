import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../productModel.js';
import Color from '../colorModel.js'
import Size from '../sizeModel.js'
import { isAdmin, isAuth } from '../../utils.js';
import data from '../../data.js'
import mongoose from 'mongoose'

const productRouter = express.Router();

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const productId = req.params.id
    console.log(productId)
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.color = req.body.color;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.description = req.body.description;
        product.brand = req.body.brand;

        const updatedProduct = await product.save()
        res.send(updatedProduct)
    } else {
        res.status(404).send({message: 'product not found'})
    }
}));


productRouter.get('/', expressAsyncHandler(async(req ,res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const size = req.query.size ? { size: req.query.size } : {};
    const color = req.query.color ? { color: req.query.color } : {};
    const price = req.query.price ? { price: { $lt: parseInt(req.query.price) } } : {};
    const search = req.query.search ? { 
        name: {
            $regex: req.query.search,
            $options: 'i'
        },
        description:{
            $regex: req.query.search,
            $options: 'i' 
        } } : {};

    const products =  await Product.find({ ...category, ...size, ...color, ...price, ...search })
    res.send(products)
    })
);

productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await Product.deleteMany();
    await Color.deleteMany();
    await Size.deleteMany()  ;

    const createdProduct = await Product.insertMany(data.products)

    for (let i = 0; i < createdProduct.length; i++){
        
        let product = createdProduct[i]
        let createdSize = await Size.insertMany(data.sizes)

        createdSize.map( size => {
            size.productRef = product._id
            size.countInStock = Math.floor(Math.random() * 10);
            size.save()
            product.sizes.push(size)    
        })
        product.save()
    
        Product.findOne({ name: 'tunique' }).populate('sizes')
    }
    res.send({createdProduct})

}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate({ path:'sizes'});
    const Similarproduct =  await Product.find({name: product.name }).populate({path: 'sizes'});
 

    if(product){
        res.send({product, Similarproduct})
    }else {
        res.status(404).send({ message: 'Product Not Found'})
    }
}))

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const newProduct = new Product({
        name:'sample Name' + Date.now(),
        image:'/images/p1.jpg',
        price:'0',
        color:'sample Color',
        category:'sample Category',
        brand:'sample brand',
        description:'sample decription',
        rating:0,
        numberOfReview: 0
    });
    const createdProduct = await newProduct.save()

    res.send({message: 'Product Created', createdProduct})

}))

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        const deletedProduct = await product.remove()
        res.send({message: 'product deleted', product: deletedProduct})

    }else{
        res.status(404).send({ message: 'Product Not Found'})
    }
}))






export default productRouter