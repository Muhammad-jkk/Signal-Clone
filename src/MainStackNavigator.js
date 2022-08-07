import React, { useEffect, useState } from 'react'
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LocalStorage from '../Utils/LocalStorage';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from './Components/Loader';
import AddChatScreen from './Screens/AddChatScreen';
import { auth } from '../firebase';
import { Dimensions } from 'react-native';
import ChatsScreen from './Screens/ChatsScreen';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme()
  const globalHeaderStyle = {
    headerStyle: { backgroundColor: colors.primary },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerTitleAlign:'center',
    headerBackTitleVisible:false,   
  }
  const [userState, setUserState] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const chechStatus = async () => {
    const Login = await LocalStorage.GetData("Login");

    setUserState(Login)
    setIsLoaded(true);

  }

  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (authState) => {
      if (authState) {
        LocalStorage.SetData("Login", "login");
      } else {
        LocalStorage.SetData("Login", "Logout");
      }
      chechStatus()
    })

    return subscribe
  }, [])
  console.log(userState)

  return (
    <>
      {isLoaded ?
        <NavigationContainer>
          <Stack.Navigator screenOptions={globalHeaderStyle}>
            {(userState == 'Logout' || userState == null) ?
              <>
                <Stack.Screen name="Sign In" component={SigninScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </> :
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddChatScreen" component={AddChatScreen} />
                <Stack.Screen name="ChatsScreen" component={ChatsScreen} />
              </>
            }
          </Stack.Navigator>
        </NavigationContainer>
        :
        <Loader />
      }
    </>

  )
}

export default MainStackNavigator
