import { View, Text, StyleSheet, Button, Pressable, Image, TextInput, ScrollView, Linking } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import UserProfile from '../assets/images/UserProfile.png'
import leftChevron from '../assets/images/leftChevron.png'
import SpeakerIcon from '../assets/images/SpeakerIcon.png'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from '../firebase';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Audio } from 'expo-av';
import { AsyncStorage } from 'react-native';
import Loading from './Loading';


const storage = getStorage();
const db = getFirestore(app);

const GroupList = (props) => {
    const pathReference = ref(storage, 'record.m4a');

    const [members, setMembers] = useState([]);
    const [user, setUser] = useState([]);
    const AudioPlayer = useRef(new Audio.Sound());
    const [sound, setSound] = React.useState();
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        getMembers();
        AsyncStorage.getItem('user').then(async (user) => {
            let userDetails = JSON.parse(user);
            console.log('users bitchessss', JSON.parse(user));
            const querySnapshot = await getDocs(collection(db, "users"), { email: userDetails.email });
            querySnapshot.forEach((doc) => {
                let obj = doc.data();
                obj['id'] = doc.id;
                setUser(obj);
                console.log('user', obj);
            });
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


    const getMembers = async () => {
        setIsLoading(true);
        let arr = [];
        const members = await getDocs(collection(db, "users"));
        members.forEach(member => {
            let obj = member.data();
            console.log('users', obj, props.route.params.item.name);
            obj['id'] = member.id;
            if (!obj.groups.includes(props.route.params.item.name)) {
                arr.push(member.data());
            }
        });
        setMembers(arr);
        setIsLoading(false);
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
            setIsLoading(false);
            console.log(error);
            // If we get object not found error alert user that 'account doesn't exist'
            console.log('sda', error.code.includes('does not exist'));
            // See if the words 'does not exist' is there is the string error.code
            if (error.code.includes('does not exist')) {
                alert('Recording does not exist');
            }
        }
    }

    const playAudio = (item) => {
        setIsLoading(true);
        var userDetails;
        AsyncStorage.getItem('user').then(user => {
            userDetails = JSON.parse(user);
            const gsReference = ref(storage, `${item.email}.m4a`);
            getDownloadURL(gsReference).then(url => {
                playSound(url);
            }).catch(error => {
                console.log(error);
                if (error.code == 'storage/object-not-found') {
                    alert('Recording does not exist');
                }
                setIsLoading(false);
            });
            setUser(JSON.parse(user));
        }).catch(err => {
            console.log("crazy", err);
        });
    }

    const downloadSchedule = () => {
        let groupName = props.route.params.item.name;
        const gsReference = ref(storage, `${groupName}.pdf`);
        getDownloadURL(gsReference).then(url => {
            Linking.openURL(url);
        }).catch(error => {
            console.log(error);
            if (error.code == 'storage/object-not-found') {
                alert('Schedule does not exist');
            }
        });
    }

    return (
        <>
            {loading && <Loading />}
            <View style={styles.body}>
                <View style={styles.backButton}>
                    <Pressable style={styles.homeButton} onPress={() => props.navigation.navigate('Home')}>
                        <Image style={styles.backIcon} source={leftChevron} />
                        <Text style={styles.backButtonText}>Back</Text>
                    </Pressable>
                </View>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.header}>{props.route.params.item.name}</Text>
                        <Text style={styles.subtitle}>{props.route.params.item.description}</Text>
                    </View>
                    <Pressable onPress={() => downloadSchedule()}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Class Schedule</Text>
                        </View>
                    </Pressable>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.scrollParent}>
                        {
                            members.map((item, index) => {
                                return (
                                    <Pressable onPress={() => props.navigation.navigate('Setting')} key={index} >
                                        <View style={styles.group} key={index}>
                                            <Image style={[styles.icon, styles.groupImage]} source={UserProfile} />
                                            <View style={styles.groupInfo}>
                                                <View style={styles.groupNameContainer}>
                                                    <Text style={styles.groupNameText}>{item.username}</Text>
                                                    <Text style={styles.admin}>See More</Text>
                                                </View>
                                            </View>
                                            <Pressable onPress={() => playAudio(item)}>
                                                <View style={styles.fullWidth}>
                                                    <Image style={[styles.icon, styles.groupIcon, styles.speakerIcon]} source={SpeakerIcon} />
                                                </View>
                                            </Pressable>
                                        </View>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </ScrollView>
                {
                    user.profile != 'User' &&
                    <View style={styles.floatingButtonContainer}>
                        <Pressable style={styles.floatingButton} onPress={() => props.navigation.navigate('AddMembers', { item: props.route.params.item })}>
                            <Text style={styles.plusButton}>+</Text>
                            <Text style={styles.floatingButtonText}>Add Members</Text>
                        </Pressable>
                    </View>
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
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
    },
    header: {
        fontSize: 25,
        color: '#000000',
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 12,
        color: '#47525E',
        display: 'flex',
        flexDirection: 'row',
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 5,
        marginRight: 25,
        height: 32,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderWidth: 1,
    },
    headerText: {
        marginLeft: 20,
    }, buttonText: {
        color: '#47525E',
    },
    scrollParent: {
        height: '50%',
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
    },
    group: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#969FAA',
        width: '100%',
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
    },
    groupImage: {
        marginTop: 10,
        width: 35,
        height: 35,
    },
    groupIcon: {
        marginTop: 10,
        marginRight: 10,
        display: 'flex',
    },
    speakerIcon: {
        display: 'flex',
        marginLeft: 'auto',
        flexDirection: 'row-reverse',
    },
    admin: {
        textDecorationLine: 'underline',
    },
    icon: {
        width: 25,
        height: 25,
    },
    groupIcon: {
        marginTop: 10,
        marginRight: 10,
    },
    fullWidth: {
        flexDirection: 'row-reverse',
        width: '100%',
    },
    floatingButtonContainer: {
        marginTop: 40,
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    floatingButton: {
        borderRadius: 5,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13,
    },
    floatingButtonText: {
        color: '#FFFFFF',
    },
    floatingButtonIcon: {
        width: 25,
        height: 25,
        backgroundColor: 'white',
    },
    plusButton: {
        fontSize: 15,
        color: '#FFFFFF',
        marginRight: 5,
    },
});

export default GroupList