import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../utils/colors';

const Loader = () => {
    return (
        <View style={styles.viewStyle}>
            <ActivityIndicator size="large" color={Colors.theme} />
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    viewStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.0)',
        width: "100%",
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})