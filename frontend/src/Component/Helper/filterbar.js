import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../backend/Actions/productActions";



 const FilterBar = () => {

  const dispatch = useDispatch();

  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(''); 

  useEffect(() => {


    if(size || color || price || category){
      console.log(price)
    dispatch({type: 'addFilter', payload:{size, color, price, category}})
    dispatch(listProducts(category, color, price, size))

    }
  }, [size, color, price, category])




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
              onClick={(e) =>  setCategory(e.target.innerText) }
            >
              <li>Shirt</li>
              <li>Pull</li>
              <li>T-shirt</li>
              <li>Sweat</li>
              <li>Pant</li>
              <li>Manteau</li>
            </ul>
  
            <div className="under-filters">
              <form className="under-filters-form">
                <select
                  type="select"
                  data-filter="size"
                  onChange={(e) =>
                    setSize(e.target.value)
                  }
                >
                  <option>S</option>
                  <option>M</option>
                  <option>XL</option>
                </select>
                <select
                  type="select"
                  data-filter="price"
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value={20}>20 €</option>
                  <option value={40}>40 €</option>
                  <option value={60}>60 €</option>
                  <option value={80}>80 €</option>
                  <option value={100}>100 €</option>
                  <option value={150}>150 €</option>
                </select>
                <select
                  type="select"
                  onChange={(e) => 
                    setColor(e.target.value)
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
