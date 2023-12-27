import { BASE_URL } from '../utils/constants';

const LOGIN_ENDPOINT = 'authaccount/login';
const REGISTER_ENDPOINT = 'authaccount/registration';

export const login = async (raw) => {
    var myHeaders = {
        'Content-Type': 'application/json',
    };
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
    };

    return fetch(BASE_URL + LOGIN_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            console.log(error, 'errorerror-=-=')
            return error
        });
}

export const register = async (raw) => {
    var myHeaders = {
        'Content-Type': 'application/json',
    };
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    return fetch(BASE_URL + REGISTER_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            console.log(error, 'errorerror-=-=')
            return error
        });
}