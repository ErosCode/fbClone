import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://git.heroku.com/hidden-badlands-63784.git'
})

export default instance