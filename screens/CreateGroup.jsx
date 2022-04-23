import { View, Text, Pressable, Image, StyleSheet, TextInput, ScrollView, FlatList } from 'react-native'
import React from 'react'
import UserProfile from '../assets/images/UserProfile.png'
import searchIcon from '../assets/images/searchIcon.png'

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
    return (
        <View style={styles.body}>
            <View style={styles.header}>
                <Text style={styles.header}>Create Group</Text>
                <Pressable onPress={() => props.navigation.navigate('UserProfile')}>
                    <Image style={styles.image} source={UserProfile} />
                </Pressable>
            </View>
            <View>
                <TextInput style={styles.search} placeholder="Enter Group Name" />
            </View>
            <View><TextInput style={styles.desc} placeholder="Group Description" /></View>

            <View style={styles.buttonsParent}>
                <View style={styles.buttonContainerSc}>
                    <Pressable style={styles.scheduleButton} onPress={() => props.navigation.navigate('UploadSc')}>
                        <Text style={styles.buttonText}>Upload Schedule</Text>
                    </Pressable>
                </View>
                <View style={styles.buttonContainerIg}>
                    <Pressable style={styles.uploadButton} onPress={() => props.navigation.navigate('UploadImg')}>
                        <Text style={[styles.buttonText, styles.whiteText]}>Upload Image</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.searchBoxParent}>
                <TextInput style={styles.searchBoxText} placeholder="Search Members" />
                <Image style={[styles.icon, styles.searchIcon]} source={searchIcon} />
            </View>
            <Text style={styles.members}>Add Members</Text>
            <ScrollView>
            <View style={styles.scrollParent}>
                {
                    arr.map((item, index) => {
                        return (
                            <View style={styles.group}>
                                <View style={styles.groupInfo}>
                                    <View style={styles.groupNameContainer}>
                                        <Text style={styles.groupNameText}>Member Name</Text>
                                    </View>
                                </View>
                                <View style={styles.fullWidth}>
                                    <View style={styles.buttonContainer}>
                                        <Pressable style={styles.addButton} onPress={() => props.navigation.navigate('Add')}>
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
            <View style={styles.buttonContainer_fs}>
                <Pressable style={styles.button1} onPress={() => props.navigation.navigate('Save')}>
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
        height: '50%',
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