import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Keyboard,HandleDbProblem} from 'react-native';
import moment from 'moment';

import colors from '../global/colors';
import {GetDb, LastEnd, LastStart} from '../db/dbController';
import CheckBoxElement from './CheckBoxElement';


let date = moment();

function DayEditorScreen({route,navigation }) {

    let db = GetDb();  
    date = route.params.date;

    React.useEffect(()=>{


        const keyboadrDidShowListener = Keyboard.addListener('keyboardDidShow', ()=>{setKeyboardVisible(true)});
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', ()=>{setKeyboardVisible(false)});

        return ()=>{
            keyboadrDidShowListener.remove();
            keyboardDidHideListener.remove();
        }

       },[] );


    let [sex_value, onChangeSex] = React.useState(route.params.sex);
    let [pill_value, onChangePill] = React.useState(route.params.pill);
    let [period_value, onChangePeriod] = React.useState(route.params.period);
    let [note_value, onChangeNote] = React.useState(route.params.note);
       
    let [isKeyBoardVisible,setKeyboardVisible ] = React.useState(false);

    return (
        <View style={styles.background}>
            <View style={styles.background}>
             <View style={styles.titleBox}>
                <Text style={styles.titleText} adjustsFontSizeToFit={true} >{date.format("DD.MM")}</Text>
            </View>
            { !isKeyBoardVisible &&
                <View style={styles.itemsListBox}>
                    <View style={styles.itemBox}>
                        <Text style={styles.descriptionText} adjustsFontSizeToFit={true}>Moje dni</Text>
                        <CheckBoxElement  checked={period_value} onChange={onChangePeriod}/>
                    </View>
                    <View style={styles.itemBox}>
                        <Text style={styles.descriptionText} adjustsFontSizeToFit={true}>Tabletka</Text>
                        <CheckBoxElement  checked={pill_value} onChange={onChangePill}/>
                    </View>
                    <View style={styles.itemBox}>
                        <Text style={styles.descriptionText} adjustsFontSizeToFit={true}>Sex</Text>
                        <CheckBoxElement  checked={sex_value} onChange={onChangeSex}/>
                    </View>
                </View>
            }
            <View style={styles.noteBox}>
                <TextInput style={styles.textInput} textAlignVertical="top"  multiline={true} value={note_value} onChangeText={onChangeNote}/>
            </View>
            </View>
         
            { !isKeyBoardVisible &&
                <View style={styles.buttonBox}>
                    <TouchableOpacity style={styles.buttonS}  onPress={()=>{
                        cycle_length = 0;
                        navigation.push("Calendar", {navigation:navigation, date:date.clone().startOf("month")});
                        }
                    }>
                        <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/cancel.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonS} onPress={()=>{SaveData(db, date, route.params.period,period_value, sex_value, pill_value, note_value,navigation)}}>
                        <Image  style={styles.imageS} source={require("../assets/ok.png")}  resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            }
        </View>
      
    );
}


function SaveData(db, date, period_original, period_new, sex, pill, note,navigation)
{  

    db.transaction(
        (tx) => {
            tx.executeSql(
            "insert or replace into  day (date,p_start, p_end,sex, pill, note	) values(?,?,?,?,?,?)  ",
            [
                date.format("yyyy-MM-DD"), !period_original && period_new ? 1:0, period_original && !period_new ? 1:0 , sex?1:0, pill?1:0,note
            ],
            (txObj, resultSet) => {
               if (!period_original && period_new && (date > moment( LastStart(),"yyyy-MM-DD")))
                {
                    LastStart(date.format("yyyy-MM-DD"));
                }
                if (period_original && !period_new && (date > moment(LastEnd(),"yyyy-MM-DD"))) 
                    LastEnd(date.format("yyyy-MM-DD"));navigation.push("Calendar", {navigation:navigation, date:date});
                },
            (txObj, error) => {HandleDbProblem(error);}
            );                         
        }
    );
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
