import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProductDetails } from '../../backend/Actions/productActions';
import { UPDATE_PRODUCT_RESET } from '../../backend/constants/productConstant';
import { LoadingBox } from '../Helper/LoadingBox';
import { MessageBox } from '../Helper/MessageBox';

const ProductEdit = (props) => {
    const productId = props.match.params.id
     
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const productDetails = useSelector(state => state.productDetails)
    const productUpdate = useSelector(state => state.productUpdate)
    const {error: errorUpdate, success: successUpdate, loading: loadingUpdate} = productUpdate
    const {error, loading, product} = productDetails
    const dispatch = useDispatch();
    useEffect(() => {
        if(successUpdate){
            dispatch({type: UPDATE_PRODUCT_RESET})
            props.history.push('/productlist')
        }
        if(!product || (product._id !== productId)){
            dispatch(detailsProduct(productId));
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setBrand(product.brand);
            setDescription(product.description);
        }
    }, [dispatch, product, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductDetails({_id: product._id, name, price, image, category, brand, description}))
        
    }

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Edit Product</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant='danger'></MessageBox>}
                {loading ? <LoadingBox></LoadingBox> :
                error ? <MessageBox variant='danger'>{error}</MessageBox> :
                <>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input id='name' type='text' placeholder='Enter name' value={name} onChange={ (e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='price'>Price</label>
                    <input id='price' type='text' placeholder='Enter price' value={price} onChange={ (e) => setPrice(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='image'>Image</label>
                    <input id='image' type='text' placeholder='Enter image' value={image} onChange={ (e) => setImage(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='category'>Category</label>
                    <input id='category' type='text' placeholder='Enter category' value={category} onChange={ (e) => setCategory(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='brand'>Brand</label>
                    <input id='brand' type='text' placeholder='Enter brand' value={brand} onChange={ (e) => setBrand(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='countInStock'>CountInStock</label>
                    <input id='countInStock' type='text' placeholder='Enter countInStock' value={countInStock} onChange={ (e) => setCountInStock(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='description'>Description</label>
                    <input id='description' type='text' placeholder='Enter description' value={description} onChange={ (e) => setDescription(e.target.value)}></input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type='submit'>
                        Update
                    </button>
                </div>
                </>
                }
            </form>
        </div>
    )
}

export default ProductEdit
