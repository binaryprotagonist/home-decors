import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import { Colors } from '../../utils/colors';
const InputBox = (props) => {
    return (
        <DropShadow style={styles.shadowStyle}>
            <View style={{ backgroundColor: Colors.inputGrey, marginTop: 15, marginHorizontal: 10, paddingHorizontal: 10, borderRadius: 12 }}>
                <View style={{}}>
                    <TextInput
                        style={{
                            height: 55, backgroundColor: Colors.inputGrey,
                            color: Colors.black, fontSize: 16
                        }}
                        placeholder={props.placeholder}
                        placeholderTextColor={Colors.palceHolder_theme}
                        value={props.value}
                        editable={props?.editable}
                        onChangeText={props.onChangeText}
                        keyboardType={props.keyboardType}
                    />
                </View>
            </View>
        </DropShadow>
    )
}

export default InputBox;

const styles = StyleSheet.create({
    shadowStyle: {
        flex: 1,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    semibold_12_opacity: {
        fontSize: 12,
        color: Colors.black,
        opacity: 0.4
    }
})