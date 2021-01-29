import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTransactions } from '../../redux/actions/TransactionsAction';
import Transactions from '../../components/Transactions';

const AccountScreen = (props) => {
    const [height, setHeight] = useState(null)
    const dispatch = useDispatch()
    const { account, accountId, accessToken } = props.route.params;

    const fetchAccountTransactions = (accountId, accessToken) => {
        dispatch(fetchTransactions(accountId, accessToken))
    }
    useEffect(() => {
        fetchAccountTransactions(accountId, accessToken)
    }, [])
    
    const transactions = useSelector(state => state.transactions.transactions)
    const isLoading = useSelector(state => state.transactions.isFetchingTransactions);
    const theme = useSelector(state => state.theme.theme)


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: theme.colors.text, fontSize: 28 }}>
                    { account.name }
                </Text>
                <Text style={{ color: theme.colors.text, padding: 8 }}>
                    { account.official_name }
                </Text>
            </View>

            <View style={{ flex: 5, backgroundColor: theme.colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, margin: 8 }}>

                <View style={{ flex: 0.1, flexDirection: 'row', backgroundColor: theme.colors.primary, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Text style={{ color: theme.colors.text, fontSize: 20, padding: 10 }}>
                            Recent Transactions
                        </Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: theme.colors.surface, borderTopRightRadius: 19, justifyContent: 'center' }}>
                        <Button disabled={isLoading} onPress={() => 
                            props.navigation.navigate('Transactions', { account: account, accountId: accountId, transactions: transactions })
                        }>
                            All
                        </Button>
                    </View>
                </View>

                <View style={{ flex: 1, padding: 3, justifyContent: 'center' }} onLayout={(event) => {
                    setHeight(event.nativeEvent.layout.height);
                }}>
                    {(isLoading || !transactions) ? <ActivityIndicator /> :
                    <FlatList
                        keyExtractor={item => item.transaction_id}
                        showsVerticalScrollIndicator={false}
                        data={transactions.slice(0,5)}
                        refreshing={(isLoading) ? true : false}
                        onRefresh={() => fetchAccountTransactions(accountId, accessToken)}
                        renderItem={({ item }) => {
                            return (
                                <Transactions account={ account } transactions={ item } height={ (height - 6) / 5 } props={ props } />
                            )
                        }}
                    />}
                </View>

            </View>
            
            <View style={{ flex: 1 }}/>

        </SafeAreaView>
    )
}

export default AccountScreen
 