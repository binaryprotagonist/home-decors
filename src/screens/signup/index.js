import { StyleSheet, Dimensions, Text, Image, View, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Images from '../../utils/images'
import { Colors } from '../../utils/colors';
import InputBox from '../../component/textInput'
import SubmitButton from '../../component/button';
import { register } from '../../apiManager/auth';
import MyStatusBar from '../../component/statusBar';

const Height = Dimensions.get('screen').height;

const Signup = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const AuthValidation = () => {
        if (!name) {
            alert('Please enter your name')
        } else if (!email) {
            alert('Please enter email')
        } else if (!password) {
            alert('Please enter password')
        } else {
            var raw = JSON.stringify({
                name,
                email,
                password
            });
            register(raw)
                .then(response => {
                    // console.log('response ', JSON.stringify(response));
                    if (response.code == 0) {
                        props.navigation.navigate('Login')
                        alert('successfully registered')
                    } else {
                        alert(response.message)

                    }
                })
        }
    }
    return (
        <ImageBackground
            source={Images.im_bg}
            style={styles.imageBackground}
        >
            <MyStatusBar />
            <SafeAreaView style={{ height: Height, }}>
                <ScrollView >
                    <View style={styles.container}>
                        <Image
                            resizeMode={'center'}
                            source={Images.ic_logo}
                            style={styles.logo}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.bold_18_white}>Sign Up</Text>
                            <Text style={styles.regular_16_white}>With your phone number</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <InputBox
                                placeholder={'Enter your name'}
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
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
                            <SubmitButton name={'Submit'}
                                onPress={() => AuthValidation()}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <Text style={[styles.regular_16_white, { fontSize: 14 }]}>Already have an account?</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
                                <Text style={[styles.bold_18_white, { fontSize: 15, marginLeft: 4 }]}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBackground: {
        // flex: 1,
        width: "100%",
        height: Height
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