import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const BankAccount = ({ account, props, accessToken }) => {
  const theme = useSelector(state => state.theme.theme)

  return (
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Account', {account: account, accountId: account.account_id, accessToken: accessToken })}>
      <View style={{ flex: 1, flexDirection: 'column', height: 120, marginVertical: 10, backgroundColor: theme.colors.surface, borderRadius: 20, padding: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.colors.text, fontSize: 18 }}>
            { account.name }
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 18, padding: 10 }}>
            { account.official_name }
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 18, color: theme.colors.text }}>
            Balance: ${ account.balances.current }
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default BankAccount