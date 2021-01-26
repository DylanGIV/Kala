import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { AUTH_LOGOUT } from '../../redux/actions/types';
import { lightTheme, darkTheme } from '../../global/';
import { themeSwitch } from '../../redux/actions/ThemeActions';

const ProfileScreen = () => {
    const dispatch = useDispatch()
    
    const logout = () => {
        dispatch({ type: AUTH_LOGOUT })
    }
    const switchTheme = (payload) => {
        dispatch(themeSwitch(payload))
        
    }
    let nextTheme
    const theme = useSelector(state => state.theme.theme)
    const user = useSelector(state => state.user.user)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View style={{ flex: 1 }}>
                <List.Section>
                    <List.Subheader>Profile</List.Subheader>
                    <List.Item title={user.firstName} left={() => <List.Icon icon='account-circle' />} />
                    <List.Item title={user.userName} left={() => <List.Icon icon='email' />} />
                    <List.Subheader>Settings</List.Subheader>

                    <List.Item title={(theme.dark) ? 'Light mode' : 'Dark mode'} onPress={() => {(!theme.dark) ? nextTheme = darkTheme : nextTheme = lightTheme; switchTheme(nextTheme) }} left={() => <List.Icon icon='lightbulb-on-outline'/>} />
                    <List.Item title='Log out' onPress={logout} left={() => <List.Icon icon='logout-variant'/>} />
                </List.Section>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen