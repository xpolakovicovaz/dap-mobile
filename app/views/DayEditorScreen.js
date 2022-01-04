import React from 'react';
import {StyleSheet, View, Text, Pressable, Image, TextInput} from 'react-native';
import moment from 'moment';

import colors from '../global/colors';
import {GetDb} from '../db/dbController';
import CheckBoxElement from './CheckBoxElement';

let p_start = false;
let p_end = false;
let date = moment();
let period = false;
let sex = false;
let pill =false;
let note = "";

function DayEditorScreen({route,navigation }) {

    React.useEffect(()=>{
        date = route.params.date;
        period = route.params.period;
        sex = route.params.sex;
        pill = route.params.pill;
        note = route.params.note;
    
       });

    let [sex_value, onChangeSex] = React.useState(sex);
    let [pill_value, onChangePill] = React.useState(pill);
    let [period_value, onChangePeriod] = React.useState(period);
    let [note_value, onChangeNote] = React.useState(note);


 

    //sex_value = sex;
  
    // onChange={(value)=>{p_start = !period && value.nativeEvent.value ? true:false;p_end = period && !value.nativeEvent.value ? true:false }}/>
    return (
        <View style={styles.background}>
            <View style={styles.background}>
             <View style={styles.titleBox}>
                <Text style={styles.titleText}>{date.format("DD.MM")}</Text>
            </View>
            <View style={styles.itemsListBox}>
                <View style={styles.itemBox}>
                    <Text style={styles.descriptionText}>Moje dni</Text>
                    <CheckBoxElement  checked={period_value} onChange={onChangePeriod}/>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.descriptionText}>Tabletka</Text>
                    <CheckBoxElement  checked={pill_value} onChange={onChangePill}/>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.descriptionText}>Sex</Text>
                    <CheckBoxElement  checked={sex_value} onChange={onChangeSex}/>
                </View>
            </View>
            <View style={styles.noteBox}>
                <TextInput style={styles.textInput} value={note_value} onChange={onChangeNote}/>
            </View>
            </View>
            <View style={styles.buttonBox}>
                <Pressable style={styles.buttonS}  onPress={()=>{
                    cycle_length = 0;
                    navigation.goBack();
                    }
                }>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/cancel.png")} />
                </Pressable>
                <Pressable style={styles.buttonS} onPress={()=>{SaveData( date, period, sex, pill, note,navigation)}}>
                    <Image  style={styles.imageS} source={require("../assets/ok.png")}  resizeMode="contain"/>
                </Pressable>
            </View>
        </View>
      
    );
}


function SaveData( date, period, sex, pill, note,navigation)
{    console.log("SaveData" + navigation);
    let db = GetDb();
    db.transaction(
        (tx) => {
            tx.executeSql(
            "insert or replace into  day (date,p_start, p_end,sex, pill, note	) values {?,?,?,?,?,?}  ",
            [
                date, p_start, p_end, sex?1:0, pill?1:0,note
            ],
            (txObj, resultSet) => {console.log('db data res ------>',  resultSet.dbnotes);navigation.goBack();},
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
        margin:1
    },
    titleBox:{
        height:"20%",
        margin:1,
        alignItems:"center",
        justifyContent:"center"
    },
    titleText:{
        fontSize:25,
        color:colors.grey,
        fontWeight:"bold"
    },
    itemBox:{
        flexDirection:"row",
        width:"100%",
        height:"33%",       
        alignContent:"space-between",
        alignItems:"flex-end",
        marginLeft:"5%",
        marginRight:"5%"
    },
    itemsListBox:{
        height:"30%",
        width:"100%",     
        justifyContent:"center"

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
        width:"90%",
         height:"45%",
         marginLeft:"5%",
         marginRight:"5%",
         marginBottom:"5%"
    },    
    textInput:{
        backgroundColor:"white",
        width:"100%",
        height:"100%", 
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
