import {
    PRODUCTS_FETCH,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAILURE,
  } from '../actions/product';
const initialState = {
    products: [],
    pagination: {},
    loading: false,
    error: ''
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_FETCH:
            return {
                ...state,
                loading: true,
            }
        case PRODUCTS_FETCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case PRODUCTS_FETCH_SUCCESS:
            const { products, collections, page, pages } = action.payload;
            return {
                ...state,
                loading: false,
                products,
                pagination: {
                    collections,
                    page,
                    pages
                },
                error: '',
            }
        default:
            return state;
    }
}


export default productReducer;

