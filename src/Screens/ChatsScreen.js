import { Dimensions, FlatList, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, TouchableRipple, useTheme } from 'react-native-paper'
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import InputText from '../Components/InputText'
import { addDoc, collection, getDocs, orderBy, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../Components/Loader';
import moment from 'moment';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fontScale = Dimensions.get('window').fontScale;

const ChatsScreen = ({ navigation, route }) => {
    const { colors } = useTheme();
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const IsFocused = useIsFocused();

    const wrap = (word, n) => {
        return (word?.length > n) ? word.substr(0, n - 1) + '...' : word;
    }
    const getChats = async () => {
        var temp = [];
        const querySnapshot = await getDocs(collection(db, "chats", route?.params?.id, "Messages"), orderBy('timestamp', 'asc'));
        querySnapshot.forEach((doc) => {
            temp.push({ id: doc.id, data: doc.data() })
        });
        setChats(temp)
        setIsLoaded(true)
    }
    const sendMessage = () => {
        const tempMessage = message;
        setMessage('');
        addDoc(collection(db, "chats", route?.params?.id, "Messages"), {
            timestamp: serverTimestamp(),
            message: tempMessage,
            displayName: auth?.currentUser?.displayName,
            email: auth?.currentUser?.email,
            photoURL: auth?.currentUser?.photoURL
        })
            .then(res => {
                getChats();
                Keyboard.dismiss();
            })
            .catch(err => console.log(err))
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Avatar.Image size={height / 14} source={{ uri: chats[0]?.data?.photoURL }} />
                    <Text style={{ color:'white', fontSize: fontScale * 16, paddingLeft: width * 0.02 }}>{wrap(route?.params?.chatName, 15)}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: width * 0.02 }}>
                    <FontAwesome name='video-camera' style={{ paddingHorizontal: width * 0.06 }} size={height / 40} color='white' />
                    <Ionicons name='call' size={height / 40} color='white' />
                </View>
            )
        })
    }, [navigation, chats])
    useEffect(() => {
        getChats();
    }, [IsFocused])

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={90} style={[styles.container,{backgroundColor: colors.secondary}]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <>
                {isLoaded ?
                    chats?.length > 0 ?
                        <FlatList
                            data={chats}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={[styles.message, { backgroundColor: item?.data?.email === auth?.currentUser?.email ? '#ECECEC' : colors.primary, alignSelf: item?.data?.email === auth?.currentUser?.email ? 'flex-end' : 'flex-start', }]}>
                                    {item?.data?.email !== auth?.currentUser?.email && <Text style={{ color: colors.secondary, borderTopStartRadius: 10, fontWeight: '600', fontSize: height * 0.010 }}>{item?.data?.displayName}</Text>}
                                    <Text style={{ color: item?.data?.email === auth?.currentUser?.email ? 'black' : 'white', fontWeight: '600', width: '100%' }}>{item?.data?.message}
                                        <Text style={{ fontWeight: '400', alignSelf: 'flex-end', fontSize: height * 0.010 }}>       {moment(item?.data?.timestamp?.nanoseconds).format('hh:mm a')}    </Text>
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                                    </View>
                                    <Avatar.Image style={{ position: 'absolute', left: (item?.data?.email !== auth?.currentUser?.email ? -10 : 40), bottom: -height * 0.03 }} size={height / 28} source={{ uri: item?.data?.photoURL }} />
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                        : <View><Text>Inbox Empty</Text></View>
                    : <Loader />}
                <View style={styles.footer}>
                    <InputText
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder='Type Message...'
                        autoFocus
                        returnKeyType='done'
                        onChangeText={(text) => setMessage(text)}
                        value={message}
                        onSubmitEditing={sendMessage}
                    />
                    <Pressable activeOpacity={0.5} onPress={sendMessage}>
                        <Ionicons name='send' size={height / 40} color={colors.primary} />
                    </Pressable>
                </View>
            </>
        </KeyboardAvoidingView>
    )
}

export default ChatsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    message: {
        maxWidth: '80%',
        paddingLeft: 15,
        paddingVertical: 5,
        position: 'relative',
        borderRadius: 10,
        margin: 15
    },
    messageText: {

    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },
    inputContainerStyle: {
        flex: 1,
        marginRight: 15,
        padding: 10,
        height: 40,
        bottom: 0,
        borderRadius: 30,
        color: 'grey',
        borderBottomWidth: 0,
        backgroundColor: '#ECECEC',
        marginBottom: 0
    }

})