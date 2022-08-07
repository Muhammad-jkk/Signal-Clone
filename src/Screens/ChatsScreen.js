import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Avatar, TouchableRipple, useTheme } from 'react-native-paper'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fontScale = Dimensions.get('window').fontScale;

const ChatsScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const wrap = (word, n) => {
        console.log(word.length," ",word.substr(0, n - 1).length)
        return (word?.length > n) ? word.substr(0, n - 1) + '...' : word;
      }
    useLayoutEffect(() => {
        navigation.setOptions({            
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar.Image size={height / 18} source={require('../../assets/images/logo.jpg')} />
                    <Text style={{ color: colors.secondary, fontSize: fontScale * 16, paddingLeft: width * 0.02 }}>{wrap(route?.params?.chatName,15)}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center',paddingHorizontal:width*0.02 }}>
                    <FontAwesome name='video-camera' style={{paddingHorizontal:width*0.06}} size={height / 40} color={colors.secondary} />
                    <Ionicons name='call' size={height / 40} color={colors.secondary} />
                </View>
            )
        })
    }, [navigation])

    return (
        <View>
            <Text>ChatsScreen</Text>
        </View>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({})