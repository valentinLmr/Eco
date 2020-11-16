import { PromiseProvider } from 'mongoose';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../backend/Actions/productActions';
import { LoadingBox } from '../Helper/LoadingBox';
import { MessageBox } from '../Helper/MessageBox';

const ProductList = () => {
    const productList = useSelector( state => state.productList)
    const {loading, error, allProducts} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const deleteHandler = () => {

    }
    return ( 
<div>
    <h3> Products List</h3>
    {loading ? <LoadingBox></LoadingBox> :
    error ? <MessageBox variant='danger'>{error}</MessageBox> :
    <table className='table'>
        <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>QUANTITY</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>COLOR</th>
                    <th>BRAND</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {allProducts.map((product) => 
                    <tr key= {product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>x</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>x</td>
                        <td>{product.brand}</td>
                        <td>
                            <button type='button' className='small'
                            onCick={() =>PromiseProvider.hsitory.push(`/product/${product._id}/edit`)}>
                                Edit
                            </button>
                            <button type='button' className='small'
                            onCick={() => deleteHandler(product)}>
                                Delete
                            </button>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>}
    </div>)
}

export default ProductList