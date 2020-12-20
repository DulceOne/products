import  * as http from '../../services/http.service';
import { appMessage } from '../../components/shared/message';

export const PRODUCTS_FETCH = 'PRODUCT[PRODUCTS_FETCH]';
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCT[PRODUCTS_FETCH_SUCCESS]';
export const PRODUCTS_FETCH_FAILURE = 'PRODUCT[PRODUCTS_FETCH_FAILURE]';

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