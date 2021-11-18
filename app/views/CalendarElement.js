/*import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native'


import colors from '../global/colors';
import {InitSetting} from '../db/dbController';


function CalendarElement({navigation, date, period, sex, pill, note, }) {

    console.log("CalendarElement start");
    return (
        <Pressable style={styles.background} borderColor={period?colors.red:colors.grey} onPress={()=>navigation.navigate("Settings")}>
            <View style={styles.textBox}>
                <Text style={styles.smallText}>date.day</Text>
            </View>
            {pill? <Image  style={styles.imageS}  bottom="13%" left="13%"  source={require("../assets/pill.png")}  resizeMode="contain"/> : <View/>}
            <Image  style={styles.imageS} bottom="13%" right="13%" source={require("../assets/note.png")}  resizeMode="contain"/>
            <Image  style={styles.imageS} top="13%" left="13%" source={require("../assets/heart.png")}  resizeMode="contain"/>
        </Pressable>
    );
}

const styles = StyleSheet.create({
background:{
    flex:1,
    backgroundColor:colors.background,
    color:colors.grey,
    borderWidth:1,
    borderColor:colors.grey,
    margin=1
},
textBox:{
    flex:1,
    width:"100%",
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center"
},
smallText:{
    fontSize:40,
    color:colors.grey
},    
bigText:{
    fontSize:80,
    color:colors.grey
},    
buttonBox:{
    height:70,
    flexDirection:"row",
    margin:-1
},
imageS:{
    width:"25%",
    height:"25%",
    margin:2, 
    position:"absolute"
}
})

export default CalendarElement;
*/