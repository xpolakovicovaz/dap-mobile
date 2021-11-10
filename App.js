import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './app/views/MainScreen';
import SettingsScreen from './app/views/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { openDatabase } from 'expo-sqlite';

const Stackq = createNativeStackNavigator();
const db = openDatabase("app/db/dbdap.db");
function App() {
  return (
    <NavigationContainer>
    <Stackq.Navigator initialRouteName="Home">
      <Stackq.Screen name="Home" component={MainScreen}/>
      <Stackq.Screen name="Settings" component={SettingsScreen}/>
    </Stackq.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;
