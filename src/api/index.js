import axios from './axiosConfig';
import plaidConfig from "../config/PlaidConfig";
import plaid from "plaid";

const plaidClient = new plaid.Client({
    clientID: plaidConfig.PLAID_CLIENT_ID,
    secret: plaidConfig.PLAID_SECRET,
    env: plaid.environments.development,
})

export const postLogin = async (email, password) => {
    return new Promise((resolve, reject) => {
        axios.post('api/Authenticate/login', {
            email: email,
            password: password
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

export const getInstitution = async (accessToken) => {
    return new Promise((resolve, reject) => {
        plaidClient.getAuth(accessToken)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}

export const getAccountName = async (institutionId) => {
    return new Promise((resolve, reject) => {
        plaidClient.getInstitutionById(institutionId, ['US', 'GB', 'ES', 'NL', 'FR', 'IE', 'CA'])
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
}

export const getAccessTokens = async () => {
    return new Promise((resolve, reject) => {
        axios.get('BankAccount')
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

export const getUserInfo = async () => {
    return new Promise((resolve, reject) => {
        axios.get('User')
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
}

export const getTransactions = async (accountId, accessToken) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const date = new Date().getDate();
    const currentDate = year + '-' + ((month + 1) < 10 ? ('0' + (month + 1)) : (month + 1) ) + '-' + ((date < 10) ? ('0' + date) : date);
    const startDate = (year - 2) + '-' + ((month + 1) < 10 ? ('0' + (month + 1)) : (month + 1) ) + '-' + ((date < 10) ? ('0' + date) : date);

    return new Promise((resolve, reject) => {
        console.log(currentDate)
        plaidClient.getTransactions(accessToken, startDate, currentDate, { account_ids: [accountId], count: 500 })
        .then((res) => resolve(res))
        .catch((err) => console.log(err))
    })
}

