import { StyleSheet, Text, Image, Dimensions, View, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import Images from '../../utils/images'
import { Colors } from '../../utils/colors';
import InputBox from '../../component/textInput'
import SubmitButton from '../../component/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../../apiManager/auth';
import MyStatusBar from '../../component/statusBar';
import { AuthContext } from '../..';
// import { AuthContext } from '../../screens'
const Height = Dimensions.get('screen').height;

const Login = (props) => {

    const { updateToken } = useContext(AuthContext);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const AuthValidation = () => {
        if (!email) {
            alert('Please enter email')
        } else if (!password) {
            alert('Please enter password')
        } else {
            var raw = JSON.stringify({
                email,
                password
            });
            login(raw)
                .then(response => {
                    // console.log('response ', JSON.stringify(response));
                    if (response.code == 0) {
                        AsyncStorage.setItem('@TOKEN', response.data.Token);
                        let token = response.data.Token;
                        updateToken(token)
                        // console.log({ token })
                        global.Token = token;
                    }
                })
        }
    }

    return (
        <ImageBackground
            source={Images.im_bg}
            style={styles.imageBackground}
        >
            <MyStatusBar color={'#af69d5'} />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <Image
                            resizeMode={'center'}
                            source={Images.ic_logo}
                            style={styles.logo}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.bold_18_white}>Sign In</Text>
                            <Text style={styles.regular_16_white}>With your phone number</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <InputBox
                                placeholder={'Email-id'}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <InputBox
                                placeholder={'Password'}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <SubmitButton name={'Login'}
                                onPress={() => AuthValidation()}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <Text style={[styles.regular_16_white, { fontSize: 14 }]}>Have not any account?</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
                                <Text style={[styles.bold_18_white, { fontSize: 15, marginLeft: 4 }]}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    titleContainer: {
        marginTop: 20,
        marginHorizontal: 10,
    },
    inputContainer: {
        marginTop: 20,
    },
    buttonContainer: {
        marginTop: 40,
    },
    bottomContainer: {
        marginTop: 110,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        width: "100%",
        height: Height,
    },
    logo: {
        width: 300,
        height: 200,
        marginTop: '20%',
        alignSelf: 'center'
    },
    bold_18_white: {
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 10,
        color: Colors.white
    },
    regular_16_white: {
        fontSize: 16,
        fontWeight: 'normal',
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 6,
        color: Colors.white
    },
    semibold_12_black: {
        fontSize: 12,
        color: Colors.black
    },
})