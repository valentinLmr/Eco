import React, { useEffect} from "react";
import CardProducts from './cardProducts';
import FilterBar from '../Helper/filterbar';
import { MessageBox } from "../Helper/MessageBox";
import { LoadingBox } from "../Helper/LoadingBox"
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../backend/Actions/productActions"

const ProductsScreen = () => {
  
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  const {loading, error, allProducts } = productList;


  useEffect(() => {
      dispatch(listProducts())
  }, [dispatch])
  
    return (
      <div>
        <FilterBar />
        <div className="main-products-screen">

          {loading? (<LoadingBox></LoadingBox>) 
          : error? (<MessageBox variant='danger'>{error}</MessageBox>) 
          :( <div className="products-display">

                {allProducts.map((product) => (
                 <CardProducts product={product} key={product._id}/>))}
              </div>) }
        </div>
      </div>
    );   
}

export default ProductsScreen

