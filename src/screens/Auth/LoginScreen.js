import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';

const LoginScreen = (props) => (
    <SafeAreaView>
        <Button icon="" mode="contained" onPress={() => props.navigation.navigate('Register')}>
            To Register Screen
        </Button>
    </SafeAreaView>
);

export default LoginScreen;