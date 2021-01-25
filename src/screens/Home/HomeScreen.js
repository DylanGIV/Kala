import React from 'react';
import { View, SectionList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, ActivityIndicator, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInstitutions } from '../../redux/actions/InstitutionActions';
import { useEffect } from 'react';
import BankAccount from '../../components/BankAccount';

const HomeScreen = (props) => {
    const dispatch = useDispatch()

    const fetchBankAccounts = () => {
        dispatch(fetchInstitutions())
    }
    const addAccount = () => {
        props.navigation.navigate('Link')
    }

    useEffect( () => {
        fetchBankAccounts()
        
    }, [])

    const institutions = useSelector(state => state.institutions.institutions)
    const isLoading = useSelector(state => state.institutions.isFetchingInstitutions)
    const theme = useSelector(state => state.theme.theme)
    
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background}}>
            <View style={{ flex: 1 }}>

                <View style={{ flex: 0.2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 32 }}>
                        My Accounts
                    </Text>
                    <IconButton 
                        icon='plus-circle-outline'
                        size={30}
                        onPress={addAccount}
                    />
                </View>
                <View style={{ flex: 0.1 }}/>

                <View style={{ flex: 2, marginHorizontal: 10 }}>
                    {(isLoading || !institutions) ? <ActivityIndicator size='large' /> :
                        <SectionList
                            keyExtractor={(item, index) => item + index}
                            sections={institutions}
                            stickySectionHeadersEnabled={true}
                            showsVerticalScrollIndicator={false}
                            refreshing={isLoading}
                            onRefresh={() => fetchBankAccounts()}
                            renderItem={({ item, section }) => {
                                return (
                                    <BankAccount account={ item } props={ props } accessToken={ section.accessToken } />
                                    )
                            }}
                            renderSectionHeader={({ section }) => (
                                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start' }}>
                                    <View style={{ flex: 1, backgroundColor: theme.colors.primary, height: 30, justifyContent: 'center', padding: 10, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20 }}>
                                        <Text style={{fontSize: 18, marginHorizontal: 10}}>
                                            {section.title}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    }
                </View>
                <View style={{ flex: 0.1 }}/>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen