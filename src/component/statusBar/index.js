import { StyleSheet, StatusBar, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import React from 'react'

const MyStatusBar = (props) => {

    const STATUSBAR_HEIGHT = getStatusBarHeight();
    const CustomStatusBar = () => (
        <View style={{ STATUSBAR_HEIGHT, backgroundColor: props.color }}>
            <StatusBar translucent backgroundColor={props.color} {...props} />
        </View>
    );
    return (
        <CustomStatusBar barStyle="light-content" />
    )
}

export default MyStatusBar

const styles = StyleSheet.create({})

