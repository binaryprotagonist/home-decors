import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

const SubmitButton = (props) => {
    return (
        <TouchableOpacity style={[styles.mainContainer, { marginHorizontal: 10 }]}
            onPress={props.onPress}
        >
            <Text style={styles.bold_14_white}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export default SubmitButton;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Colors.white,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,
        borderRadius: 12,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 6
    },
    bold_14_white: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.theme
    }
})