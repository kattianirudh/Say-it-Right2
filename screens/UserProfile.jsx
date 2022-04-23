import { View, Text, StyleSheet, Button, Pressable, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import UserProfileImg from '../assets/images/UserProfile.png'
import svgImage from '../assets/images/house.svg'
import Mic from '../assets/images/Mic.svg'
import Setting from '../assets/images/Setting.svg'

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

let UserProfile = (props) => {
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.header}>UserName</Text>
                <Pressable onPress={() => props.navigation.navigate('Home')}>
                    <Image style={styles.image} source={svgImage} />
                </Pressable>
                <Pressable onPress={() => props.navigation.navigate('Setting')}>
                    <Image style={styles.image} source={Setting} />
                </Pressable>
            </View>
            <View><TextInput style={styles.desc} placeholder="Username Description" />
                {/* <Image source={Mic} style={[styles.icon, styles.image]} /> */}
            </View>
            <ScrollView>
                <View style={styles.scrollParent}>
                    {
                        arr.map((item, index) => {
                            return (
                                <Pressable onPress={() => props.navigation.navigate('Group')}>
                                    <View style={styles.group}>
                                        <Image style={[styles.icon, styles.groupImage]} source={UserProfileImg} />
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
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 30,
        position: 'relative',
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
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
        flexDirection: 'row-reverse',
        marginTop: 10,
        marginRight: 10,
    },
    fullWidth: {
        flexDirection: 'row-reverse',
    },
    groupNameContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    scrollParent: {
        height: '50%',
    }
})


export default UserProfile