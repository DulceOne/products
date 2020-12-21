import  * as http from '../../services/http.service';
import { appMessage } from '../../components/shared/message';

export const PRODUCTS_FETCH = 'PRODUCT[PRODUCTS_FETCH]';
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCT[PRODUCTS_FETCH_SUCCESS]';
export const PRODUCTS_FETCH_FAILURE = 'PRODUCT[PRODUCTS_FETCH_FAILURE]';

export const PRODUCT_ADD = 'PRODUCT[PRODUCT_ADD]';
export const PRODUCT_ADD_SUCCESS = 'PRODUCT[PRODUCT_ADD_SUCCESS]';
export const PRODUCT_ADD_FAILURE = 'PRODUCT[PRODUCT_ADD_FAILURE]';

export const PRODUCT_DELETE = 'PRODUCT[PRODUCT_DELETE]';
export const PRODUCT_DELETE_FAILURE = 'PRODUCT[PRODUCT_DELETE_FAILURE]';
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT[PRODUCT_DELETE_SUCCESS]';

export const productFetch = () => {
    return dispatch => {
        dispatch(productFetchStarted());
        http.get('/product')
        .then(result => dispatch(productFetchSuccess(result.data)))
        .catch(error => {
            const { message } = error;
            appMessage(message, 'warn');
            dispatch(productFetchFailure(message));
        });
    }
};

const productFetchStarted = () => ({
    type: PRODUCTS_FETCH,
});

const productFetchFailure = (error) => ({
    type: PRODUCTS_FETCH_FAILURE,
    payload: error,
});

const productFetchSuccess = (products) => ({
    type: PRODUCTS_FETCH_SUCCESS,
    payload: products,
});


export const productAdd = (product) => {
    return dispatch => {
        dispatch(productAddStarted());
        http.post('/product', product)
        .then(result => {
            const { message } = result.data;
            appMessage(message, 'success');
            dispatch(productAddSuccess())
        })
        .catch(error => {
            const { message } = error;
            appMessage(message, 'warn');
            dispatch(productAddFailure(message));
        })
    }
}

const productAddStarted = () => ({
    type: PRODUCT_ADD,
});

const productAddFailure = (error) => ({
    type: PRODUCT_ADD_FAILURE,
    payload: error,
});

const productAddSuccess = () => ({
    type: PRODUCT_ADD_SUCCESS
});


export const productDelete = (id) => {
    return dispatch => {
        dispatch(productDeleteStarted());
        http.remove(`/product/${id}`)
        .then(result => {
            const { message } = result.data;
            appMessage(message, 'success');
            dispatch(productDeletSuccess());
            dispatch(productFetch())
        })
        .catch(error => {
            const { message } = error;
            appMessage(message, 'warn');
            dispatch(productDeletFailure(message));
        })
    }
}

const productDeleteStarted = () => ({
    type: PRODUCT_DELETE,
});

const productDeletFailure = (error) => ({
    type: PRODUCT_DELETE_FAILURE,
    payload: error,
});

const productDeletSuccess = () => ({
    type: PRODUCT_DELETE_SUCCESS
});