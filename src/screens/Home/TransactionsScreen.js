import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView, View, FlatList } from 'react-native';
import Transactions from '../../components/Transactions';
import { fetchTransactions } from '../../redux/actions/TransactionsAction';
import SearchInput, { createFilter } from 'react-native-search-filter';
import ReactNativeNumberFormat from '../../components/ReactNativeNumberFormat';

const KEYS_TO_FILTERS = ['merchant_name', 'name']

const TransactionsScreen = (props) => {
    const { account, accountId, transactions } = props.route.params;
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
                <SearchInput    
                    placeholderTextColor={theme.colors.text}
                    onChangeText={(term) => { setSearchTerm(term) }} 
                    style={{ padding: 10, borderWidth: 4, marginHorizontal: 10, borderRadius: 10, borderColor: theme.colors.surface, color: theme.colors.text }}
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
                                <Transactions account={ account } transactions={ item } height={ (height - 6) / 7 } props={ props } />
                            )
                        }}
                    />}
                </View>

            </View>
        </SafeAreaView>
    )
}

export default TransactionsScreen
