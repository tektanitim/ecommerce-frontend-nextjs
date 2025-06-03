import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:9000/store',
    headers: {
        "x-publishable-api-key": "pk_69369b9e67607147a15702ac5bc00549c692e508b6719c9e8eddf70ee2576abe"
    }
});

export default API;