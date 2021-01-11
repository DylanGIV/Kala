import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/global';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomeStack from './src/screens/Home/HomeStack';
import AuthStack from './src/screens/Auth/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const AppStack = createStackNavigator();

export default function App() {
  let signedIn = false;
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStack.Navigator headerMode="none" >
            {signedIn == true ? (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


