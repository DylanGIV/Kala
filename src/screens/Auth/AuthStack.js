import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import React from 'react';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

function AuthStack() {
    const theme = useSelector(state => state.theme.theme)

    return (
        <Stack.Navigator initialRouteName="Login" >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTitle: '', headerStyle: { backgroundColor: theme.colors.background, elevation: 0, borderBottomWidth: 0 }, headerTintColor: theme.colors.text}} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerTitle: '', headerStyle: { backgroundColor: theme.colors.background, elevation: 0, borderBottomWidth: 0 }, headerTintColor: theme.colors.text}} />
        </Stack.Navigator>
    );
}

export default AuthStack;
