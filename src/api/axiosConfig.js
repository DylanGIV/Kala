import axios from 'axios';
import configureStore from '../redux/store'

const { store } = configureStore()

const herokuURL = 'https://kala-app-api.herokuapp.com/'

let instance = axios.create({
    baseURL: herokuURL,
});

instance.interceptors.request.use((config) => {
    let token = store.getState().auth.jwt
    config.headers.Authorization = 'Bearer ' + token

    return config
})

export default instance;