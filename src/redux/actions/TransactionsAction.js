import { TRANSACTIONS_FETCH_SUCCESS, TRANSACTIONS_FETCH_STARTED, TRANSACTIONS_FETCH_FAIL } from './types';
import { getTransactions } from '../../api/';


export const transactionsFetchSuccess = (transactions) => {
    return {
        type: TRANSACTIONS_FETCH_SUCCESS,
        payload: transactions
    }
}

export const fetchTransactions = (accountId, accessToken) => {
    return (dispatch) => {
        dispatch({ type: TRANSACTIONS_FETCH_STARTED })
        getTransactions(accountId, accessToken)
        
        .then(res => {
            dispatch(transactionsFetchSuccess(res.transactions))
        })
        .catch(err => {
            dispatch({ type: TRANSACTIONS_FETCH_FAIL, payload: err })
        })
    }
}