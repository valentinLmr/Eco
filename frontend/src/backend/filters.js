import product from '../Component/Products/cardProducts';
import * as useFull from './Usefull'

 const checkQuantities = (products, filters) => {
    let arrayOfQuantity = [];
    let sum;

    if (filters.size) {
      products.map((product) => {
        product.colors.map((color) => {
          arrayOfQuantity.push(checkQuantity(color, filters));
        });
        sum = useFull.reducermethod(arrayOfQuantity);
        arrayOfQuantity = [];
        if (sum === 0) {
          useFull.splice(products, product);
        }
        return products;
      });
    } else {
      return products;
    }
  };

   const checkQuantity = (element, filters) => {
    let result;
    let color;
    if (!filters.color) {
      result = element.sizes.find(
        (product) => product.size === filters.size
      );
    } else {
      color = element.filter((product) => product.color === filters.color);
    }
    return result.quantity;
  };

  

  const filterMethod = (arrayOfProductsTofilter, keyOfProduct, valueOfProduct) => {
    console.log(arrayOfProductsTofilter)
    console.log(keyOfProduct)
    console.log(valueOfProduct)


    return arrayOfProductsTofilter.filter((product) => {
      return product[keyOfProduct] === valueOfProduct;
    });
  };

  const findItem = (productsToFilter, filters) => {
    console.log(productsToFilter)
    console.log(filters)
    let arrayofproduct = [];
    let initialState = [...productsToFilter];
    console.log(filters)
    console.log(productsToFilter)

    if (
      filters.categories.length > 0 &&
      filters.price &&
      filters.brand
    ) {
      filters.categories.map((categorie) =>
        arrayofproduct.push(
          filterMethod(initialState, "category", categorie)
        )
      );
      arrayofproduct = [].concat(...arrayofproduct);
      arrayofproduct = arrayofproduct.filter((product) => {
        return (
          product.price <= filters.price &&
          product.brand === filters.brand
        );
      });
    } else if (filters.categories.length > 0 && filters.price) {
      filters.categories.map((categorie) =>
        arrayofproduct.push(
          filterMethod(initialState, "category", categorie)
        )
      );
      arrayofproduct = [].concat(...arrayofproduct);
      arrayofproduct = filterMethod(
        arrayofproduct,
        "price",
        filters.price
      );
    } else if (filters.categories.length > 0 && filters.brand) {
      filters.categories.map((categorie) =>
        arrayofproduct.push(
          filterMethod(initialState, "category", categorie)
        )
      );
      arrayofproduct = [].concat(...arrayofproduct);
      arrayofproduct = filterMethod(
        arrayofproduct,
        "brand",
        filters.brand
      );
    } else if (filters.categories.length === 0 && filters.price) {
      arrayofproduct.push(
        filterMethod(initialState, "price", filters.price)
      );
    } else if (filters.categories.length === 0 && filters.brand) {
      arrayofproduct.push(
        filterMethod(initialState, "brand", filters.brand)
      );
    } else if (filters.categories.length > 0) {
      filters.categories.map((categorie) => {
        arrayofproduct.push(
          filterMethod(initialState, "category", categorie)
        );
      });
    } else {
      arrayofproduct = initialState;
    }
    const products = [].concat(...arrayofproduct);
    checkQuantities(products, filters)
    
    return products;
  };

  export default findItem
 