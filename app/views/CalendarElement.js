import React from 'react';
import {StyleSheet, View, Text,  Image, MaskedViewComponent} from 'react-native'
import moment from 'moment'

import colors from '../global/colors';


function CalendarElement( date, period, ovulation, sex, pill, note, active, future_period) {

    let border_color =!active? colors.grey_inactivee :( period||future_period ? colors.red : ( ovulation ? colors.green : colors.grey));

    if (date == null)
        return (
            <View style={styles.background}></View>
        )
    else 
    {
        let back_color = date.format("yyyy-MM-DD")== new moment().format("yyyy-MM-DD")  ? colors.grey_important : colors.background ;
        return (
            <View style={[styles.background, {borderColor:border_color}, {backgroundColor:back_color}] } >
                <View style={styles.textBox}>
                    <Text style={[styles.smallText, {color:border_color}]} adjustsFontSizeToFit={true}>{date.date()}</Text>
                </View>
                {active && pill && <Image  style={styles.imageS }  bottom="0%" left="0%" source={require("../assets/pill.png")}  resizeMode="contain"/>} 
                {active && note.trim()!="" && <Image  style={styles.imageS} bottom="0%" right="0%" source={require("../assets/note.png")}  resizeMode="contain"/>}
                {active && sex && <Image  style={styles.imageS} top="0%" left="0%" source={require("../assets/heart.png")}  resizeMode="contain"/>}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
background:{
    flex:1,
    backgroundColor:colors.background,
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
