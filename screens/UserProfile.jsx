import { View, Text, StyleSheet, Button, Pressable, Image, TextInput } from 'react-native'
import React from 'react'
//import UserProfileImg from '../assets/images/UserProfile.svg'
//import svgImage from '../assets/images/house.svg'
//import MIC from '../assets/images/SpeakerIcon'
import Setting from '../assets/images/Raster.png'
import leftChevron from '../assets/images/leftChevron.png'

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
    },
]

const UserProfile = (props) => {
    return (
      <View style={styles.body}>
        <View style={styles.header}>
        <Pressable onPress={() => props.navigation.navigate('Home')}>
        <Image style={styles.backIcon} source={leftChevron} />
        </Pressable>
          <Text style={styles.header}>UserName</Text> 
          
          <Pressable onPress={() => props.navigation.navigate('Setting')}>
            <Image style={styles.image} source={Setting} />
          </Pressable>
        </View>
        <View><Text style={styles.header1}>User Description</Text>
        </View>
        <View style={styles.scrollParent}>
        {
          arr.map((item, index) => {
            return (
              <Pressable onPress={() => props.navigation.navigate('Group')}>
                <View style={styles.group}>
                  <Image style={[styles.icon, styles.groupImage]} source={UserProfile} />
                  <View style={styles.groupInfo}>
                    <View style={styles.groupNameContainer}>
                      <Text style={styles.groupNameText}>Group Name</Text>
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
    )
    } 
    const styles = StyleSheet.create({
        body: {
          padding: 30,
          position: 'relative',
          flex: 1,
          marginTop: 40,
          paddingHorizontal:20,
        },
        image: {
          width: 50,
          height: 50,
          //marginLeft:60,
          marginLeft:5,
          marginRight:10,
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
          //height: 20,
          height: 40,
          marginLeft:20,
          marginBottom: 20,
          marginTop:10,
        },
        header1: {
            marginLeft:85,
            padding:30,
            height: 90,
        },
          backButton: {
            marginTop: 20,
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 20,
            display: 'flex',
        },
        backIcon: {
            width: 20,
            height: 30,
            marginRight:10,
            marginLeft:0,
            marginTop:10,
        },
        icon: {
          width: 25,
          height: 25,
        }, 
        group: {
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#969FAA',
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
          width: 35,
          height: 35,
        },
        groupIcon: {
          flexDirection:'row-reverse',
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
        scrollParent: {
          flex: 1,
          height: '50%',
        }
      })    

export default UserProfile