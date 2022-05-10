import { View, Text, TextInput, StyleSheet, Button, Pressable, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { getAuth, signInWithEmailAndPassword, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import { AsyncStorage } from 'react-native';


const ForgotPassword = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const auth = getAuth();

    const handelPasswordChange = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Email sent")
        });
    }

    return (
        <View style={styles.body}>
            <Text style={styles.logintitle}>Forgot Password?</Text>
            <Text>Enter email address to send reset email</Text>
            <TextInput style={styles.InputPlaceholder}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}

            />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handelPasswordChange}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </Pressable>
                <Text style={styles.AccountText}>
                    Remember password?
                    <Pressable onPress={() => props.navigation.navigate('Register')}>
                        <Text style={[styles.text, styles.BoldAccountText]}> Login</Text>
                    </Pressable>
                </Text>
            </View>
        </View>
        // </KeyboardAvoidingView>

    )
}


const styles = StyleSheet.create({
    body: {
        padding: 20,
        justifyContent: 'center',
        flex: 1,
    },
    logintitle: {
        fontSize: 50,
    },
    AccountText: {
        color: '#000000',
        fontSize: 16,
        textAlign: 'center',

    },
    BoldAccountText: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    // appName: {
    //     fontSize: 30,
    //     color: '#000000',
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     marginTop: 50,
    //     fontFamily: 'Chewy',
    // },
    // subtitle: {
    //     fontSize: 17,
    //     color: '#000000',
    //     textAlign: 'center', 
    //     marginTop: 30,
    // },
    button: {
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 10,
        marginTop: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',

    },
    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    InputPlaceholder: {
        borderWidth: 1,
        backgroundColor: '#cccccc',
        borderColor: 'transparent',
        opacity: 0.6,
        height: 40,
        marginTop: 20,
        borderRadius: 5,
        paddingLeft: 10,
    },
    PickerPlaceholder: {
        borderWidth: 1,
        backgroundColor: '#cccccc',
        borderColor: 'transparent',
        opacity: 0.6,
        marginTop: 20,
        borderRadius: 5,
        paddingLeft: 10,
    },
    // image: {
    //   width: 200,
    //   height: 200,
    // },
    // logo: {
    //   alignSelf: 'center',
    // },
    // icon: {
    //   alignSelf: 'center',
    // },
    // buttonContainer: {
    //   flex: 1,
    //   justifyContent: 'flex-end',
    //   marginTop: 'auto',
    //   marginBottom: 30,
    // },
})
export default ForgotPassword