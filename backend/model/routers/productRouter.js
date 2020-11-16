import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../../data.js';
import Product from '../productModel.js';
import Color from '../colorModel.js'
import Size from '../sizeModel.js'
import { isAdmin, isAuth } from '../../utils.js';
const productRouter = express.Router();

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const productId = req.params.id
    console.log(productId)
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
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
    let products = await Product.find({});
    res.send(products)
    })
);


productRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    await Product.deleteMany();
    await Color.deleteMany()
    await Size.deleteMany()
    const createdProduct = await Product.insertMany(data.products)

    for (let i = 0; i < createdProduct.length; i++){
        
        let createdColor = await Color.insertMany(data.colors)
        let product = createdProduct[i]

        createdColor.map( color => {
            color.productRef = product._id
            color.save()
            product.colors.push(color)    
            product.save()            
        })
        for (let i = 0; i < product.colors.length; i++){

            let color = product.colors[i]

            let createdSize = await Size.insertMany(data.sizes)

            createdSize.map( size => {
                size.colorRef = color._id
                size.countInStock = Math.round(Math.random() * 10 + 1)
                size.save() 
                color.sizes.push(size)
                color.save()
                
            }) 
        }
    
        Product.findOne({ name: 'tunique' }).populate('colors')
        Color.findOne({color: 'red'}).populate('sizes')


    }

    res.send({createdProduct})

}))

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate({ path:'colors', populate:{ path:'sizes'}})
  
    if(product){
        res.send(product)
    }else {
        res.status(404).send({ message: 'Product Not Found'})
    }
}))

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const newProduct = new Product({
        name:'sample Name' + Date.now(),
        image:'/images/p1.jpg',
        price:'0',
        category:'sample Category',
        brand:'sample brand',
        description:'sample decription',
        rating:0,
        numberOfReview: 0
    });
const createdProduct = await newProduct.save()

res.send({message: 'Product Created', createdProduct})

}))






export default productRouter