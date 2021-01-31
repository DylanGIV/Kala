import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import HomeStack from './screens/Home/HomeStack';
import AuthStack from './screens/Auth/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

const AppStack = createStackNavigator();

export default function AppContent() {
    const jwt = useSelector(state => state.auth.jwt)
    const theme = useSelector(state => state.theme.theme)

    
    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider>
                <StatusBar barStyle="light-content"/>
                <NavigationContainer>
                    <AppStack.Navigator headerMode="none" >
                    {jwt ? (
                        <AppStack.Screen name="HomeStack" component={HomeStack} />
                        ) : (
                        <AppStack.Screen name="AuthStack" component={AuthStack} />
                    )}
                    </AppStack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </PaperProvider>
        );
}
