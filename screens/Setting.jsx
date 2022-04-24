import { View, Text, Pressable, Image, StyleSheet, TextInput, ScrollView, FlatList} from 'react-native'
import React from 'react'
import UserProfile from '../assets/images/UserProfile.svg'
import svgImage from '../assets/images/house.svg'

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
            <Image style={styles.houseimage} source={svgImage} />  
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
          <TextInput style={styles.search} placeholder="******" />
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
        <View>
          <TextInput style={styles.header} placeholder="Play Audio" />
          <Pressable style={styles.button2} onPress={() => props.navigation.navigate('Rerecord')}>
          <Text style={styles.buttonText1}>Rerecord</Text>
          </Pressable>
        </View>
        <View style={styles.scrollParent}>
        </View>
        <View style={styles.buttonContainer_fs}>
          <Pressable style={styles.button1} onPress={() => props.navigation.navigate('Save')}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
          </View>
        </View>
    )
    } 
    const styles = StyleSheet.create({
        body: {
          padding: 50,
          position: 'relative',
        },
        houseimage:{
         width: 50,
         height: 50,
         marginRight:50,
        },
        image: {
          width: 50,
          height: 50,
          marginLeft:60,
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
          height: 90,
        },
        header1: {
            marginRight:100,
            padding:5,
            height: 20,
        },
        header2: {
          marginLeft:330,
          padding:5,
          height: 10,
          fontSize: 20,
          color: '#5A6978',
          fontWeight: 'Underline',
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
        fontWeight: 'underline',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
        search: {
          borderWidth: 1,
          borderColor: '#000000',
          borderRadius: 3,
          padding: 10,
          paddingLeft: 35,
          marginTop: 10,
        },
        icon: {
          width: 25,
          height: 25,
        }, 
        buttonContainer_fs: {
          flex: 1,
          justifyContent: 'flex-end',
          marginTop: 150,
          marginBottom: 10,
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
        button2: {
          width: '25%',
          backgroundColor: '#000000',
          borderRadius: 5,
          marginTop:10,
          marginLeft: 300,
          height: 20,
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