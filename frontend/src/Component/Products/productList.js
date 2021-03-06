import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, listProducts } from '../../backend/Actions/productActions';
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET } from '../../backend/constants/productConstant';
import { LoadingBox } from '../Helper/LoadingBox';
import { MessageBox } from '../Helper/MessageBox';

const ProductList = (props) => {
    
    const productList = useSelector( state => state.productList)
    const {loading, error, allProducts} = productList;
    const productDelete = useSelector(state => state.productDelete)
    const {error: errorDelete, loading: loadingDelete, success: successDelete} = productDelete

    const createdProduct = useSelector( state => state.createdProduct)
    const {error: errorCreatedProduct, loading: loadingCreatedProduct, success: successCreatedProduct, product: productCreatedProduct} = createdProduct;
    const dispatch = useDispatch();
    useEffect(() => {
        if(successDelete){
            dispatch({type: DELETE_PRODUCT_RESET})
        }
        if(successCreatedProduct) {
            props.history.push(`/products/${productCreatedProduct._id}/edit`)
            dispatch({type: CREATE_PRODUCT_RESET});

        }
        dispatch(listProducts())
    }, [createdProduct, dispatch, props.history, successCreatedProduct, successDelete,productCreatedProduct._id ])

    const deleteHandler = (product) => {
        if(window.confirm('Are you sure to delete ?')){
        dispatch(deleteProduct(product._id))
        }
    }
    const createHandler = () => {
        dispatch(createProduct());
    }
    return ( 
<div>
    <div>
        <h3> Products List</h3>
        <button type='button' className='primary' onClick={createHandler}> Create product</button>
    </div>
    {loadingDelete && <LoadingBox></LoadingBox>}
    {errorDelete && <MessageBox vairant='danger'>{error}</MessageBox>}
    {loadingCreatedProduct && <LoadingBox></LoadingBox>}
    {errorCreatedProduct && <MessageBox variant='danger'>{error}</MessageBox>}
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
                            onClick={() =>props.history.push(`/products/${product._id}/edit`)}>
                                Edit
                            </button>
                            
                            <button type='button' className='small'
                            onClick={() => deleteHandler(product)}
                            >
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