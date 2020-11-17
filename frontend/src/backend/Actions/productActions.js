import Axios from 'axios'
import { CREATE_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS,DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST } from '../constants/productConstant';

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
      const { data } = await Axios.get('/api/products');
      dispatch({ type : PRODUCT_LIST_SUCCESS, payload: data})
  } catch(error){
    dispatch({ type : PRODUCT_LIST_FAIL, payload: error.message})
  }
}

export const detailsProduct = (productId) => async(dispatch) => {
  dispatch({type: 'PRODUCT_DETAILS_REQUEST'});
  console.log('je suis ici')
  try{
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({type: 'PRODUCT_DETAILS_SUCCESS', payload: data});
  } catch (error){
    dispatch({type: 'PRODUCT_DETAILS_FAIL', payload: error.response && error.response.data.message ? error.message.data.message : error.messsage })
  }
}

export const createProduct = () => async (dispatch, getState) => {
  dispatch({type: CREATE_PRODUCT_REQUEST}); 
  const {userSignin:{ userInfo },} = getState();
  try {
    const { data } = await Axios.post(
      '/api/products', 
      {},
      {
      headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
    });
    dispatch({type: CREATE_PRODUCT_SUCCESS, payload: data.createdProduct,});
  } catch(error) {
    dispatch({type: CREATE_PRODUCT_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
  }
}

export const updateProductDetails = (product) => async( dispatch, getState) => {
  dispatch({type: UPDATE_PRODUCT_REQUEST, payload: product})
  const {userSignin: {userInfo},} = getState();
  console.log(product._id)
  try{
    const { data } = await Axios.put(
      `/api/products/${product._id}`,
      product,
      {headers:{
      Authorization: `Bearer ${userInfo.token}`
    },
  });

  dispatch({type: UPDATE_PRODUCT_SUCCESS, payload: data})

  }catch(error){
    dispatch({type: UPDATE_PRODUCT_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})
  }
}

export const deleteProduct = (productId) => async(dispatch, getState) => {
  dispatch({type : DELETE_PRODUCT_REQUEST, product: productId})
  const {userSignin: {userInfo}} = getState();
  console.log(productId)
  try{
    const { data } = await Axios.delete(
      `/api/products/${productId}`,
      {headers:{
      Authorization: `Bearer ${userInfo.token}`
    },
  });

  dispatch({type: DELETE_PRODUCT_SUCCESS, payload: data})

  }catch(error){
    dispatch({type: DELETE_PRODUCT_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message})

  }
}
