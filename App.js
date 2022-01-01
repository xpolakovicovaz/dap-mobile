import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './app/views/MainScreen';
import SettingsScreen from './app/views/SettingsScreen';
import CalendarScreen from './app/views/CalendarScreen';
import DayEditorScreen from './app/views/DayEditorScreen';
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
      <Stackq.Screen name="Calendar" component={CalendarScreen}/>
      <Stackq.Screen name="DayEditor" component={DayEditorScreen}/>
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
