import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fb-clone-heroku.herokuapp.com/'
})

export default instance;