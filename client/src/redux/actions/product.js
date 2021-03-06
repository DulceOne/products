import * as http from '../../services/http.service';
import appMessage from '../../components/shared/message';

export const PRODUCTS_FETCH = 'PRODUCT[PRODUCTS_FETCH]';
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCT[PRODUCTS_FETCH_SUCCESS]';
export const PRODUCTS_FETCH_FAILURE = 'PRODUCT[PRODUCTS_FETCH_FAILURE]';

export const PRODUCT_ADD = 'PRODUCT[PRODUCT_ADD]';
export const PRODUCT_ADD_SUCCESS = 'PRODUCT[PRODUCT_ADD_SUCCESS]';
export const PRODUCT_ADD_FAILURE = 'PRODUCT[PRODUCT_ADD_FAILURE]';

export const PRODUCT_DELETE = 'PRODUCT[PRODUCT_DELETE]';
export const PRODUCT_DELETE_FAILURE = 'PRODUCT[PRODUCT_DELETE_FAILURE]';
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT[PRODUCT_DELETE_SUCCESS]';

export const PRODUCT_GET_BY_ID = 'PRODUCT[PRODUCT_GET_BY_ID]';
export const PRODUCT_GET_BY_ID_FAILURE = 'PRODUCT[PRODUCT_GET_BY_ID_FAILURE]';
export const PRODUCT_GET_BY_ID_SUCCESS = 'PRODUCT[PRODUCT_GET_BY_ID_SUCCESS]';

export const PRODUCT_EDIT = 'PRODUCT[PRODUCT_EDIT]';
export const PRODUCT_EDIT_FAILURE = 'PRODUCT[PRODUCT_EDIT_FAILURE]';
export const PRODUCT_EDIT_SUCCESS = 'PRODUCT[PRODUCT_EDIT_SUCCESS]';

// PRODUCT FETCH BLOCK

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

export const productFetch = (page) => (dispatch) => {
  dispatch(productFetchStarted());
  http.get(`/product?page=${page}`)
    .then((result) => dispatch(productFetchSuccess(result.data)))
    .catch((error) => {
      const { message } = error;
      appMessage(message, 'warn');
      dispatch(productFetchFailure(message));
    });
};

// PRODUCT ADD BLOCK

const productAddStarted = () => ({
  type: PRODUCT_ADD,
});

const productAddFailure = (error) => ({
  type: PRODUCT_ADD_FAILURE,
  payload: error,
});

const productAddSuccess = () => ({
  type: PRODUCT_ADD_SUCCESS,
});

export const productAdd = (product) => (dispatch) => {
  dispatch(productAddStarted());
  http.post('/product', product)
    .then((result) => {
      const { message } = result.data;
      appMessage(message, 'success');
      dispatch(productAddSuccess());
    })
    .catch((error) => {
      const { message } = error;
      appMessage(message, 'warn');
      dispatch(productAddFailure(message));
    });
};

// PRODUCT DELETE BLOCK

const productDeleteStarted = () => ({
  type: PRODUCT_DELETE,
});

const productDeletFailure = (error) => ({
  type: PRODUCT_DELETE_FAILURE,
  payload: error,
});

const productDeletSuccess = () => ({
  type: PRODUCT_DELETE_SUCCESS,
});

export const productDelete = (id) => (dispatch) => {
  dispatch(productDeleteStarted());
  http.remove(`/product/${id}`)
    .then((result) => {
      const { message } = result.data;
      appMessage(message, 'success');
      dispatch(productDeletSuccess());
      dispatch(productFetch());
    })
    .catch((error) => {
      const { message } = error;
      appMessage(message, 'warn');
      dispatch(productDeletFailure(message));
    });
};

// PRODUCT GET BLOCK

const productGetByIdStarted = () => ({
  type: PRODUCT_GET_BY_ID,
});

const productGetByIdSuccess = (product) => ({
  type: PRODUCT_GET_BY_ID_SUCCESS,
  payload: product,
});

const productGetByIdFailure = (error) => ({
  type: PRODUCT_GET_BY_ID_FAILURE,
  payload: error,
});

export const productGetById = (id) => (dispatch) => {
  dispatch(productGetByIdStarted());
  http.get(`/product/${id}`)
    .then((result) => {
      const { product } = result.data;
      dispatch(productGetByIdSuccess(product));
    })
    .catch((error) => {
      const { message } = error;
      appMessage(message, 'warn');
      dispatch(productGetByIdFailure(message));
    });
};

// PRODUCT EDIT BLOCK

const productEditStart = (product) => ({
  type: PRODUCT_EDIT,
  payload: product,
});

const productEditFailure = (error) => ({
  type: PRODUCT_EDIT_FAILURE,
  payload: error,
});

const productEditSuccess = (product) => ({
  type: PRODUCT_EDIT_SUCCESS,
  payload: product,
});

export const productEdit = (product, id) => (dispatch) => {
  dispatch(productEditStart(product));
  http.patch(`/product/${id}`, product)
    .then((result) => {
      const { message } = result.data;
      appMessage(message, 'success');
      dispatch(productEditSuccess());
    })
    .catch((error) => {
      const { message } = error;
      appMessage(message, 'warn');
      dispatch(productEditFailure(message));
    });
};
