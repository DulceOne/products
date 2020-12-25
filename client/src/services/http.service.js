import axios from 'axios';
import * as storage from './storage.service';

const { REACT_APP_API_URL: baseUrl } = process.env;

const getOptions = () => ({
  headers: {
    'x-access-token': storage.getToken(),
  },
});

export const get = (url) => new Promise((resolve, reject) => {
  axios.get(baseUrl + url, getOptions())
    .then(resolve)
    .catch(reject);
});

export const post = (url, body) => new Promise((resolve, reject) => {
  axios.post(baseUrl + url, body, getOptions())
    .then(resolve)
    .catch(reject);
});

export const remove = (url) => new Promise((resolve, reject) => {
  axios.delete(baseUrl + url, getOptions())
    .then(resolve)
    .catch(reject);
});

export const patch = (url, body) => new Promise((resolve, reject) => {
  axios.patch(baseUrl + url, body, getOptions())
    .then(resolve)
    .catch(reject);
});
