import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TouchableHighlight, StatusBar, Platform, Image } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../utils/colors';
import images from '../../utils/images';
import LinearGradient from 'react-native-linear-gradient';

const Height = Dimensions.get('window').height;

const DashboardCards = props => {
    const item = props?.data;
    const onPressNavigate = () => {
        props.navigationProp('Profile', item.id)
    }

    return (
        <>
            <View style={[styles.container, {}]}>
                <View style={[styles.cardContainer, {}]}>
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode='cover'
                            source={images.im_wall}
                            style={styles.imageStyle}
                        />
                        <Image
                            resizeMode='cover'
                            source={images.ic_play}
                            style={styles.playIconStyle}
                        />
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.bold_18_black}>{item.name}</Text>
                        <Text style={styles.regular_14_black}>{item.email}</Text>
                        <Text style={styles.light_16_black}>{item.location}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#C183B3', Colors.theme, '#C183B3']} style={styles.Button}>
                            <TouchableOpacity onPress={() => onPressNavigate()}>
                                <Text style={styles.semibold_18_white}>View Profile</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>

                </View>
            </View>
        </>
    );
};



export default DashboardCards

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 10,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    playIconStyle: {
        width: 55,
        height: 55,
        position: 'absolute',
        bottom: -25,
        left: 20,
    },
    cardContainer: {
        height: Height / 2,
        backgroundColor: '#F2F2F2',
        margin: 10,
        borderRadius: 15
    },
    imageContainer: {
        height: '50%',
    },
    detailsContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30

    },
    buttonContainer: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
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

    semibold_18_white: {
        fontSize: 18,
        paddingHorizontal: 40,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        color: Colors.white
    },
    bold_18_black: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#616163'
    },
    regular_14_black: {
        fontSize: 14,
        color: '#616163',
        fontWeight: '600',
    },
    light_16_black: {
        fontSize: 14,
        fontWeight: '400',
        color: '#616163',
    },
    Button: {
        // backgroundColor: 'red',
        borderRadius: 15,
        width: '55%',
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: -1, height: 0 },
        shadowRadius: 10,
    },
})