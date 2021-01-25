import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView, View, FlatList } from 'react-native';
import Transactions from '../../components/Transactions';
import { fetchTransactions } from '../../redux/actions/TransactionsAction';
import SearchInput, { createFilter } from 'react-native-search-filter';
import ReactNativeNumberFormat from '../../components/ReactNativeNumberFormat';

const KEYS_TO_FILTERS = ['merchant_name', 'name']

const TransactionsScreen = ({ route }) => {
    const { account, accountId, transactions } = route.params;
    const [height, setHeight] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [amount, setAmount] = useState(0);
    const dispatch = useDispatch();

    const fetchAccountTransactions = (accountId) => {
        dispatch(fetchTransactions(accountId))
    }

    const isLoading = useSelector((state) => state.transactions.isFetchingTransactions);
    const theme = useSelector(state => state.theme.theme);

    const filteredTransactions = transactions.filter(createFilter(searchTerm, KEYS_TO_FILTERS))
    
    let runningTotal = 0
    useEffect(() => {
        filteredTransactions.forEach(transaction => runningTotal -= transaction.amount)
        setAmount(runningTotal)

    }, [filteredTransactions])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>

            <View style={{ flex: 1 }}>
                {/* <Text style={{ color: theme.colors.text, fontSize: 28 }}>
                    { account.name }
                </Text>
                <Text style={{ color: theme.colors.text, padding: 8 }}>
                    { account.official_name }
                </Text> */}
                <SearchInput    
                    onChangeText={(term) => { setSearchTerm(term) }} 
                    style={{ padding: 10, borderWidth: 1, marginHorizontal: 10 }}
                    placeholder="Search Transactions"
                
                />

            </View>

            <View style={{ flex: 12, backgroundColor: theme.colors.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, margin: 8 }}>

                <View style={{ flex: 0.1, flexDirection: 'row', backgroundColor: theme.colors.primary, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                        <Text style={{ color: theme.colors.text, fontSize: 18, padding: 10 }}>
                            Running Total:
                        </Text>
                        <Text style={{ fontSize: 18 }}>
                            <ReactNativeNumberFormat value={amount} allowNegative={true} />
                        </Text>
                    </View>
                </View>

                <View style={{ flex: 1.4, padding: 3, justifyContent: 'center' }} onLayout={(event) => {
                    setHeight(event.nativeEvent.layout.height);
                }}>
                    {(isLoading) ? <ActivityIndicator /> :
                    <FlatList
                        keyExtractor={item => item.transaction_id}
                        showsVerticalScrollIndicator={false}
                        data={filteredTransactions}
                        refreshing={(isLoading)}
                        initialNumToRender={7}
                        onRefresh={() => fetchAccountTransactions(accountId)}
                        renderItem={({ item }) => {
                            return (
                                <Transactions account={ account } transactions={ item } height={ (height - 6) / 7 } />
                            )
                        }}
                    />}
                </View>

            </View>
        </SafeAreaView>
    )
}

export default TransactionsScreen
