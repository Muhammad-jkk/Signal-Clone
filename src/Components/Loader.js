import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
const Loader = () => {
    const {colors}=useTheme();
    return (
        <View style={styles.view}>
            <View style={[styles.circleloader,{backgroundColor:colors.primary}]}>
            <ActivityIndicator size={40} color={colors.secondary}/>
            </View>
        </View>
    );
};

export default Loader;

const styles = StyleSheet.create({
    view: {
        flex: 0,
        zIndex: 9,
        width: '100%',
        position: 'absolute',
        height: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleloader: {
        height: 45,
        width: 45,
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 45 / 2,
        shadowColor: "green",
        shadowOffset: {
          width: 0,
          height: 3,
        },
    }
});