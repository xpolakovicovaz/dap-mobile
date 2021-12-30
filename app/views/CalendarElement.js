import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native'


import colors from '../global/colors';
import {InitSetting} from '../db/dbController';

/*
  <Pressable style={styles.background} borderColor={period?colors.red:colors.grey} onPress={()=>navigation.navigate("Settings")}>
            <View style={styles.textBox}>
                <Text style={styles.smallText}>date.day</Text>
            </View>
           <Image  style={styles.imageS}  bottom="13%" left="13%"  source={require("../assets/pill.png")}  resizeMode="contain"/> 
            <Image  style={styles.imageS} bottom="13%" right="13%" source={require("../assets/note.png")}  resizeMode="contain"/>
            <Image  style={styles.imageS} top="13%" left="13%" source={require("../assets/heart.png")}  resizeMode="contain"/>
        </Pressable>
*/

function CalendarElement( date, period, sex, pill, note, active) {
// borderColor={period?colors.red:colors.grey}
console.log("CalendarElement "+date.format("DD-MM-yyyy"));

/*return (
    <View style={styles.background} >
            <View style={styles.textBox}>
                <Text style={styles.smallText}>{date.date()}</Text>
            </View>
            <Image  style={styles.imageS}  bottom="0%" left="0%"  source={require("../assets/pill.png")}  resizeMode="contain"/> 
            <Image  style={styles.imageS} bottom="0%" right="0%" source={require("../assets/note.png")}  resizeMode="contain"/>
            <Image  style={styles.imageS} top="0%" left="0%" source={require("../assets/heart.png")}  resizeMode="contain"/>
    
          </View>
);
*/

    console.log("CalendarElement start");
    if (date == null)
        return (
            <View style={styles.background}></View>
        )
    else if  (active)
    
        return (
            <View style={styles.background} >
                <View style={styles.textBox}>
                    <Text style={styles.smallText}>{date.date()}</Text>
                </View>
                {pill && <Image  style={styles.imageS }  bottom="0%" left="0%" source={require("../assets/pill.png")}  resizeMode="contain"/>} 
                <Image  style={styles.imageS} bottom="0%" right="0%" source={require("../assets/note.png")}  resizeMode="contain"/>
                {!sex && <Image  style={styles.imageS} top="0%" left="0%" source={require("../assets/heart.png")}  resizeMode="contain"/>}
            </View>
        );
    else
        return (
            <View style={[styles.background, {borderColor:colors.grey_inactivee}] } >
                <View style={styles.textBox}>
                    <Text style={[styles.smallText, {color:colors.grey_inactivee}]}>{date.date()}</Text>
                </View>
            </View>
        );
}

const styles = StyleSheet.create({
background:{
    flex:1,
    backgroundColor:colors.background,
    color:colors.grey,
    borderWidth:1,
    borderColor:colors.grey,
    margin:1,
    width:"100%",
    height:"100%"
},
textBox:{
    flex:1,
    width:"100%",
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center"
},
smallText:{
    fontSize:35,
    color:colors.grey
},    
bigText:{
    fontSize:80,
    color:colors.grey
},    
buttonBox:{
    height:40,
    flexDirection:"row",
    margin:-1
},
imageS:{
    width:"40%",
    height:"40%",
    margin:2, 
    position:"absolute"
}
})

export default CalendarElement;
