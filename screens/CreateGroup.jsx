import { View, Text, Pressable, Image, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserProfile from '../assets/images/UserProfile.png'
import searchIcon from '../assets/images/searchIcon.png'
import app from '../firebase';
import { doc, setDoc, collection, getDocs, addDoc, getFirestore } from "firebase/firestore"; 
import { DocumentPicker, ImagePicker } from 'expo';
import { getDocumentAsync } from 'expo-document-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getApp } from "firebase/app";


const db = getFirestore(app);
const storage = getStorage(app);  

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
const CreateGroup = (props) => {

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupMembers, setGroupMembers] = useState([]);
    const [data, setData] = useState([]);
    const [fileResponse, setFileResponse] = useState([]);
    const [schedule, setSchedule] = useState('');
    const [image, setImage] = useState('');

    useEffect( async () => {
        let arr = [];
        const querySnapshot = await getDocs(collection(db, "users"), { profile: 'User' });
        querySnapshot.forEach((doc) => {
            let obj = doc.data();
            obj['id'] = doc.id;
            arr.push(obj);
        });
        setData(arr);
    }, [])

    const handleDocumentSelection = async () => {
        const file = await getDocumentAsync({
            copyToCacheDirectory: false
        });

        console.log('file',file);
        const fileClip = await fetch(file.uri);
        const fileBytes = await fileClip.blob();
        let storageRef = ref(storage, file.name);
        console.log(file);
        try {
            uploadBytes(storageRef, fileBytes).then(() => {
                console.log('Uploaded');
                setSchedule(file.name);
              }).catch(err => {
                console.log('Failed to upload', err);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const finishCreateGroup = async () => {
        await setDoc(db, 'groups', groupName, {
            name: groupName,
            description: groupDescription,
            members: groupMembers,
        }).then(() => {
            props.navigation.navigate('Home');
        });
    }

    const addmember = (member) => {
        let isInGroup = false;
        let groupMembersTemp = [...groupMembers];
        if(!groupMembersTemp.includes(member.email)) {
            groupMembersTemp.push(member.email);
            setGroupMembers(groupMembersTemp);
        } else { 
            groupMembersTemp = groupMembersTemp.filter(m => {
                if(m != member.email) {
                    return m;
                }
            })
            setGroupMembers(groupMembersTemp);
        }
    }

    const uploadSchedule = async () => {
        handleDocumentSelection();
    }

    const uploadImage = async () => {
        const file = await getDocumentAsync({
            copyToCacheDirectory: false,
            type: ['image/png', 'image/jpg', 'image/jpeg']
        });

        const fileClip = await fetch(file.uri);
        const fileBytes = await fileClip.blob();
        let storageRef = ref(storage, file.name);
        console.log(file);
        try {
            uploadBytes(storageRef, fileBytes).then(() => {
                console.log('Uploaded');
                setImage(file.name);
              }).catch(err => {
                console.log('Failed to upload', err);
            });
        } catch (error) {
            console.log(error);
        }
    }

    const submitDetails = async () => {
        await setDoc(doc(db, 'groupList ', groupName), {
            name: groupName,
            description: groupDescription,
            members: groupMembers,
            schedule: schedule,
            image: image,
        }).then(() => {
            props.navigation.navigate('Home');
        });
    }

    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.header}>Create Group</Text>
                <Pressable onPress={() => props.navigation.navigate('UserProfile')}>
                    <Image style={styles.image} source={UserProfile} />
                </Pressable>
            </View>
            <View>
                <TextInput style={styles.search} placeholder="Enter Group Name" onChangeText={t => setGroupName(t)} />
            </View>
            <View><TextInput style={styles.desc} placeholder="Group Description" onChangeText={t => setGroupDescription(t)} /></View>

            <View style={styles.buttonsParent}>
                <View style={styles.buttonContainerSc}>
                    <Pressable style={styles.scheduleButton} onPress={() => uploadSchedule()}>
                        <Text style={styles.buttonText}>Upload Schedule</Text>
                    </Pressable>
                </View>
                <View style={styles.buttonContainerIg}>
                    <Pressable style={styles.uploadButton} onPress={() => uploadImage()}>
                        <Text style={[styles.buttonText, styles.whiteText]}>Upload Image</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.searchBoxParent}>
                <TextInput style={styles.searchBoxText} placeholder="Search Members" />
                <Image style={[styles.icon, styles.searchIcon]} source={searchIcon} />
            </View>
            <Text style={styles.members}>Add Members</Text>
            <ScrollView style={styles.scrollParent}>
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
                                            <Pressable style={styles.addButton} onPress={() => addmember(item)}>
                                                {/* <Text style={styles.buttonText}>Add</Text> */}
                                                {/* If user is not inside groupMembers then print */}
                                                {
                                                    groupMembers.includes(item.email) ?
                                                        <Text style={styles.buttonText}>Added</Text>
                                                        :
                                                        <Text style={styles.buttonText}>Add</Text>
                                                }
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <View style={styles.buttonContainer_fs}>
                <Pressable style={styles.button1} onPress={() => submitDetails()}>
                    <Text style={styles.buttonText}>Finish</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 30,
        position: 'relative',
        flex: 1,
        marginTop: 20,
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
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
    },
    desc: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 5,
        height: 100,
    },
    searchIcon: {
        position: 'absolute',
        marginTop: 10,
        marginLeft: 5,
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'flex-end',
        display: 'flex',
        alignSelf: 'flex-end',
    },
    buttonContainerIg: {
        marginTop: 5,
        marginBottom: 10,
        maxWidth: '48%',
    },
    buttonContainer_fs: {
        // flex: 1,
        // marginTop: 150,
    },
    buttonContainerSc: {
        marginTop: 5,
        marginBottom: 1,
    },
    icon: {
        width: 25,
        height: 25,
    }, group: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, groupName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    groupInfo: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 10,
    }, groupNameText: {
        fontSize: 20,
    },


    buttonText: {
        color: '#ffffff',
        fontSize: 20,
        paddingLeft: 3,
        paddingRight: 3,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    fullWidth: {
        // flex: 1,
    }, admin: {
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 1,
        paddingBottom: 1,
        borderWidth: 1,
        borderColor: '#8492A6',
        borderRadius: 4,
        marginLeft: 10,
        color: '#47525E',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, groupNameContainer: {
        display: 'flex',
        // flex: 1,
        flexDirection: 'row',
    },
    button: {
        width: '100%',
        backgroundColor: '#000000',
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',

    },
    scrollParent: {
        // flex: 1,
        height: '100%',
    }, buttonsParent: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }, scheduleButton: {
        backgroundColor: '#000000',
        padding: 8,
        borderRadius: 5,
    }, uploadButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 7,
        borderColor: '#000000',
        borderRadius: 5,
    }, whiteText: {
        color: 'black',
    }, searchBoxParent: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 10,
        marginTop: 15,
        position: 'relative',
    }, searchBoxText: {
        marginLeft: 25,
    },
    addButton: {
        backgroundColor: '#000000',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
        color: '#47525E',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }, members: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
        color: '#47525E',
    },
})

export default CreateGroup;