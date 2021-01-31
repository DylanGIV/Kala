import { USER_FETCH } from './types';
import { getUserInfo } from '../../api/';

export const getUser = () => {
    return (dispatch) => {
        
        getUserInfo()
        .then(res => dispatch({ type: USER_FETCH, payload: res }))
        .catch((err) => console.log(err))
    }
}