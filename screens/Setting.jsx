import { View, Text, Pressable, Image, StyleSheet, TextInput, ScrollView, FlatList, SafeAreaView, Button } from 'react-native'
import React, { useRef, useEffect, useState } from 'react'
import UserProfile from '../assets/images/UserImage.png'
import leftChevron from '../assets/images/leftChevron-white.png'
import { Audio } from 'expo-av';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import 'firebase/storage';
import firebase from "firebase/app";
import 'firebase/storage';
import app from '../firebase';
import { collection, getDocs, getFirestore, updateDoc, doc, query, where } from "firebase/firestore";
import { AsyncStorage } from 'react-native';
import { getAuth, updatePassword } from "firebase/auth";
import Loading from './Loading';
import { isLoaded, isLoading } from 'expo-font';

const storage = getStorage(app);
// const storageRef = ref(storage, 'record.m4a');
const db = getFirestore(app);


const Setting = (props) => {

  const AudioRecorder = useRef(new Audio.Recording());
  const AudioPlayer = useRef(new Audio.Sound());
  const [recording, setRecording] = React.useState();
  var recordingGlobal;

  const auth = getAuth();


  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fillInitialData();
  }, []);

  async function playSound(URI) {
    try {
      await AudioPlayer.current.loadAsync({ uri: URI }, {}, true);

      const playerStatus = await AudioPlayer.current.getStatusAsync();

      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          SetIsPLaying(true);
        }
      }
    } catch (error) { console.log(error); }
  }

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      recordingGlobal = recording;
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recordingGlobal.stopAndUnloadAsync();
    const uri = recordingGlobal.getURI();
    console.log('Recording stopped and stored at', uri);
    setLoading(false);
    const audioClip = await fetch(uri);
    const audioBytes = await audioClip.blob();
    playSound(uri);
    const storageRef = ref(storage, `${email}.m4a`);
    uploadBytes(storageRef, audioBytes).then(() => {
      console.log('Uploaded');
    }).catch(err => {
      console.log('Failed to upload', err);
    });
  }

  const fillInitialData = () => {
    let userDetails;
    AsyncStorage.getItem('user').then(async (user) => {
      userDetails = JSON.parse(user);
      // const querySnapshot = await getDocs(collection(db, "users"), { email: userDetails.email });
      const usersRef = collection(db, 'users');
      let userDetails = await query(usersRef, where('email', '==', userDetails.email));
      const querySnapshot = await getDocs(userDetails);
      querySnapshot.forEach((doc) => {
        let obj = doc.data();
        console.log('obj2', obj);
        obj['id'] = doc.id;
        setUsername(obj.username);
        if (obj?.description)
          setDescription(obj.description);
        if (obj?.address)
          setAddress(obj.address);
        setEmail(obj.email);
        setUid(doc.id);
      });
    });
  }

  const submitForm = async () => {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      username: username,
      description: description,
      address: address
    });

    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    await firebase.auth().currentUser.reauthenticateWithCredential(credential);
    const user = auth.currentUser;
    await user.updatePassword(password);
    props.navigation.navigate('Home');
  }

  const recordAudio = async () => {
    alert("Please pronounce your name in 5 seconds");
    setLoading(true);
    await startRecording();
    setTimeout(() => {
      stopRecording();
    }, 5000);
  }

  return (
    <>
      {loading && <Loading />}
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image source={UserProfile} style={styles.icon} />
            </View>
            <View style={styles.headerRight}>
              <Text style={[styles.whiteText, styles.headerFont]}>{username}</Text>
              <Text style={[styles.whiteText]}>{description}</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.contentBody}>
              <Text style={styles.title}>Username</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Anirudh" value={username} onChangeText={t => setUsername(t)} />
                <Pressable style={styles.link} onPress={() => { }}>
                  <Text style={styles.linkText}>Edit</Text>
                </Pressable>
              </View>
              <Text style={styles.title}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={t => setPassword(t)} />
                <Pressable style={styles.link} onPress={() => { }}>
                  <Text style={styles.linkText}>Edit</Text>
                </Pressable>
              </View>
              <Text style={styles.title}>Description</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={t => setDescription(t)} />
                <Pressable style={styles.link} onPress={() => { }}>
                  <Text style={styles.linkText}>Edit</Text>
                </Pressable>
              </View>
              <Text style={styles.title}>Address</Text>
              <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="412 Summit Avenue" value={address} onChangeText={t => setAddress(t)} />
                <Pressable style={styles.link} onPress={() => { }}>
                  <Text style={styles.linkText}>Edit</Text>
                </Pressable>
              </View>
              <Text style={styles.title}>Dictation</Text>
              <View style={styles.inputContainer}>
                <TextInput style={[styles.input, styles.boldText]} editable={false} placeholder="Rerecord Audio" />
                <Pressable style={styles.link} onPress={() => recordAudio()}>
                  <Text style={styles.linkText}>Rerecord</Text>
                </Pressable>
              </View>
              <View style={styles.buttonContainer}>
                <Pressable style={styles.button1} onPress={() => submitForm()}>
                  <Text style={styles.buttonTextFinish}>Finish</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    position: 'relative',
    marginTop: 0,
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollParent: {
    flex: 1,
    height: '50%',
  },
  header: {
    backgroundColor: '#000000',
    paddingTop: 100,
    paddingBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    marginLeft: 20,
  },
  headerFont: {
    fontSize: 25,
  },
  whiteText: {
    color: '#ffffff',
    textAlign: 'center',
  }, icon: {
    width: 75,
    height: 75,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F3F5F7',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    height: 50,
    fontSize: 20,
    color: '#000000',
  }, contentBody: {
    marginTop: 10,
    paddingHorizontal: 15,
    display: 'flex',
  }, title: {
    fontSize: 20,
  }, link: {
    marginTop: 10,
    position: 'absolute',
    right: 5,
    alignItems: 'center',
    marginTop: 25,
  }, linkText: {
    color: '#5A6978',
    textDecorationLine: 'underline',
  }, boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginTop: 5,
    marginBottom: 0,
  },
  button1: {
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
  buttonTextFinish: {
    color: '#ffffff',
    fontSize: 20,
  },
})
export default Setting