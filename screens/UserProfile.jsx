import { View, Text, StyleSheet, Button, Pressable, Image, TextInput } from 'react-native'
import React from 'react'
import UserProfileImg from '../assets/images/UserImage.png'
//import svgImage from '../assets/images/house.svg'
import MIC from '../assets/images/Mic.png'
import Setting from '../assets/images/Raster.png'
import leftChevron from '../assets/images/leftChevron.png'
import UserProfileI from '../assets/images/UserProfile.png'

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
    },
]

const UserProfile = (props) => {
    return (
      <View style={styles.body}>
         <View style={styles.UserNameContainer}>
      {/*<Image style={styles.image1} source={UserProfileImg} />*/}
      <Pressable onPress={() => props.navigation.navigate('UserImage')}>
        <Image style={styles.image1} source={UserProfileImg} />
        
        </Pressable>
        <View style={styles.header}>
          
        <Pressable onPress={() => props.navigation.navigate('Home')}>
        <Image style={styles.backIcon} source={leftChevron} />
        
        </Pressable>
        <Text style={styles.header}>UserName</Text> 
        <Pressable onPress={() => props.navigation.navigate('Setting')}>
            <Image style={styles.settingicon} source={Setting} />
        </Pressable>
      
        
          
          
          
        </View>
        <View><Text style={styles.header1}>User Description</Text>
        <Text style={styles.header2}>Location</Text>
        </View>
       {/* <Image style={styles.image2} source={MIC} />*/}
        <Pressable onPress={() => props.navigation.navigate('Play Audio')}>
        <Image style={styles.image2} source={MIC} />
        
        </Pressable>
        </View>
        <View style={styles.scrollParent}>
        {
          arr.map((item, index) => {
            return (
              <Pressable onPress={() => props.navigation.navigate('Group')}>
                <View style={styles.group}>
                  <Image style={[styles.icon, styles.groupImage]} source={UserProfileI} />
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
          padding: 20,
          position: 'relative',
          flex: 1,
          marginTop: 50,
          paddingHorizontal:10,
        paddingVertical:20,
        },
        image: {
          width: 50,
          height: 50,
          //marginLeft:60,
          marginLeft:5,
          marginRight:10,
        },
        image1: {
          width: 70,
          height: 70,
          //marginLeft:60,
          marginLeft:145,
          marginRight:5,
          marginTop:10,
          marginBottom:0,
          
        },
        image2: {
          width: 70,
          height: 80,
          //marginLeft:60,
          marginLeft:145,
          marginRight:5,
          marginTop:10,
          marginBottom:0,
          
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
          marginLeft:0,
          marginRight:0,
          marginBottom:1,
          paddingLeft:0,
          marginTop:0,
          alignContent:'center'
        },
        header1: {
          color: '#969FAA',
            marginLeft:110,
            marginRight:1,
            padding:20,
            height: 20,
        },
        header2: {
          color: '#969FAA',
            marginLeft:140,
            marginRight:1,
            padding:15,
            height: 20,
            marginTop:0,
            marginBottom:0,
        },
          backButton: {
            marginTop: 20,
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 20,
            display: 'flex',
        },
        backIcon: {
          backgroundColor:'#969FAA',
            width: 30,
            height: 30,
            borderRadius:5,
            marginRight:50,
            marginLeft:20,
            marginTop:0,
            //flexDirection:'row'
            justifyContent:'space-around',
            alignContent:'space-between',
            
        },
        settingicon: {
          backgroundColor:'#969FAA',
            width: 30,
            height: 30,
            borderRadius:5,
            marginRight:15,
            marginLeft:40,
            marginTop:0,
            marginBottom:0,
            flexDirection:'row',
            justifyContent:'space-around'
        },
        icon: {
          width: 25,
          height: 25,
        }, 
        group: {
          backgroundColor:'#C0CCDA',
          marginTop: 20,
          display: 'flex',
          flexDirection: 'row',
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#969FAA',
          borderRadius:10,
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
          marginLeft:10,
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
        UserNameContainer: {
          backgroundColor:'#000000',
          display: 'flex',
          flex: 0.8,
          flexDirection:'column',
          borderRadius:15,
        }, 
        scrollParent: {
          flex: 1,
          height: '50%',
        }
      })    

export default UserProfile