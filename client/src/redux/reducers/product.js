import {
    PRODUCTS_FETCH,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAILURE,
    PRODUCT_GET_BY_ID,
    PRODUCT_GET_BY_ID_FAILURE,
    PRODUCT_GET_BY_ID_SUCCESS
  } from '../actions/product';
const initialState = {
    products: [],
    product: {},
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
        case PRODUCT_GET_BY_ID:
            return {
                ...state,
                loading: true,
            }

        case PRODUCT_GET_BY_ID_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.payload,
            }

        case PRODUCT_GET_BY_ID_SUCCESS:
            return {
                ...state,
                loading: true,
                product: action.payload,
            }
        default:
            return state;
    }
}


export default productReducer;

