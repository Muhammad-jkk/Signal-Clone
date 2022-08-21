import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import HomeScreen from './Screens/HomeScreen';
import LocalStorage from '../Utils/LocalStorage';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from './Components/Loader';
import AddChatScreen from './Screens/AddChatScreen';
import { auth } from '../firebase';
import ChatsScreen from './Screens/ChatsScreen';
import { useSelector,useDispatch } from 'react-redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { changeTheme } from './Redux/Slices/ThemeSlice';

const MainStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { isDark } = useSelector(state => state.theme);
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: isDark ? 'black' : '#2c68ed',
      secondary: isDark ? 'rgba(0, 0, 0, 0.568)' : '#FFFFFF',
      tertiary: isDark ? 'white' : '#333333'
    },
  };
  const globalHeaderStyle = {
    headerStyle: { backgroundColor: isDark ? 'black' : '#2c68ed' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
    headerTitleAlign: 'center',
    headerBackTitleVisible: false,
  }
  const [userState, setUserState] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();
  const chechStatus = async () => {
    const Login = await LocalStorage.GetData("Login");
    let theme = await LocalStorage.GetData("Theme");
  console.log("ISDARK", theme)

    setUserState(Login)
    setIsLoaded(true);
    dispatch(changeTheme(JSON.parse(theme)));
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

  return (
    <>
      {isLoaded ?
        <PaperProvider theme={theme}>
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
        </PaperProvider>
        :
        <Loader />
      }
    </>

  )
}

export default MainStackNavigator
