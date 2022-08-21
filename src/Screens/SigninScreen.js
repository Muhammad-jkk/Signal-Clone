import { View, Text, Image, Dimensions, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Button from '../Components/Button';
import InputText from '../Components/InputText';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LocalStorage from '../../Utils/LocalStorage';
import Popup from '../Components/Popup';
import { useTheme } from 'react-native-paper';
import { auth } from '../../firebase';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const fontScale = Dimensions.get('window').fontScale;


const SigninScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const { colors } = useTheme();

    const handleOnSignIn = () => {
        if (email != '' && password != '') {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    if (user) {
                        LocalStorage.SetData("Login", "login");
                    }
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    setMessage("Invalid Email or Password");
                    setShowPopup(true);
                    console.log(errorMessage)
                });
        } else {
            setMessage("Fields are required!");
            setShowPopup(true);
        }
    }

useLayoutEffect(() => {
//   navigation.setOptions({
//     headerLeft:false
//   })

}, [navigation])
    return (
        <>
            <ScrollView style={{ backgroundColor: 'white' }} keyboardShouldPersistTaps='always'>

                <KeyboardAvoidingView behavior='height' style={styles.containerStyle} >

                    <View style={{ height: 10 }} />
                    <View style={{ marginVertical: 20 }}>
                        <Image style={{ borderRadius: 20, width: height/4, height: height/4 }} resizeMode="cover" source={require('../../assets/images/logo.jpg')} />
                    </View>
                    <View style={styles.inputContainerStyle}>
                        <InputText
                            placeholder='Email'
                            autoFocus
                            returnKeyType='next'
                            keyboardType='email-address'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                        />
                        <InputText
                            placeholder='Password'
                            autoFocus
                            returnKeyType='done'
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.buttonContainerStyle}>
                        <Button onPress={handleOnSignIn} title={'Sign In'} />
                        <Button onPress={() => navigation.navigate("Register")} title={'Register'} btnStyle={{ marginVertical: 20, backgroundColor: colors.secondary, borderWidth: 1, borderColor: colors.primary }} btnTextStyle={{ color: colors.primary }} />
                    </View>
                    <View style={{ height: 100 }} />
                </KeyboardAvoidingView>
            </ScrollView>
            <Popup
                title={'Error'}
                description={message}
                show={showPopup}
                onPress={() => setShowPopup(false)}
            />
        </>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    inputContainerStyle: {
        width: '85%',
        paddingBottom: height*0.04,
    },

    buttonContainerStyle: {
        width: '85%'
    }
})
export default SigninScreen