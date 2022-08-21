import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, List, TouchableRipple, useTheme } from 'react-native-paper'
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from '../../firebase';
import Loader from '../Components/Loader';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import LocalStorage from '../../Utils/LocalStorage';
import InboxList from '../Components/InboxList';
import CustomSwitch from '../Components/CustomSwitch';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fontScale = Dimensions.get('window').fontScale;

const HomeScreen = ({ navigation }) => {

  const [chats, setChats] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { colors } = useTheme();
  const IsFocused = useIsFocused();

  const getChatsNames = async () => {
    var temp = [];
    const querySnapshot = await getDocs(collection(db, "chats"));
    querySnapshot.forEach((doc) => {
      temp.push({ id: doc.id, data: doc.data().chatName })
    });
    setChats(temp)
    setIsLoaded(true)
  }

  const Logout = () => {
    auth.signOut()
      .then(res => {
        LocalStorage.RemoveData("Login");
        LocalStorage.RemoveData("Theme");
      }).catch(err => console.log(err));
  }

  useEffect(() => {
    getChatsNames();
  }, [IsFocused])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerLeft: () => (
        <TouchableRipple onPress={() => Logout()} rippleColor="red">
          <Avatar.Image style={{ marginHorizontal: width * 0.02 }} size={height / 14} source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableRipple>
      ),
      headerRight: () => (
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <TouchableRipple rippleColor="red">
            <SimpleLineIcons onPress={() => navigation.navigate('AddChatScreen')} style={{ paddingHorizontal: width * 0.02 }} name='pencil' color='white' size={height / 40} />
          </TouchableRipple>
          <CustomSwitch />
          {/* <MaterialCommunityIcons name="theme-light-dark" size={height / 40} color="white" /> */}
        </View>
      )
    })
  }, [navigation])
  console.log(auth.currentUser.photoURL)
  return (
    <View style={{ backgroundColor: colors.secondary, flex: 1 }}>
      {isLoaded ?
        chats?.length > 0 ?
          <FlatList
            data={chats}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <InboxList
                onPress={() => navigation.navigate('ChatsScreen', { id: item?.id, chatName: item?.data })}
                id={item?.id}
                chatName={item?.data}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          : <View><Text>No chats to dispaly.</Text></View>
        : <Loader />}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})