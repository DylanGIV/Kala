import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import PlaidLink from "@burstware/expo-plaid-link";
import { useSelector } from 'react-redux';
import plaidConfig from "../../config/PlaidConfig";
import plaid from "plaid";
import axios from '../../api/axiosConfig';

export default function LinkScreen(props) {
  const [linkToken, setLinkToken] = useState('')
  const [enterPlaid, setEnterPlaid] = useState(false)

  const plaidClient = new plaid.Client({
    clientID: plaidConfig.PLAID_CLIENT_ID,
    secret: plaidConfig.PLAID_SECRET,
    env: plaid.environments.development,
  })

  useEffect(() => {
    const getData = async () => {
      const response = await plaidClient.createLinkToken({
        user: {
          client_user_id: "test",
        },
        client_name: "Kala",
        products: ["auth", "transactions"],
        country_codes: ["US"],
        language: "en",
      })
      setLinkToken(response.link_token)
      
    }
    getData()
  }, [])

  const postToken = async (accessToken) => {
    return new Promise((resolve, reject) => {
        axios.post('BankAccount', {
            plaidAccessToken: accessToken
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }
  const exchangeToken = async (publicToken) => {
      const response = await plaidClient.exchangePublicToken(publicToken)
      await postToken(response.access_token)
      props.navigation.goBack()
  }

  if (linkToken !== '' && !enterPlaid) {
    return (
      <PlaidLink
        linkToken={linkToken}
        onExit={() => props.navigation.goBack()}
        onSuccess={(success) => exchangeToken(success.publicToken)}
      />
    )
  } else if (linkToken !== '' && enterPlaid) {
    return (
      <View style={{ flex: 0 }}>
        
            <View style={{ flex: 0 }}>
                <PlaidLink
                    linkToken={''}
                />  
            </View>
            {setEnterPlaid(false)}
            
      </View>
    )
  } else {
    (!enterPlaid ? setEnterPlaid(Platform.OS === 'ios' ? false : true) : null)
    return null
  }
}
