import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import http, {setJwt} from './http.service';
import { apiUrl, tokenKey} from '../config.json';

const apiEndpoint = apiUrl + "/auth";
setJwt(getJwt());

async function login(email, password) {
    const {data: response} = await http.post(apiEndpoint, {email, password});
    if (response.status !== 200) return {status: response.status, message: response.message};
    const {data: jwt} = response;
    if (!jwt) return {status: 400, message: "Faild to generate Token..."};
    localStorage.setItem(tokenKey, jwt);
    return {status: 200, message: "User Logged Successfully..."};
}

function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

function logout() {
    localStorage.removeItem(tokenKey);
}

function generateAuthToken(user) {
    const token = jwt.sign({ 
        id: user.id, 
        name: user.name, 
        email: user.email
    }, "jwtPrivateKey");
    return token;
}

function getCurrentUser() {
    try {
        const jwt =JSON.stringify(localStorage.getItem(tokenKey));
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

function getJwt() {
    return localStorage.getItem('x-auth-token');
}

export{
    login,
    loginWithJwt,
    logout,
    generateAuthToken,
    getCurrentUser,
    getJwt
}