import { StyleSheet, Dimensions, Text, Image, View, SafeAreaView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Images from '../../utils/images'
import { Colors } from '../../utils/colors';
import InputBox from '../../component/textInput'
import SubmitButton from '../../component/button';
import MyStatusBar from '../../component/statusBar';
import { adduser } from '../../apiManager/users';
import images from '../../utils/images';

const Height = Dimensions.get('screen').height;


const AddUser = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')

    const resetForm = () => {
        setName('')
        setEmail('')
        setLocation('')
    }
    const checkValidation = () => {
        if (!name) {
            alert('Please enter your name')
        } else if (!email) {
            alert('Please enter email')
        } else if (!location) {
            alert('Please enter location')
        } else {
            var raw = JSON.stringify({
                name,
                email,
                location
            });
            adduser(raw)
                .then(response => {
                    // console.log('response ', JSON.stringify(response));
                    if (response) {
                        resetForm()
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
            <MyStatusBar color='#af69d5' />
            {/* <SafeAreaView style={{ height: Height, }}> */}
            <ScrollView >
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image source={images.ic_back}
                        resizeMode='contain'
                        style={styles.imagestyles} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Image
                        resizeMode={'center'}
                        source={Images.ic_logo}
                        style={styles.logo}
                    />
                    <View style={styles.titleContainer}>
                        <Text style={styles.bold_18_white}>Add User</Text>
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
                            placeholder={'location'}
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <SubmitButton name={'Add'}
                            onPress={() => checkValidation()}
                        />
                    </View>
                </View>
            </ScrollView>
            {/* </SafeAreaView> */}
        </ImageBackground>
    )
}

export default AddUser

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
    imagestyles: {
        height: 20,
        width: 20,
        top: 55,
        left: 20,
        position: 'absolute',
    },
    bold_18_white: {
        fontSize: 24,
        textAlign: 'center',
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