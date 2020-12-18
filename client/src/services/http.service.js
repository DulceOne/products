import axios from 'axios';

const baseUrl = 'http://localhost:9000/api/v1';

export const get = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + url)
        .then(resolve)
        .catch(reject)
    })
}

export const post = (url, body) => {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl + url, body)
        .then(resolve)
        .catch(reject)
    })
}