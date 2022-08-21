import { StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import InputText from '../Components/InputText';
import Button from '../Components/Button';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Popup from '../Components/Popup';
import { useTheme } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const {colors} = useTheme();
    const Register = () => {
        if (name != '' && email != '' && password != '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(res => {
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: profileImage || 'https://flyclipart.com/thumb2/dragon-ball-z-goku-png-png-image-717428.png'
                    }).then(() => {
                        console.log('Profile Updated');
                        // Profile updated!
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        console.log('Error');
                      });                    
                })
                .catch(err => console.log(err))
        } else {
            setMessage("All Fields are required!")
            setShowPopup(true)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <AntDesign onPress={() => navigation.goBack()} name='arrowleft' style={{ paddingHorizontal: width * 0.02 }} size={height / 40} color={colors.secondary} />
            )
        })
    }, [navigation])
    return (
        <KeyboardAvoidingView behavior='height' style={styles.containerStyle} >
            <ScrollView contentContainerStyle={{ alignItems: 'center', height: '100%', width: '100%', justifyContent: 'center' }} keyboardShouldPersistTaps={'handled'}>
                <Text style={styles.text}>Create a Signal account</Text>
                <View style={styles.inputContainerStyle}>
                    <InputText
                        placeholder='Name'
                        autoFocus
                        returnKeyType='next'
                        inputStyle={styles.inputStyle}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <InputText
                        placeholder='Email'
                        autoFocus
                        returnKeyType='next'
                        inputStyle={styles.inputStyle}
                        keyboardType='email-address'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <InputText
                        placeholder='Password'
                        autoFocus
                        returnKeyType='next'
                        inputStyle={styles.inputStyle}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry
                    />
                    <InputText
                        placeholder='Profile Image'
                        autoFocus
                        returnKeyType='done'
                        inputStyle={styles.inputStyle}
                        onChangeText={(text) => setProfileImage(text)}
                        value={profileImage}
                        onSubmitEditing={Register}
                    />
                </View>
                <Button
                    title={'Register'}
                    btnStyle={{ width: '50%' }}
                    onPress={Register}
                />
                <View style={{ height: height * 0.2 }} />
                <Popup
                    title={'Error'}
                    description={message}
                    show={showPopup}
                    onPress={() => setShowPopup(false)}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    containerStyle: {
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: 10,
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: width * 0.06
    },
    inputContainerStyle: {
        marginTop: 20,
        paddingBottom: 20,
        width: '75%'
    },
    inputStyle: {
        paddingVertical: 20,
    }
})