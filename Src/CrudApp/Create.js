import { Button, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Create = ({ navigation }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const saveDataInApi = async () => {
        try {
            const url = 'https://6465aca49c09d77a62f11095.mockapi.io/curd-api';
            const response = await fetch(url, {
                method: 'Post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, phone, email })
            });
            const result = await response.json();
            navigation.goBack();

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View style={{ backgroundColor: "#48dbfb", height: responsiveHeight(100), width: responsiveWidth(100) }}>
            <StatusBar backgroundColor={"#48dbfb"} />
            <Text style={{ fontSize: responsiveFontSize(3.5), textAlign: 'center', paddingTop: responsiveHeight(3), color: 'red' }}>Create Information</Text>

            <View style={{ height: 2, width: responsiveWidth(90), backgroundColor: 'red', alignSelf: 'center' }}>

            </View>
            <View>
                <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontSize: 20, fontSize: responsiveFontSize(2.5,), color: 'black' }}>Name</Text>
                    <TextInput placeholder='enter your name' autoCapitalize='none' value={name} onChangeText={(actualVal) => setName(actualVal)} style={styles.inputStyle}
                        placeholderTextColor={'#7f8fa6'}
                    />
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontSize: 20, fontSize: responsiveFontSize(2.5,), color: 'black' }}>Phone</Text>
                    <TextInput placeholder='enter your name' autoCapitalize='none' value={phone} onChangeText={(actualVal) => setPhone(actualVal)} style={styles.inputStyle} keyboardType='number-pad'

                        placeholderTextColor={'#7f8fa6'}
                    />
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.5,), color: 'black' }}>Email</Text>
                    <TextInput placeholder='enter your name' autoCapitalize='none' value={email} onChangeText={(actualVal) => setEmail(actualVal)} style={styles.inputStyle}

                        placeholderTextColor={'#7f8fa6'}
                    />
                </View>

                <View style={{ marginHorizontal: 20, marginTop: 40 }}><Button title='Submit' onPress={saveDataInApi} /></View>
            </View>
        </View>
    )
}

export default Create

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: responsiveFontSize(2),
        borderRadius: 15

    }
})