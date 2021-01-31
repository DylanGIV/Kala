import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AccountScreen from './AccountScreen';
import TransactionsScreen from './TransactionsScreen';
import TransactionInfoScreen from './TransactionInfoScreen';
import LinkScreen from './LinkScreen';
import React from 'react';
import { IconButton } from 'react-native-paper';
import ProfileScreen from './ProfileScreen';
import { useSelector } from 'react-redux';


const Stack = createStackNavigator();

function HomeStack(props) {
    const theme = useSelector(state => state.theme.theme)

    return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ headerLeft: () => 
                    (<IconButton onPress={() => props.navigation.goBack()} 
                    icon='chevron-down' color={theme.colors.text} size={30} />),
                                                                                
                    gestureDirection: 'vertical',
                                                                                
                    cardStyleInterpolator: ({ current, layouts }) => {
                        return {
                            cardStyle: {
                                transform: [                                              
                                    {
                                        translateY: current.progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [layouts.screen.height, 0],
                                    }),
                                    },
                                ],
                                },
                            };
                            },
                    headerTitle: '', 
                    headerStyle: { backgroundColor: theme.colors.background, elevation: 0, borderBottomWidth: 0 }, 
                    headerTintColor: theme.colors.text }} />

            <Stack.Screen name="Home" component={HomeScreen} options={{ headerRight: () => (<IconButton onPress={() => props.navigation.navigate('Profile')} icon='account-circle' color={theme.colors.text} size={30} />), headerTitle: '', headerStyle: { backgroundColor: theme.colors.background, elevation: 0, borderBottomWidth: 0 }, headerTintColor: theme.colors.text  }} />
            <Stack.Screen name="Account" component={AccountScreen} options={{ headerTitle: '', headerStyle: { backgroundColor: theme.colors.background, elevation: 0, borderBottomWidth: 0 }, headerTintColor: theme.colors.text }} />
            <Stack.Screen name="Transactions" component={TransactionsScreen} options={{ headerTitle: '', headerStyle: { backgroundColor: theme.colors.background, elevation: 0, borderBottomWidth: 0 }, headerTintColor: theme.colors.text}} />
            <Stack.Screen name="TransactionInfo" component={TransactionInfoScreen} options={{ headerTitle: '', headerStyle: { backgroundColor: theme.colors.background, elevation: 0, borderBottomWidth: 0 }, headerTintColor: theme.colors.text}} />
            <Stack.Screen name="Link" component={LinkScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default HomeStack;
