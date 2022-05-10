import { View, Text, TextInput, StyleSheet, Button, Pressable, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AsyncStorage } from 'react-native';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from '../firebase';

const db = getFirestore(app);
const storage = getStorage();

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profile, setProfile] = useState('User');
  const auth = getAuth();

  useEffect(() => {
    // auth().onAuthStateChanged(user => {
    //   if (user) {
    //     props.navigation.navigate('Home')
    //   }
    // })
  }, [])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password, profile)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        AsyncStorage.setItem('user', JSON.stringify(user));
        const groupsRef = collection(db, 'users');
        let groupDetails = await query(groupsRef, where('email', '==', email));
        const querySnapshot = await getDocs(groupDetails);
        if (querySnapshot.empty) {
          alert('User not found. Please create profile.');
          props.navigation.navigate('Register');
        } else {
          props.navigation.navigate('Home');
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <View style={styles.body}>
      <Text style={styles.logintitle}>Login</Text>
      {/* <Picker style={styles.PickerPlaceholder}
            selectedValue={profile}
            onValueChange={currentProfile => setProfile(currentProfile)}>
            <Picker.Item label="user" value="User" />
            <Picker.Item label="admin" value="Admin" />
          </Picker>
          <Text>
          Selected: {profile}
        </Text> */}
      <TextInput style={styles.InputPlaceholder}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}

      />
      <TextInput style={styles.InputPlaceholder}
        secureTextEntry={true}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Text style={styles.AccountText}>
          Don't have an account?
          <Pressable onPress={() => props.navigation.navigate('Register')}>
            <Text style={[styles.text, styles.BoldAccountText]}> Register</Text>
          </Pressable>
        </Text><Text style={styles.AccountText}>
          Forgot Password?
          <Pressable onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={[styles.text, styles.BoldAccountText]}> Change</Text>
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
export default Login