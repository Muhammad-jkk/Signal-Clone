import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fontScale = Dimensions.get('window').fontScale;

const Button = ({ title, btnStyle, btnTextStyle, onPress, loading }) => {
  const { colors } = useTheme();
  return (
    <>
      {loading ?
        <ActivityIndicator size={40} color={colors.primary} />
        :
        <TouchableOpacity onPress={onPress} style={[styles.containerStyle, { backgroundColor: colors.primary }, btnStyle]}>
          <Text style={[styles.containerTextStyle, { color: colors.secondary }, btnTextStyle]}>{title}</Text>
        </TouchableOpacity>
      }
    </>
  )
}
const styles = StyleSheet.create({
  containerStyle: {
    width: "100%",
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  containerTextStyle: {
    fontSize: fontScale * 20,
  }
})
export default Button