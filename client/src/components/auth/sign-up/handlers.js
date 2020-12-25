import * as http from '../../../services/http.service';
import appMessage from '../../shared/message';
import history from '../../../utils/history';

export default (form) => {
  http.post('/user/signup', form)
    .then(history.push('/sign-in'))
    .catch((err) => appMessage(err.response.data.error, 'warn'));
};
