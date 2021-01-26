import axios from 'axios';
import configureStore from '../redux/store'

const { store } = configureStore()

const localURL = 'http://192.168.1.189:45455'
//const localURL = 'http://192.168.0.22:45455'
const joshHouse = 'http://192.168.50.53:45455'
const herokuURL = 'https://kala-app-api.herokuapp.com/'

let instance = axios.create({
    baseURL: localURL
    //baseURL: joshHouse,
    //baseURL: herokuURL,
});

instance.interceptors.request.use((config) => {
    let token = store.getState().auth.jwt
    config.headers.Authorization = 'Bearer ' + token

    return config
})

export default instance;