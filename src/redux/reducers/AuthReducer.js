import { AUTH_LOGIN_FAIL, AUTH_LOGIN_STARTED, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    jwt: null,
    isLoggingIn: false,
    loginErrorMessage: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AUTH_LOGIN_STARTED:
            return {...state, isLoggingIn: true}
        case AUTH_LOGIN_SUCCESS:
            return {...state, jwt: action.payload, isLoggingIn: false}
        case AUTH_LOGIN_FAIL:
            return {...state, isLoggingIn: false, loginErrorMessage: action.payload}
        case AUTH_LOGOUT:
            return {...state, jwt: null}
        default:
            return state;
    }
};

