import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';
import TransactionsScreen from './TransactionsScreen';
import React from 'react';

const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} />
        </Stack.Navigator>
    );
}

export default HomeStack;
