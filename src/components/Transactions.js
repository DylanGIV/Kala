import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-paper';
import ReactNativeNumberFormat from '../components/ReactNativeNumberFormat';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const Transactions = ({ account, transactions, height, props }) => {
    let amount = transactions.amount;
    const theme = useSelector(state => state.theme.theme)

    if (account.type === 'credit')
    {
        amount = amount * -1
    }

    return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => props.navigation.navigate('TransactionInfo', { transactions })}>
                <View style={{ flex: 1, padding: 10, borderTopWidth: 2, borderColor: theme.colors.surface, height: height, borderRadius: 6, backgroundColor: theme.colors.background, flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'space-between' }}>
                        <Text style={{ color: theme.colors.text, fontSize: 16 }} numberOfLines={1}>
                            { transactions.name }
                        </Text>
                        <Text style={{ color: theme.colors.text, fontSize: 11 }} >
                            { transactions.date }
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', left: 8, marginVertical: -6 }}>
                        { (amount > 0) ? (<Text><Icon color='red' name='arrow-down-circle-sharp'/> </Text>) : (<Text><Icon color='green' name='arrow-up-circle-sharp'/> </Text>) }
                        <ReactNativeNumberFormat value={ amount }/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    )
}

export default Transactions;