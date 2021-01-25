// # PLUGINS IMPORTS
import React, { useEffect, useState } from "react"
import { View, StyleSheet, ActivityIndicator, Text } from "react-native"
import PlaidLink from "@burstware/expo-plaid-link"

// # COMPONENTS IMPORTS

// # EXTRA IMPORTS
import plaidConfig from "../../config/PlaidConfig"
import plaid from "plaid"

////////////////////////////////////////////////////////////////////////////////

export default function LinkScreen() {
  const [linkToken, setLinkToken] = useState(null)
  const [accessToken, setAccessToken] = useState(null)

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

      const token = response.link_token
      setLinkToken(token)
    }
    getData()
  }, [])

  const exchangeToken = async (publicToken) => {
      const response = await plaidClient.exchangePublicToken(publicToken)
      const token = response.access_token
      setAccessToken(token)
      console.log(token)
      console.log(response.access_token)
  }

  if (linkToken) {
    return (
      <PlaidLink
        linkToken={linkToken}
        onEvent={(event) => console.log(event, "event")}
        onExit={(exit) => console.log(exit, "exit")}
        onSuccess={(success) => exchangeToken(success.publicToken)}
      />
    )
  } else {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
