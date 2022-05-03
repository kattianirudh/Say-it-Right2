import { View, Text, TextInput, StyleSheet, Button, Pressable, Image, AsyncStorage  } from 'react-native'
import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';
import app from '../firebase.js'
import { getAuth, onAuthStateChanged, User, createUserWithEmailAndPassword  } from 'firebase/auth';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore } from "firebase/firestore"; 




const auth = getAuth();
const db = getFirestore(app);

const Register = (props) => {
  const [profile, setProfile] = useState('User');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')

  const handleRegister = async () => {
    if (password === repassword) {
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password, profile);
        console.log(user);
        props.navigation.navigate('Home');
        AsyncStorage.setItem('userToken', user.user.uid);
        console.log("----->", user.user.uid);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            email,
            profile,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('Password does not match')
    }
  }


  return (
    <View style={styles.body}>
        <Text style={styles.logintitle}>Register</Text>
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
        <TextInput style={styles.InputPlaceholder}
          secureTextEntry={true}
          placeholder="Re-enter Password"
          value={repassword}
          onChangeText={(text) => setRepassword(text)}
        />
        {/* <TextInput style={styles.InputPlaceholder}
          secureTextEntry={true}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        /> */}
        <Picker style={styles.PickerPlaceholder}
          selectedValue={profile}
          onValueChange={currentProfile => setProfile(currentProfile)}>
          <Picker.Item label="user" value="User" />
          <Picker.Item label="admin" value="Admin" />
        </Picker>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <Text style={styles.AccountText}>
            Already have an account?
            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text style={[styles.text, styles.BoldAccountText]}> Login</Text>
              </Pressable>
          </Text>
        </View>


        
    </View>
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
  pressButton: {
    padding: 100,
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

    maxHeight: 30,
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
export default Register