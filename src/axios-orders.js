import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburger-aa28b-default-rtdb.firebaseio.com/'
});

export default instance;