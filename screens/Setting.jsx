import { View, Text, Pressable, Image, StyleSheet, TextInput, ScrollView, FlatList} from 'react-native'
import React from 'react'
import UserProfile from '../assets/images/UserProfile.png'
import leftChevron from '../assets/images/leftChevron.png'
let arr = [
    {
      id: 1,
      name: 'Random',
      description: 'Random description',
    },
    {
        id: 1,
        name: 'Random',
        description: 'Random description',
      },
      {
        id: 1,
        name: 'Random',
        description: 'Random description',
      },
      {
        id: 1,
        name: 'Random',
        description: 'Random description',
      }
]


const Setting = (props) => {
    return (
      <View style={styles.body}>
        <View style={styles.header}>
        <Pressable onPress={() => props.navigation.navigate('Home')}>
        <Image style={styles.backIcon} source={leftChevron} />
        {/*<Text style={styles.backButtonText}>Home</Text>*/}  
        </Pressable>  
          <Text style={styles.header}>Settings</Text> 
          
          <Pressable onPress={() => props.navigation.navigate('UserProfile')}>
            <Image style={styles.image} source={UserProfile} />
          </Pressable>
        </View>
        <View><Text style={styles.header1}>UserName</Text>
        </View>
        <View>
          <TextInput style={styles.search} placeholder="UserName" />
          <Pressable style={styles.button2} onPress={() => props.navigation.navigate('Edit')}>
          <Text style={styles.buttonText1}>Edit</Text>
          </Pressable>
        </View>
        <View><Text style={styles.header1}>Password</Text>
        </View>
        <View>
          <TextInput style={styles.search} placeholder="Password" />
          <Pressable style={styles.button2} onPress={() => props.navigation.navigate('Edit')}>
          <Text style={styles.buttonText1}>Edit</Text>
          </Pressable>
        </View>
        <View><Text style={styles.header1}>Address</Text>
        </View>
        <View>
          <TextInput style={styles.search} placeholder="Address" />
          <Pressable style={styles.button2} onPress={() => props.navigation.navigate('Edit')}>
          <Text style={styles.buttonText1}>Edit</Text>
          </Pressable>
        </View>
        <View><Text style={styles.header1}>Dictation</Text>
        </View>
        <View style={styles.buttonContainer_fs}>
        <Pressable style={styles.button1} onPress={() => props.navigation.navigate('Play Audio')}>
          <Text style={styles.buttonText}>Play Audio</Text>
          </Pressable>
          <Pressable style={styles.button3} onPress={() => props.navigation.navigate('Rerecord')}>
          <Text style={styles.buttonText1}>Rerecord</Text>
          </Pressable>
        </View>
        <View style={styles.scrollParent}>
        </View>
        <View style={styles.buttonContainer_fs1}>
          <Pressable style={styles.button1} onPress={() => props.navigation.navigate('Save')}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
          </View>
        </View>
    )
    } 
    const styles = StyleSheet.create({
        body: {
          padding: 90,
          position: 'relative',
          flex: 1,
          marginTop: 0,
          //backgroundColor:'#5d6473',
          paddingHorizontal:20,
          //marginTop:0,
          //marginBottom:0,
        },
        houseimage:{
         width: 50,
         height: 50,
         marginRight:50,
        },
        backButton: {
          marginTop: 20,
          paddingLeft: 20,
          paddingTop: 20,
          paddingBottom: 20,
          display: 'flex',
      },
      backIcon: {
          width: 18,
          height: 30,
          marginRight:10,
          marginLeft:0,
          marginTop:10,
      },
        image: {
          width: 50,
          height: 50,
          marginLeft:5,
          marginRight:10,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          //marginRight:20,
        },
        header: {
          fontSize: 30,
          color: '#000000',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 40,
          marginLeft:25,
          marginBottom: 20,
        },
        header1: {
            marginRight:10,
            padding:10,
            height: 40,
            fontWeight: 'bold',
        },
        header2: {
          marginLeft:330,
          padding:5,
          height: 10,
          fontSize: 20,
          color: '#5A6978',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
      },
      header3: {
        marginLeft:285,
        padding:5,
        height: 10,
        fontSize: 20,
        color: '#5A6978',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
        search: {
          borderWidth: 2,
          borderColor: '#000000',
          borderRadius: 3,
          padding: 5,
          paddingLeft: 35,
          marginTop: 10,
          backgroundColor:'#EFF2F7',
          height:30,
          fontWeight: 'bold',
        },
        icon: {
          width: 25,
          height: 25,
        }, 
        buttonContainer_fs: {
          flex: 1,
          justifyContent: 'flex-end',
          marginTop: 130,
          marginBottom: 10,
          marginRight:30,
        },
        buttonContainer_fs1: {
          flex: 1,
          justifyContent: 'flex-end',
          marginTop: 80,
          marginBottom: 10,
          marginRight:30,
        },
        button1: {
          width: '100%',
          backgroundColor: '#000000',
          borderRadius: 10,
          marginTop: 50,
          marginLeft:20,
          height: 50,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',    
        },
        button2: {
          width: '40%',
          backgroundColor: '#000000',
          borderRadius: 10,
          marginTop:10,
          marginLeft: 190,
          height: 25,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',    
        },
        button3: {
          width: '35%',
          backgroundColor: '#000000',
          borderRadius: 10,
          marginTop:10,
          marginLeft: 190,
          height: 70,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',    
        },
        buttonText: {
          color: '#ffffff',
          fontSize: 20,
          //fontWeight: 'bold',
        },
        buttonText1: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
    },
        scrollParent: {
            flex: 1,
            height: '50%',
          }
        })    
        export default Setting