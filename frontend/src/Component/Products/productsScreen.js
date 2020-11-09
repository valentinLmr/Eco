import React, { useEffect} from "react";
import CardProducts from './cardProducts';
import FilterBar from './filterbar';
import { MessageBox } from "../Helper/MessageBox";
import { LoadingBox } from "../Helper/LoadingBox"
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../backend/Actions/productActions"
import findItem from "../../backend/filters";

const ProductsScreen = () => {
  
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const filters = useSelector((state) => state.filters);

  const {loading, error, allProducts } = productList;


  useEffect(() => {
      dispatch(listProducts())
  }, [])
  
  if (filters.data) {
    const productToDisplay = findItem(allProducts, filters)
    return (
      <div>
        <FilterBar />
        <div className="main-products-screen">

          {loading? (<LoadingBox></LoadingBox>) 
          : error? (<MessageBox variant='danger'>{error}</MessageBox>) 
          :( <div className="products-display">

                {productToDisplay.map((product) => (
                 <CardProducts key={product.name} product={product}/>))}
              </div>) }
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <FilterBar />
        <div className="main-products-screen">

          {loading? (<LoadingBox></LoadingBox>) 
          : error? (<MessageBox variant='danger'>{error}</MessageBox>) 
          :( <div className="products-display">

                {allProducts.map((product) => (
                 <CardProducts product={product} key={product.id} />))}
              </div>) }
        </div>
      </div>
    );
  }
  


    
}

export default ProductsScreen

