import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Home from './Home';
import Create from './Create';





const Stack = createNativeStackNavigator();
const NavigationCon = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                <Stack.Screen name='Create' component={Create} options={{ headerShown: false }} />
               

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NavigationCon

const styles = StyleSheet.create({})