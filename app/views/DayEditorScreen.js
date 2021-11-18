/*import React from 'react';
import {StyleSheet, View, Text,CheckBox, Pressable, Image, TextInput} from 'react-native'


import colors from '../global/colors';
import {GetDb} from '../db/dbController';

let p_start = false;
let p_end = false;

function DayEditorScreen({navigation, date, period, sex, pill, note }) {

    console.log("CalendarElement start");
    return (
        <View style={styles.background}>
             <View style={styles.titleBox}>
                <Text style={styles.titleText}>date</Text>
            </View>
            <View style={styles.itemBox}>
                <Text style={styles.descriptionText}>Moje dni</Text>
                <CheckBox style={styles.checkbox} value ={period} onValueChanged={(value)=>{p_start = !period && value.nativeEvent.value ? true:false;p_end = period && !value.nativeEvent.value ? true:false }}/>
            </View>
            <View style={styles.itemBox}>
                <Text style={styles.descriptionText}>Tabletka</Text>
                <CheckBox style={styles.checkbox} value ={pill} onValueChanged={(value)=>{pill =  value.nativeEvent.value}}/>
            </View>
            <View style={styles.itemBox}>
                <Text style={styles.descriptionText}>Sex</Text>
                <CheckBox style={styles.checkbox} value ={sex} onValueChanged={(value)=>{sex = value.nativeEvent.value}}/>
            </View>
            <View style={styles.noteBox}>
                <TextInput style={styles.textInput} value={note} onSubmitEditing={(value)=>note = value.nativeEvent.text}/>
            </View>
            <View style={styles.buttonBox}>
                <Pressable style={styles.buttonS}  onPress={()=>{
                    cycle_length = 0;
                    navigation.navigate("Home");
                    }
                }>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/cancel.png")} />
                </Pressable>
                <Pressable style={styles.buttonS} onPress={()=>{SaveData(db, date, period, sex, pill, note,navigation)}}>
                    <Image  style={styles.imageS} source={require("../assets/ok.png")}  resizeMode="contain"/>
                </Pressable>
            </View>
        </View>
      
    );
}


function SaveData(db, date, period, sex, pill, note,navigation)
{    console.log("SaveData" + navigation);
    let db = GetDb();
    db.transaction(
        (tx) => {
            tx.executeSql(
            "insert or replace into  day (date,p_start, p_end,sex, pill, note	) values {?,?,?,?,?,?}  ",
            [
                date, p_start, p_end, sex?1:0, pill?1:0,note
            ],
            (txObj, resultSet) => {console.log('db data res ------>',  resultSet.dbnotes);navigation.navigate("Calendar");},
            (txObj, error) => {console.log('Error insert', error);HandleDbProblem(error)}
            );                         
        }
        )
}

function HandleDbProblem(ex)
{
    console.log("HandleDbProblem - without call");
    Alert.alert("Niečo sa pokazilo", ""+ex, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
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
titleBox:{
    height:"20%",
    margin=1
},
titleText:{
    fontSize:25,
    color:colors.grey,
    fontWeight:"bold"
},
itemBox:{
    height:"15%",
    flexDirection:"row",
    marginLeft:2,
    marginRight:2
},
descriptionText:{
    width:"75%",
    height:"100%", 
    fontSize:30,
    color:colors.grey
},
checkbox:{
    width:"25%",
    height:"100%", 
    alignSelf:"flex-end"
},    
noteBox:{
    height:"50%"
},    
textInput:{
    fontSize:25,
    color:"black"
},
buttonBox:{
    height:70,
    flexDirection:"row",
    margin:-1
},
buttonS:{
    width:"50%",
    height:"100%",
    backgroundColor:colors.background,
    borderWidth:1,
    borderColor:colors.grey,
    alignItems:"center"
},
imageS:{
    width:50,
    height:50,
    margin:7
}
})

export default DayEditorScreen;
*/