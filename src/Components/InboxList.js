import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, List, useTheme } from 'react-native-paper'
import { collection, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'

const InboxList = ({ onPress, id, chatName }) => {
    const height = Dimensions.get('window').height;
    const [chatData, setChatData] = useState([]);
    const { colors } = useTheme();

    useEffect(() => {
        const temp = [];
        const unsub = onSnapshot(collection(db, "chats", id, 'Messages'), orderBy('timestamp', 'aesc'), (querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                console.log({ id: doc.id, data: doc.data() })
                temp.push({ data: doc.data() })
            });
            setChatData(temp);
        });

        return unsub;
    }, [])

    return (
        <List.Item
            onPress={onPress}
            title={chatName}
            titleStyle={{ fontWeight: 'bold', color: colors.tertiary }}
            descriptionStyle={{ color: colors.tertiary }}
            description={chatData[0]?.data?.displayName + ': ' + chatData[0]?.data?.message}
            descriptionNumberOfLines={1}
            descriptionEllipsizeMode='tail'
            left={() => <Avatar.Image size={height / 14} source={{ uri: chatData[0]?.data?.photoURL }} />}
        />
    )
}

export default InboxList

