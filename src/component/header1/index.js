import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import images from '../../utils/images';

const CustomHeader1 = (props) => {
    return (
        <View style={styles.headerContainer}>
            <View >
                <TouchableOpacity onPress={() => props.onNavigate()}>

                    <Image source={images.ic_back_black}
                        resizeMode='contain'
                        style={styles.imagestyles} />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={styles.title}>Profile Details</Text>
            </View>
            <View >
                <TouchableOpacity onPress={() => props.onLogoutPress()}>
                    <Image source={images.ic_logout}
                        resizeMode='contain'
                        style={{
                            height: 30,
                            width: 30,
                        }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomHeader1

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: 0.6,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        elevation: 2,
        borderBottomColor: '#ddd',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imagestyles: {
        height: 20,
        width: 20,
    },
    title: {
        fontSize: 20,
        paddingLeft: 10,
    }
})

