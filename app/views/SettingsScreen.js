import React from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';


import colors from '../global/colors';
import {GetDb, CycleLength, PeriodLength,OvulationStart,HandleDbProblem} from '../db/dbController';

let saves = 0;

const SettingsScreen = ({navigation}) => {

    let [cycle_length, onChangeCycleLength] = React.useState(CycleLength());
    let [period_length, onChangePeriodLength] = React.useState(PeriodLength());
    let [ovulation_start, onChangeOvulationStart] = React.useState(OvulationStart());
  
    let db = GetDb();

    return (
        <View style={styles.background}>
            <View style={styles.itemsListBox}>
                <View style={styles.itemBox}>
                    <Text style={styles.description} adjustsFontSizeToFit={true}>Dĺžka cyklu</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric"  value={cycle_length.toString()} onChangeText={onChangeCycleLength}/>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.description} adjustsFontSizeToFit={true}>Trvanie</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric"  value={period_length.toString()} onChangeText={onChangePeriodLength}/>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.description} adjustsFontSizeToFit={true}>Ovulácia</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric"  value={ovulation_start.toString()} onChangeText={onChangeOvulationStart}/>
                </View>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.buttonS}  onPress={()=>{
                    cycle_length = 0;
                    navigation.push("Home");
                    }
                }>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/cancel.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonS} onPress={()=>{SaveSettings(db,navigation, cycle_length,period_length,ovulation_start)}}>
                    <Image  style={styles.imageS} source={require("../assets/ok.png")}  resizeMode="contain"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function SaveSettings(db,navigation, cycle_length,period_length,ovulation_start)
{
  
   SaveSetting(db,cycle_length,"cycle_length",navigation );
   SaveSetting(db,ovulation_start,"ovulation_start" ,navigation);
   SaveSetting(db,period_length,"period_length",navigation );
   
   

}

function SaveSetting(db, value,id, navigation)
{    
    db.transaction(
        (tx) => {
            tx.executeSql(
            "update sett set value =? where id = ?",
            [
                value,id
            ],
            (txObj, resultSet) => {
                IncreaseSave(navigation);
                switch(id)
                   {
                       case "cycle_length":
                           CycleLength(value); break;
                       case "ovulation_start":
                           OvulationStart(value); break;
                       case "period_length":
                           PeriodLength(value); break;
                   }
               },
            (txObj, error) => { saves = 0;HandleDbProblem(error)}
            );                         
        }
        )
}

function IncreaseSave(navigation)
{
saves++;
if (saves == 3 )
    {
        saves = 0;
        navigation.push("Home",  {navigation:navigation});
    }
}



const styles = StyleSheet.create({
    background:{
        flex:1,     
        backgroundColor:colors.background,
        color:colors.grey,
        borderWidth:1,
        borderColor:colors.grey
    },
    itemBox:{
        flexDirection:"row",
        width:"100%",
        height:70,       
        alignContent:"space-between",
        alignItems:"flex-end",
        marginLeft:"5%",
        marginRight:"5%"
    },
    itemsListBox:{
        flex:1,
        width:"100%",     
        justifyContent:"center"

    },
    description:{
        fontSize:30,
        color:colors.grey,
        width:"70%"
    },
    userValue:{
        width:"20%",
        height:"100%", 
           fontSize:30,
           color:colors.grey,
        alignSelf:"flex-end",
        borderBottomWidth:1,
        borderBottomColor:colors.grey,
        textAlign:"center"
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

export default SettingsScreen;