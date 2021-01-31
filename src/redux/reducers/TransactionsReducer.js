import { TRANSACTIONS_FETCH_FAIL, TRANSACTIONS_FETCH_STARTED, TRANSACTIONS_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    transactions: null,
    isFetchingTransactions: false,
    fetchErrorMessage: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case TRANSACTIONS_FETCH_STARTED:
            return {...state, isFetchingTransactions: true}
        case TRANSACTIONS_FETCH_SUCCESS:
            return {...state, transactions: action.payload, isFetchingTransactions: false}
        case TRANSACTIONS_FETCH_FAIL:
            return {...state, isFetchingTransactions: false, fetchErrorMessage: action.payload}
        default:
            return state;
    }
};