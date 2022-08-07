import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import InputText from '../Components/InputText'
import Button from '../Components/Button';
import { db } from '../../firebase';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useTheme } from 'react-native-paper';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const AddChatScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOnNewChatBtn = async () => {
        setLoading(true);
        addDoc(collection(db, "chats"), {
            chatName: message
        })
            .then(res => {
                navigation.navigate("Home")
                setLoading(false)
            })
            .catch(err => console.log(err))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <AntDesign onPress={() => navigation.goBack()} name='arrowleft' style={{ paddingHorizontal: width * 0.02 }} size={height / 40} color={colors.secondary} />
            )
        })
    }, [navigation])
    return (
        <View style={styles.mainContainer}>
            <InputText
                placeholder='Message'
                autoFocussetMessage
                returnKeyType='next'
                onChangeText={(text) => setMessage(text)}
                value={message}
                icon={<FontAwesome size={15} style={{ marginRight: 10, marginLeft: 5 }} color='grey' name='wechat' />}
                onSubmitEditing={handleOnNewChatBtn}
            />
            <Button loading={loading} onPress={handleOnNewChatBtn} title={'Create New Chat'} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.05
    },

})