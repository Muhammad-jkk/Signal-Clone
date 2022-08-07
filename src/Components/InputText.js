import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const InputText = (props) => {
    return (
        <View style={styles.inputContainerStyle}>
            {props?.icon}
            <TextInput
                placeholder={props?.placeholder}
                autoFocus={props?.autoFocus}
                returnKeyType={props?.returnKeyType}
                style={[styles?.inputStyle, props?.inputStyle]}
                keyboardType={props?.keyboardType}
                onChangeText={props?.onChangeText}
                value={props?.value}
                onSubmitEditing={props?.onSubmitEditing}
            />
        </View>
    )
}

export default InputText

const styles = StyleSheet.create({
    inputStyle: {      
        paddingVertical: height * 0.0015,
        paddingHorizontal: height * 0.002,
        width:width-70
    },
    inputContainerStyle:{
        borderBottomWidth: 1,
        marginBottom: height * 0.01,
        flexDirection:'row',
        alignItems:'center',
        
    }
})