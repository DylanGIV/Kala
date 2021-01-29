import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ReactNativeNumberFormat from '../../components/ReactNativeNumberFormat';

const TransactionInfo = (props) => {
    const { transactions } = props.route.params;
    const theme = useSelector(state => state.theme.theme);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1, borderBottomWidth: 1, borderTopWidth: 1, borderColor: theme.colors.surface, padding: 10, justifyContent: 'space-evenly' }}>
                <Text style={{ fontSize: 20}}>Transaction Name:</Text>
                <Text style={{ fontSize: 18}}> { transactions.name } </Text>
                {(transactions.merchant_name) ? <Text> ({transactions.merchant_name})</Text> : null}
            </View>
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: theme.colors.surface, padding: 10 }}>
                <Text style={{ fontSize: 18}}>
                    Amount:{'\n\n '}
                    <ReactNativeNumberFormat value={transactions.amount} allowNegative={true} />
                </Text>
            </View>
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: theme.colors.surface, padding: 10 }}>
                <Text style={{ fontSize: 18 }}>Category: {'\n'}</Text>
                <FlatList 
                    keyExtractor={(item) => item}
                    data={transactions.category}
                    renderItem={({item}) => {
                        return (
                            <Text style={{ fontSize: 18}}> {item} </Text>
                        )
                    }}
                />
            </View>
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: theme.colors.surface, padding: 10 }}>
                <Text style={{ fontSize: 18}}>Date:{'\n'}</Text>
                <Text style={{ fontSize: 18}}> {transactions.date}</Text>
            </View>
            <View style={{ flex: 1, borderBottomWidth: 1, borderColor: theme.colors.surface, padding: 10 }}>
                <Text style={{ fontSize: 18}}>Payment Channel:{'\n'}</Text>
                <Text style={{ fontSize: 18}}> {transactions.payment_channel}</Text>
            </View>
            <View style={{ flex: 1 }} />
        </SafeAreaView>
    )
 
}

export default TransactionInfo