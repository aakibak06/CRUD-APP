import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Modal, TextInput, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EditScreen from './EditScreen';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";


const Home = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState('')
    const [getError, setGetError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(true);


    const getApiData = async () => {
        try {
            const url = 'https://6465aca49c09d77a62f11095.mockapi.io/curd-api';
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
            setIsLoaded(false)
        }
        catch (error) {
            if (error) {
                setGetError(true)
            }
        }
    }

    useEffect(() => {
        getApiData()
    }, [isFocused])

    const deleteUsers = async (id) => {
        try {
            const url = 'https://6465aca49c09d77a62f11095.mockapi.io/curd-api';
            const response = await fetch(`${url}/${id}`, {
                method: 'delete',

            });
            getApiData()

        }
        catch (error) {
            console.log(error)
        }


    }

    const onUpdateBtnClick = (item) => {
        setModalVisible(true);
        setSelectedUser(item)


    }
    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name)
            setPhone(selectedUser.phone.toString())
            setEmail(selectedUser.email)
        }
    }, [selectedUser])


    const updateUsersData = async () => {
        try {
            const id = selectedUser.id;
            const url = 'https://6465aca49c09d77a62f11095.mockapi.io/curd-api';
            const response = await fetch(`${url}/${id}`, {
                method: 'put',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email })


            })
            setModalVisible(false);
            getApiData()
        }
        catch (error) {
            console.log(error)

        }
    }




    return (
        <View style={{ height: responsiveHeight(100), width: responsiveWidth(100), paddingTop: responsiveHeight(3), backgroundColor: '#dff9fb' }}>
            <StatusBar backgroundColor={'#dff9fb'} barStyle={'dark-content'} />
            {/* {getError ? <Text>this is error</Text> : <Text>heelo</Text>} */}
            {/* <Text style={{ fontSize: responsiveFontSize(4), marginLeft: 10, textAlign: 'center', color: 'red' }}>CRUD APPLICATION</Text>
            <View style={{ width: responsiveWidth(95), backgroundColor: 'grey', height: 2, alignSelf: 'center' }}>

            </View> */}
            <View style={{ width: responsiveWidth(95), alignItems: 'flex-end', }}>
                <TouchableOpacity onPress={() => navigation.navigate('Create')} style={{
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: responsiveHeight(5),
                    width: responsiveWidth(20),
                    borderRadius: 10,

                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: responsiveFontSize(2.4)
                    }}>Create</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: responsiveHeight(3), marginBottom: responsiveHeight(2) }}>
                <Text style={{ fontSize: responsiveFontSize(2.4), marginLeft: responsiveWidth(4), color: '#d63031' }}>Name</Text>
                <Text style={{ fontSize: responsiveFontSize(2.4), marginLeft: responsiveWidth(7), color: '#d63031' }}>Phone</Text>
                <Text style={{ fontSize: responsiveFontSize(2.4), marginLeft: responsiveWidth(15), color: '#d63031' }}>Email</Text>
            </View>
            {
                isLoaded ? (<View style={{ marginTop: 250 }}><ActivityIndicator color={'green'} size={100} /></View>)
                    : (<View>


                        <ScrollView>
                            {data.length ?
                                data.map((item, index) => <View key={index} style={styles.listContainer}>
                                    <Text style={{ flex: 0.4, fontSize: responsiveFontSize(1.8), padding: 5, color: '#636e72' }}>{item.name}</Text>
                                    <Text style={{ flex: 0.9, fontSize: responsiveFontSize(1.8), padding: 5, color: '#636e72' }}>{item.phone}</Text>
                                    <Text style={{ flex: 1, fontSize: responsiveFontSize(1.8), padding: 5, color: '#636e72' }}>{item.email}</Text>
                                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => onUpdateBtnClick(item)} >
                                        <Text><FontAwesome name='edit' color={'green'} size={25} style={{ padding: 5 }} /></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ marginRight: 5 }} onPress={() => deleteUsers(item.id)}>
                                        <Text><AntDesign name='delete' color={'red'} size={25} style={{ padding: 5 }} /></Text>
                                    </TouchableOpacity>

                                </View>)
                                : null
                            }

                        </ScrollView>
                    </View>)
            }

            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
            >

                <View style={styles.container}>
                    <View>
                        <Text style={styles.heading}>Update Users Details</Text>
                        <TextInput style={[styles.inputField, styles.secondCss]} value={name}
                            onChangeText={(actualVal) => setName(actualVal)}
                            placeholder='edit name'
                            placeholderTextColor={'#636e72'}
                        />
                        <TextInput style={styles.inputField} value={phone}
                            onChangeText={(actualVal) => setPhone(actualVal)}
                            placeholder='edit phone'
                            placeholderTextColor={'#636e72'}

                        />

                        <TextInput style={styles.inputField} value={email}
                            onChangeText={(actualVal) => setEmail(actualVal)}
                            placeholder='edit email'
                            placeholderTextColor={'#636e72'}
                        />
                    </View>


                    <View style={styles.updateBtn}><Button title='Update' onPress={() => updateUsersData()} /></View>
                    <View style={styles.closeBtn}><Button title='close' onPress={() => setModalVisible(false)} /></View>

                </View>

            </Modal>
        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.6,
        marginBottom: responsiveHeight(2),
        // height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        // borderRadius: 10,
        borderColor: '#636e72'

    },
    container: {
        backgroundColor: '#dff9fb',

        width: 400,
        height: 400,
        marginTop: 250,
        marginLeft: 16,
        borderRadius: 20
    },
    closeBtn: {
        marginTop: 10,

    },
    updateBtn: {
        marginTop: 30,


    },
    inputField: {
        borderWidth: 0.7,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 10,
        fontSize: responsiveFontSize(2),
        color: '#2d3436'
    },
    secondCss: {
        marginTop: 20
    },
    heading: {
        textAlign: 'center',
        fontSize: responsiveFontSize(3),
        marginTop: 10,
        color: 'black'
    }
})