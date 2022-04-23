import { View, Text, StyleSheet, Button, Pressable, Image } from 'react-native'
import React from 'react'
import svgImage from '../assets/images/SIR.svg'
import Mic from '../assets/images/Mic.svg'
// import { SvgUri } from 'react-native-svg';
// import RightChev from '../assets/images/rightChev.png'

const SplashScreen = (props) => {
    return (
        <View style={styles.body}>
            {/* <Image source={{uri: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg'}} style={[styles.icon, styles.image]} /> */}
            <Image source={require('../assets/images/splash.png')} style={[styles.icon, styles.image]} />
            <Text style={styles.subtitle}>Saying the name can never go wrong again</Text>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => props.navigation.navigate('Home')}>
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
      height: 200,
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