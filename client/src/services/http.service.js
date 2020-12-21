import axios from 'axios';
import * as storage from '../services/storage.service';
const baseUrl = 'http://localhost:9000/api/v1';
const getOptions = () => {
    return  {
        headers: {
            ['x-access-token']: storage.getToken(),
            ['Content-Type']:'multipart/form-data'
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
