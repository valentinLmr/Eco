import { PRODUCT_LIST_FILTERING } from "../constants/productConstant";

export const productListFiltering = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_FILTERING, payload: filters
  });
}
