import * as http from '../../services/http.service';
import * as storage from '../../services/storage.service';
import appMessage from '../../components/shared/message';

export const SIGN_IN = 'USER[SIGN_IN]';
export const SIGN_IN_SUCCESS = 'USER[SIGN_IN_SUCCESS]';
export const SIGN_IN_FAILURE = 'USER[SIGN_IN_FAILURE ]';
export const SIGN_UP = 'USER[SIGN_UP]';
export const SIGN_OUT = 'USER[SIGN_OUT]';

const signInStarted = () => ({
  type: SIGN_IN,
});

const signInSuccess = (token) => ({
  type: SIGN_IN_SUCCESS,
  payload: token,
});

const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const signIn = ({ username, password }) => (dispatch) => {
  dispatch(signInStarted());
  http
    .post('/user/signin', {
      username,
      password,
      completed: false,
    })
    .then((result) => {
      const { token } = result.data;
      storage.setToken(token);
      dispatch(signInSuccess(token));
    })
    .catch((error) => {
      const { message } = error;
      appMessage(message, 'warn');
      dispatch(signInFailure(message));
    });
};

export const signOut = () => {
  storage.setToken('');
  return { type: SIGN_OUT };
};
