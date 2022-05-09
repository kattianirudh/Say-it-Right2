import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native'
import React from 'react'
import svgImage from '../assets/images/SIR.png'
import Mic from '../assets/images/Mic.png'
// import { SvgUri } from 'react-native-svg';
// import RightChev from '../assets/images/rightChev.png'

const SplashScreen = (props) => {
    return (
        <View style={styles.body}>
          <Text style={styles.title}>Say It Right</Text>
            <Image source={Mic} style={[styles.icon, styles.image]} />
            <Text style={styles.subtitle}>Saying the name can never go wrong again</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Text style={styles.text}>
                Don't have an account?
                <Pressable onPress={() => props.navigation.navigate('Register')}>
                    <Text style={[styles.text, styles.boldText]}> Register</Text>
                </Pressable>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
      padding: 20,
      flex: 1,
      marginTop: 50,
    },
    title: {
      fontSize: 40,
      textAlign: 'center',
      marginBottom: 20,
    },
    text: {
      color: '#000000',
      fontSize: 16,
      textAlign: 'center',

    },
    boldText: {
      fontWeight: 'bold',
      marginTop: 10,
    },
    appName: {
        fontSize: 30,
        color: '#000000',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        fontFamily: 'Chewy',
    },
    subtitle: {
        fontSize: 17,
        color: '#000000',
        textAlign: 'center', 
        marginTop: 30,
    },
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
    image: {
      width: 200,
      height: 250,
    },
    logo: {
      alignSelf: 'center',
    },
    icon: {
      alignSelf: 'center',
    },
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: 'auto',
      marginBottom: 30,
    },
})

export default SplashScreen