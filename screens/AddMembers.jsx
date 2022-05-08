import { View, Text, Pressable, Image, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserProfile from '../assets/images/UserProfile.png'
import searchIcon from '../assets/images/searchIcon.png'
import leftChevron from '../assets/images/leftChevron.png'
import { collection, getDocs, getFirestore, updateDoc, doc } from "firebase/firestore";
import app from '../firebase';

const db = getFirestore(app);


let arr = [
  {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }, {
    id: 1,
    name: 'Random',
    description: 'Random description',
  }
]

const AddMembers = (props) => {

  const addButton = async (val) => {
    console.log('val: ', val)
    const docRef = doc(db, "users", val.id);
    await updateDoc(docRef, {
      groups: [...val.groups, props.route.params.item.name]
    })
    getData();
  }

  const getData = async () => {
    let arr = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      let obj = doc.data();
      obj['id'] = doc.id;
      if(obj.profile == 'User' && (!obj.groups.includes(props.route.params.item.name)))
        arr.push(obj);
    });
    console.log(arr);
    setData(arr);
  }

  const [data, setData] = useState([]);
  useEffect(async () => {
    getData();
  }, [])

  return (
    <View style={styles.body}>
      <View style={styles.backButton}>
        <Pressable style={styles.homeButton} onPress={() => props.navigation.navigate('Home')}>
          <Image style={styles.backIcon} source={leftChevron} />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
      <View style={styles.header}>
        <Text style={styles.header}>Add Members</Text>
        <Pressable onPress={() => props.navigation.navigate('UserProfile')}>
          <Image style={styles.image} source={UserProfile} />
        </Pressable>
      </View>
      <View>
        <TextInput style={styles.search} placeholder="Search Members" />
        <Image style={[styles.icon, styles.searchIcon]} source={searchIcon} />
      </View>
      <ScrollView>
        <View style={styles.scrollParent}>
          {
            data.map((item, index) => {
              return (
                <View style={styles.group}>
                  <View style={styles.groupInfo}>
                    <View style={styles.groupNameContainer}>
                      <Text style={styles.groupNameText}>{item.username}</Text>
                    </View>
                  </View>
                  <View style={styles.fullWidth}>
                    <View style={styles.buttonContainer}>
                      <Pressable style={styles.button} onPress={() => addButton(item)}>
                        <Text style={styles.buttonText}>Add</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

              )
            })
          }
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button1} onPress={() => props.navigation.navigate('Home')}>
          <Text style={styles.buttonTextFinish}>Finish</Text>
        </Pressable>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  body: {
    padding: 20,
    position: 'relative',
    flex: 1,
    marginTop: 25,
  },
  image: {
    width: 50,
    height: 50,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'fixed',
  },
  header: {
    fontSize: 30,
    color: '#000000',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  search: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    padding: 10,
    paddingLeft: 35,
    marginTop: 20,
  },
  searchIcon: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 7,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginTop: 5,
    marginBottom: 10,
  },
  icon: {
    width: 25,
    height: 25,
  }, group: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',

  }, groupName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupInfo: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
  }, groupNameText: {
    fontSize: 20,
    display: 'flex',
    textAlignVertical: 'center',
  },


  buttonText: {
    color: '#47525E',
    fontSize: 15,
  },
  fullWidth: {
    flexDirection: 'row-reverse',
  }, admin: {
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 1,
    paddingBottom: 1,
    borderRadius: 4,
    marginLeft: 10,
    color: '#47525E',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }, groupNameContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    // backgroundColor: '#000000',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    alignItems: 'flex-end',
    borderColor: '#000000',
    borderWidth: 1,
    // marginLeft: 600,
    height: 35,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',

  },
  scrollParent: {
    height: '50%',
    marginTop: 20,
  },
  buttonTextFinish: {
    color: '#ffffff',
    fontSize: 20,
  },
  ackButton: {
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
  },
  backIcon: {
    width: 20,
    height: 16,
  },
  homeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#47525E',
    fontWeight: 'bold',
    marginLeft: 5,
    marginBottom: 5,
  }
})

export default AddMembers