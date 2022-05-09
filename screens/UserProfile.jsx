import { View, Text, StyleSheet, Button, Pressable, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import UserProfileImg from '../assets/images/UserImage.png'
import MIC from '../assets/images/Mic.png'
import Setting from '../assets/images/Raster.png'
import leftChevron from '../assets/images/leftChevron.png'
import UserProfileI from '../assets/images/UserProfile.png'
import { AsyncStorage } from 'react-native';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import { Audio } from 'expo-av';
import Loading from './Loading';
import Layout from '../constants/Layout'


const db = getFirestore(app);
const storage = getStorage();

const UserProfile = (props) => {
  const AudioPlayer = useRef(new Audio.Sound());
  const [sound, setSound] = React.useState();
  const [user, setUser] = useState({});
  const [userTemp, setUserTemp] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    console.log('useEffect');
    AsyncStorage.getItem('user').then((user) => {
      getUserDetails(user);
      console.log('users bitchessss', user);
    });
  }, [])

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const getUserDetails = async (user) => {
    // make call to firebas to get name of user with email same as user.email
    let users = JSON.parse(user);
    const usersRef = collection(db, 'users');
    let userDetails = await query(usersRef, where('email', '==', users.email));
    const querySnapshot = await getDocs(userDetails);
    let arr = [];
    querySnapshot.forEach(doc => {
      arr.push(doc.data());
    });
    setUser(arr[0]);
  }

  const getItemDetails = async (groupName) => {
    let arr = [];
    const groupsRef = collection(db, 'groupList');
    let groupDetails = await query(groupsRef, where('name', '==', groupName));
    const querySnapshot = await getDocs(groupDetails);
    querySnapshot.forEach(doc => {
      arr.push(doc.data());
    });
    return arr[0];
  }

  async function playSound(URI) {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: URI }
      );
      setSound(sound);
      await sound.playAsync();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code.includes('does not exist')) {
        alert('Account does not exist');
      }
    }
  }

  const playAudio = () => {
    var userDetails;
    setIsLoading(true);
    AsyncStorage.getItem('user').then(user => {
      userDetails = JSON.parse(user);
      const gsReference = ref(storage, `${userDetails.email}.m4a`);
      getDownloadURL(gsReference).then(url => {
        playSound(url);
      }).catch(error => {
        console.log(error);
        if (error.code == 'storage/object-not-found') {
          alert('Account does not exist');
        }
      });
      userTemp(JSON.parse(user));
    }).catch(err => {
      console.log("crazy", err);
    });
  }
  return (
    <>
    { isLoading && <Loading />}
    <View style={styles.body}>
      <View style={styles.UserNameContainer}>
        <Pressable onPress={() => props.navigation.navigate('UserImage')}>
          <Image style={styles.image1} source={UserProfileImg} />

        </Pressable>
        <View style={styles.header}>

          <Pressable onPress={() => props.navigation.navigate('Home')}>
            <Image style={styles.backIcon} source={leftChevron} />

          </Pressable>
          <Text style={[styles.header, styles.textWhite]}>{user.username}</Text>
          <Pressable onPress={() => props.navigation.navigate('Setting')}>
            <Image style={styles.settingicon} source={Setting} />
          </Pressable>
        </View>
        <View><Text style={styles.header1}>User Description</Text>
          <Text style={styles.header2}>Location</Text>
        </View>
        <Pressable onPress={() => playAudio()}>
          <Image style={styles.image2} source={MIC} />

        </Pressable>
      </View>
      <View style={styles.scrollParent}>
        {
          user.groups && user.groups.map((item, index) => {
            let details;
            getItemDetails(item).then(res => {
              console.log('res', res);
              details = res;
            });
            return (
              <Pressable onPress={() => props.navigation.navigate('GroupList', { item: details })}>
                <View style={styles.group}>
                  <Image style={[styles.icon, styles.groupImage]} source={UserProfile} />
                  <View style={styles.groupInfo}>
                    <View style={styles.groupNameContainer}>
                      <Text style={styles.groupNameText}>{item}</Text>
                    </View>
                    <Text style={styles.groupDescription}>Group Description</Text>
                  </View>
                  <View style={styles.fullWidth}>
                  </View>
                </View>
              </Pressable>
            )
          }
          )}
      </View>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  body: {
    padding: 20,
    position: 'relative',
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  image: {
    width: 50,
    height: 50,
    //marginLeft:60,
    marginLeft: 5,
    marginRight: 10,
  },
  image1: {
    width: 70,
    height: 70,
    //marginLeft:60,
    marginLeft: 145,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 0,

  },
  image2: {
    width: 70,
    height: 80,
    //marginLeft:60,
    marginLeft: 145,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 0,

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
  },
  header: {
    fontSize: 25,
    color: '#969FAA',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //height: 20,
    height: 40,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 1,
    paddingLeft: 0,
    marginTop: 0,
    alignContent: 'center'
  },
  header1: {
    color: '#969FAA',
    marginLeft: 110,
    marginRight: 1,
    padding: 20,
    height: 20,
  },
  header2: {
    color: '#969FAA',
    marginLeft: 140,
    marginRight: 1,
    padding: 15,
    height: 20,
    marginTop: 0,
    marginBottom: 0,
  },
  backButton: {
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
  },
  backIcon: {
    backgroundColor: '#969FAA',
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 50,
    marginLeft: 20,
    marginTop: 0,
    //flexDirection:'row'
    justifyContent: 'space-around',
    alignContent: 'space-between',

  },
  settingicon: {
    backgroundColor: '#969FAA',
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 15,
    marginLeft: 40,
    marginTop: 0,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  icon: {
    width: 25,
    height: 25,
  },
  group: {
    backgroundColor: '#EFF2F7',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    borderColor: '#8492A6',
    borderRadius: 10,
  },
  groupName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  },
  groupNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupImage: {
    marginTop: 10,
    marginLeft: 10,
    width: 35,
    height: 35,
  },
  groupIcon: {
    flexDirection: 'row-reverse',
    marginTop: 10,
    marginRight: 10,
  },
  fullWidth: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  groupNameContainer: {

    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  UserNameContainer: {
    backgroundColor: '#000000',
    display: 'flex',
    flex: 0.8,
    flexDirection: 'column',
    borderRadius: 15,
  },
  scrollParent: {
    flex: 1,
    height: '50%',
  }, textWhite: {
    color: '#FFFFFF',
  }
})

export default UserProfile