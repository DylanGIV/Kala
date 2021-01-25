import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_STARTED, AUTH_LOGIN_FAIL, AUTH_LOGOUT } from './types';
import { postLogin } from '../../api/';


export const authLoginSuccess = (token) => {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: token
    }
}
export const authLogout = () => {
    return {
        type: AUTH_LOGOUT
    }
}

export const loginWithEmailAndPassword = (email, password) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_STARTED })

        postLogin(email, password)
        
        .then(res => {
            dispatch(authLoginSuccess(res.token))
        })
        .catch(err => {
            dispatch({ type: AUTH_LOGIN_FAIL, payload: err })
        })
    }
}