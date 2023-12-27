import React from 'react'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import images from '../../utils/images';

const CustomHeader = (props) => {
    return (
        <View style={styles.headerContainer}>
            <View >
                <Text style={styles.title}>HireTheArt</Text>
            </View>
            <View style={{ position: 'absolute', right: 10 }}>
                <TouchableOpacity onPress={() => props.onNavigate()}>
                    <Image source={images.ic_plus}
                        resizeMode='contain'
                        style={styles.imagestyles} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    headerContainer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.6,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagestyles: {
        height: 30,
        width: 30,
        alignSelf: 'flex-start'
    },
    title: {
        fontSize: 20,
    }
})

