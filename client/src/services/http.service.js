import axios from 'axios';
import * as storage from '../services/storage.service';
const { REACT_APP_API_URL: baseUrl } = process.env;

const getOptions = () => {
    return  {
        headers: {
            ['x-access-token']: storage.getToken(),
        }
    }
}

export const get = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + url, getOptions())
        .then(resolve)
        .catch(reject)
    })
}

export const post = (url, body) => {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl + url, body, getOptions())
        .then(resolve)
        .catch(reject)
    })
}

export const remove = (url) => {
    return new Promise((resolve, reject) => {
        axios.delete(baseUrl + url, getOptions())
        .then(resolve)
        .catch(reject)
    })
}

export const patch = (url, body) => {
    return new Promise((resolve, reject) => {
        axios.patch(baseUrl + url, body, getOptions())
        .then(resolve)
        .catch(reject)
    })
}
