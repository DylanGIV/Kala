import React, { useState } from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import axios from '../../api/axiosConfig';
import { TextInput, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('')
    const theme = useSelector(state => state.theme.theme)
    const [sent, setSent] = useState(false)
    
    const reg = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    const sendEmail = () => {
        if (reg.test(email) === false) {
            alert('Not a valid Email Address')
            return
        }
        setSent(true);
        return new Promise((resolve, reject) => {
            axios.post('api/Authenticate/email', {
                email: email
            })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {(!sent) ? 
                (<TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>
                                Please enter the email you use to log in. We will send instructions to recover your password there.
                            </Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <TextInput style={{ marginHorizontal: 8, marginBottom: 14 }}
                                label='Email'
                                value={email}
                                autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={email => setEmail(email)}
                                onSubmitEditing={sendEmail}
                            />
                            <TouchableOpacity style={{ backgroundColor: theme.colors.primary, flex: 0.1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginHorizontal: 12 }} onPress={sendEmail}>
                                    <Text style={{ fontSize: 16 }}>
                                        Send Email
                                    </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>)

                : 
                
                (<View style={{ flex: 1 }}>
                    <View style={{ flex: 1}}>
                        <View style={{ flex: 1 }}/>
                        <View style={{ flex: 3 }}>
                            <Text style={{ fontSize: 18, textAlign: 'center' }}>
                                If the provided email matches with an account, an email will be sent with instructions to recover your password.
                            </Text>
                            <View style={{ flex: 0.1 }}/>
                            <TouchableOpacity style={{ backgroundColor: theme.colors.primary, flex: 0.1, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginHorizontal: 12 }} onPress={() => {setSent(false); setEmail('')}}>
                                <Text style={{ fontSize: 16 }}>
                                    Try again?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>)
            }
        </SafeAreaView>
    )
}

export default ForgotPasswordScreen;
