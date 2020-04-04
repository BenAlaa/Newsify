import axios from "axios";
import { Promise } from "q";
import {toast} from 'react-toastify';
import {getJwt} from './auth.service';
import { tokenKey} from '../config.json';


axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
    if(!expectedError){
        toast.error("An unexpected error occurred.");
    } 

    return Promise.reject(error);
});

export function setJwt(jwt, tokenKey) {
    axios.defaults.headers.common[tokenKey] = jwt;
}
axios.defaults.headers.common[tokenKey] = getJwt();
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
}