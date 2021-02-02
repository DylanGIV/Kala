import React, { useState, useRef } from 'react';
import { TextInput, Button, Text } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from '../../api/axiosConfig';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithEmailAndPassword } from '../../redux/actions/AuthActions';

const RegisterScreen = () => {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const dispatch = useDispatch()

    const theme = useSelector(state => state.theme.theme)

    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const regEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    const postRegister = async ({ firstName, email, password, rePassword }) => {
        
        if (regEmail.test(email) === false) {
            alert('Not a valid Email Address')
            return
        }
        if (regPassword.test(password) === false) {
            alert('Password must be at least 8 characters and must contain a special character, a number, a lowercase, and an uppercase')
            return
        }
        if (password !== rePassword) {
            alert("Passwords don't match");
            return
        }
        try {
            await axios.post('api/Authenticate/register', {
                firstName: firstName,
                email: email,
                password: password
            })
            try {
                dispatch(loginWithEmailAndPassword(email, password))
                
            } catch (error) {
                alert(error)
            }
            
        } catch (error) {
            alert(error)
        }
        
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 32 }}>
                                    Create Account
                                </Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <TextInput style={styles.textInput}
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                autoCorrect={false}
                                label='First Name'
                                value={firstName}
                                onChangeText={firstName => setFirstName(firstName)}
                                onSubmitEditing={() => ref_input2.current.focus()}  
                            />
                            <TextInput style={styles.textInput}
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                label='Email'
                                value={email}
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={email => setEmail(email)}
                                onSubmitEditing={() => ref_input3.current.focus()}
                                ref={ref_input2}
                            />
                            <TextInput style={styles.textInput}
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                label='Password'
                                value={password}
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={password => setPassword(password)}
                                onSubmitEditing={() => ref_input4.current.focus()}
                                secureTextEntry
                                ref={ref_input3}
                            />
                            <TextInput style={styles.textInput}
                                label='Re-enter Password'
                                value={rePassword}
                                autoCorrect={false}
                                autoCapitalize='none'
                                onChangeText={rePassword => setRePassword(rePassword)}
                                onSubmitEditing={() => postRegister({ firstName, email, password, rePassword })}
                                secureTextEntry
                                ref={ref_input4}
                            />
                            
                        </View>
                        <View style={{ flex: 1, justifyContent: 'space-between', padding: 10}}>
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <View style={{ flex: 1}}/>
                                <View style={{ flex: 0.8, }}>
                                    <Button mode='contained' style={styles.button} onPress={() => postRegister({ firstName, email, password, rePassword })} >
                                        Sign up
                                    </Button>
                                </View>
                                <View style={{ flex: 1}}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 8,
        marginVertical: 14
    },
});

export default RegisterScreen;
