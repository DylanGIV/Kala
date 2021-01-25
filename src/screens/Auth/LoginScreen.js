import React, { useState, useRef } from 'react';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithEmailAndPassword } from '../../redux/actions/AuthActions';

const LoginScreen = (props) => {
    const [email, setEmail] = useState('Expo@mail.com')
    const [password, setPassword] = useState('Expo!1')

    const ref_input2 = useRef();

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoggingIn)
    const theme = useSelector(state => state.theme.theme)

    const login = () => {
        dispatch(loginWithEmailAndPassword(email, password))
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flex:1 }}>
                            <View style={{ flex: 0.5 }}/>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 36, color: theme.colors.text, marginTop: 15 }}>
                                    Kala
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1.3 }}>
                            <TextInput style={styles.textInput}
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                label='Email'
                                value={email}
                                onChangeText={email => setEmail(email)}
                                onSubmitEditing={() => ref_input2.current.focus()}
                            />
                            <TextInput style={styles.textInput}
                                label='Password'
                                value={password}
                                onChangeText={password => setPassword(password)}
                                onSubmitEditing={login}
                                secureTextEntry
                                ref={ref_input2}
                            />
                            <TouchableOpacity style={{ backgroundColor: theme.colors.primary, flex: 0.3, justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginHorizontal: 12 }} onPress={login}>
                                <Text style={{ fontSize: 16 }}>
                                    Sign In
                                </Text>
                            </TouchableOpacity>
                            <View style={{ flex: 0.3, marginTop: 10 }}>
                                <Button>
                                    Forgot Password?
                                </Button>
                            </View>
                        </View>
                            <View style={{ flex: 1, padding: 10, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                <Button onPress={() => props.navigation.navigate('Register')}>
                                    Register
                                </Button>
                            </View>

                        {isLoading &&
                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', opacity: 0.5, left: 0, right: 0, top: 0, bottom: 0 }}>
                            <ActivityIndicator size='large' />
                        </View>
                        }
                    
                    </View>


                </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        marginHorizontal: 8,
        marginBottom: 14
    },
});

export default LoginScreen;
