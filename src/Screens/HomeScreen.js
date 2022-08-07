import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, List, TouchableRipple, useTheme } from 'react-native-paper'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import Loader from '../Components/Loader';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fontScale = Dimensions.get('window').fontScale;

const HomeScreen = ({ navigation }) => {

  const [chats, setChats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const {colors}=useTheme();
  const IsFocused =useIsFocused();
  
  const getChatsNames = async () => {
    var temp = [];
    const querySnapshot = await getDocs(collection(db, "chats"));
    querySnapshot.forEach((doc) => {
      temp.push({ id: doc.id, data: doc.data().chatName })
    });
    setChats(temp)
  }

  const handleOnListItemPress=(id,chatName)=>{
    navigation.navigate('ChatsScreen',{id,chatName})
  }

  useEffect(() => {
    getChatsNames();
    setIsLoaded(true)
  }, [IsFocused])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerLeft: () => (
        <Avatar.Image style={{ marginHorizontal: width * 0.02 }} size={height / 18} source={require('../../assets/images/logo.jpg')} />
      ),
      headerRight: () => (
        <TouchableRipple rippleColor="red">
          <SimpleLineIcons onPress={() => navigation.navigate('AddChatScreen')} style={{ paddingHorizontal: width * 0.02 }} name='pencil' color={colors.secondary} size={height / 40} />
        </TouchableRipple>
      )
    })
  }, [navigation])
  return (
    <View>
      {isLoaded ?
        chats?.length > 0 ?
          <FlatList
            data={chats}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <List.Item
                onPress={()=>handleOnListItemPress(item?.id,item?.data)}
                title={item?.data}
                description="Item description"
                descriptionNumberOfLines={1}
                descriptionEllipsizeMode='tail'
                left={() => <Avatar.Image size={height/18} source={require('../../assets/images/logo.jpg')} />}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          : <View>{chats?.data?.chatName}</View>
        : <Loader />}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})