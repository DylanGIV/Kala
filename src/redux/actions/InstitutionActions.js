import { INSTITUTIONS_FETCH_SUCCESS, INSTITUTIONS_FETCH_STARTED, INSTITUTIONS_FETCH_FAIL } from './types';
import { getInstitution, getAccountName, getAccessTokens } from '../../api';


export const institutionsFetchSuccess = (institutions) => {
    return {
        type: INSTITUTIONS_FETCH_SUCCESS,
        payload: institutions
    }
}

export const fetchInstitutions = () => {
    return async (dispatch) => {
        dispatch({ type: INSTITUTIONS_FETCH_STARTED })
        
        let accessTokens
        let institutions = []
        try
        {
            accessTokens = await getAccessTokens()
        } catch (err) {
            console.log(err)
            return
        }

        for (let i = 0; i < accessTokens.length; i++)
        {
            let res
            try 
            {
                res = await getInstitution(accessTokens[i].plaidAccessToken)
            } catch (err)
            {
                console.log(err)
                return
            }

            try
            {
                let res2 = await getAccountName(res.item.institution_id)
                institutions.push({data: res.accounts, accessToken: accessTokens[i].plaidAccessToken, title: res2.institution.name})
            } catch (err2)
            {
                console.log(err2)
                return
            }
        }
        dispatch(institutionsFetchSuccess(institutions))
    }
}