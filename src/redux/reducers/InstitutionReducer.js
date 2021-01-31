import { INSTITUTIONS_FETCH_FAIL, INSTITUTIONS_FETCH_STARTED, INSTITUTIONS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    institutions: [],
    isFetchingInstitutions: false,
    fetchErrorMessage: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case INSTITUTIONS_FETCH_STARTED:
            return {...state, isFetchingInstitutions: true}
        case INSTITUTIONS_FETCH_SUCCESS:
            return {...state, institutions: action.payload, isFetchingInstitutions: false}
        case INSTITUTIONS_FETCH_FAIL:
            return {...state, isFetchingInstitutions: false, fetchErrorMessage: action.payload}
        default:
            return state;
    }
};