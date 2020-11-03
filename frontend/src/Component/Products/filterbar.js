import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteringProduct } from '../../backend/Actions/filterAction';



 const FilterBar = () => {

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters)
  console.log(filters)

  const dispatching = (key, value) => {
    updatefilter(key, value)
    updateProductToDispaly(filters)
    
  }


  const updatefilter = (key, value) => {
     dispatch(filteringProduct(key, value.toString()))
  } 

  const updateProductToDispaly = (filters) => {
    dispatch(filteringProduct(filters))
  }

  return (
      <section className="filterbar">
            <form>
              <div className="Searchbar">
                <input type="text" label="What are you looking for ?" />
                <i className="fas fa-search"></i>
              </div>
            </form>
            <ul
              className="filters"
              onClick={(e) => dispatching('CATEGORIES', e.target.innerText)}
            >
              <li>Robe</li>
              <li>Jupe</li>
              <li>Tee-shirt</li>
              <li>Sweatshirt</li>
              <li>Pants</li>
              <li>Jean</li>
              <li>Vest</li>
              <li>overalls</li>
            </ul>
  
            <div className="under-filters">
              <form className="under-filters-form">
                <select
                  type="select"
                  data-filter="size"
                  onChange={(e) =>
                    dispatching('SIZE', e.target.value)
                  }
                >
                  <option>S</option>
                  <option>M</option>
                  <option>XL</option>
                </select>
                <select
                  type="select"
                  data-filter="brand"
                  onChange={(e) => dispatching('BRAND', e.target.value)

                  }
                >
                  <option>Adidas</option>
                  <option>Nike</option>
                  <option>Vans</option>
                  <option>Veja</option>
                  <option>Converse</option>
                </select>
                <select
                  type="select"
                  data-filter="price"
                  onChange={(e) => dispatching('PRICE', e.target.value)}
                >
                  <option value="20">20 €</option>
                  <option value="40">40 €</option>
                  <option value="60">60 €</option>
                  <option value="80">80 €</option>
                  <option value="100">100 €</option>
                  <option value="150">150 €</option>
                </select>
                <select
                  type="select"
                  onChange={(e) => 
                    dispatching('COLOR', e.target.value)
                  }
                >
                  <option>Blue</option>
                  <option>Red</option>
                  <option>Yellow</option>
                  <option>Orange</option>
                  <option>Green</option>
                  <option>Black</option>
                </select>
              </form>
            </div>
          </section>
    );
  }
export default FilterBar;
