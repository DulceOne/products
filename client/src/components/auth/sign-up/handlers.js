import * as http from '../../../services/http.service';
import appMessage from '../../shared/message';

export default (form, history) => {
  http.post('/user/signup', form)
    .then(() => history.push('/sign-in'))
    .catch((err) => appMessage(err.response.data.error, 'warn'));
};
