import { BASE_URL } from '../utils/constants';

const USERS_ENDPOINT = 'users?';
const USERSBYID_ENDPOINT = 'users/';
const ADDUSER_ENDPOINT = 'users';

const IMAGES_ENDPOINT = 'https://jsonplaceholder.typicode.com/photos/1';
const GET_IMAGES_ENDPOINT = 'https://api.slingacademy.com/v1/sample-data/photos?';


import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllUsers = async (val) => {
    let token = await AsyncStorage.getItem('@TOKEN');

    var myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    };
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    let offset = `page=${val}`;
    return fetch(BASE_URL + USERS_ENDPOINT + offset, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            // console.log(error, 'errorerror-=-=')
            return error
        });
}

export const getUserById = async (id) => {
    let token = await AsyncStorage.getItem('@TOKEN');
    var myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    };
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + USERSBYID_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            // console.log(error, 'errorerror-=-=')
            return error
        });
}
export const fetchImages = async (currentPage, itemsPerPage) => {
    let handleOffset = currentPage * 9
    let offset = `offset=${handleOffset}&limit=${itemsPerPage}`
    return fetch(GET_IMAGES_ENDPOINT + offset)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            // console.log(error, 'errorerror-=-=')
            return error
        });
}

export const adduser = async (raw) => {
    let token = await AsyncStorage.getItem('@TOKEN');

    var myHeaders = {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token
    };
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    return fetch(BASE_URL + ADDUSER_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            // console.log(error, 'errorerror-=-=')
            return error
        });
}
