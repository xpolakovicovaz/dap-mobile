import React from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, Image, Alert } from 'react-native';


import colors from '../global/colors';
import {GetDb, CycleLength, PeriodLength,OvulationStart} from '../db/dbController';


let cycle_length = 0;
let ovulation_length = 0;
let ovulation_start = 0;
let period_length = 0;
let saves = 0;
const SettingsScreen = ({navigation}) => {
//function SettingsScreen (props){
    const [items, setItems] = React.useState(null);
    let db = GetDb();
    console.log(db)
/*
    //if (period_length == 0)
    { 
        //console.log("loading db again ")

                React.useEffect(()=>{
                    db.transaction((tx)=>{
                        tx.executeSql("select * from sett",//sql
                            [], //sql args
                            (_, { rows:{ _array} }) =>{//callback function
                             //   console.log('db data res ------>', _array)
                                _array.map(({id, value})=> 
                                {
                                    switch(id)
                                    {
                                        case "cycle_length":
                                            cycle_length = value; break;
                                        case "ovulation_start":
                                            ovulation_start = value; break;
                                        case "period_length":
                                            period_length = value; break;
                                    }
                                });
                                console.log("cycle_length " + cycle_length);
                                console.log("ovulation_length " + ovulation_length);
                                console.log("ovulation_start " + ovulation_start);
                                console.log("period_length " + period_length);
                                setItems();
                            },
                            error=>{//error function
                                console.log("ERROR - openDatabase - "+ error);
                                HandleDbProblem(error);
                            }
                        );            
                    })
                });
                console.log("loading - end")
    }
  */  
/*    
  if (items === null ) {
    return null;
  }
  */
    return (
        <View style={styles.background}>
            <View style={styles.itemsListBox}>
                <View style={styles.itemBox}>
                    <Text style={styles.description}>Dĺžka cyklu</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric" onSubmitEditing={(value)=>cycle_length= value.nativeEvent.text}>{CycleLength()}</TextInput>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.description}>Trvanie</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric" onSubmitEditing={(value)=>period_length= value.nativeEvent.text}>{PeriodLength()}</TextInput>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.description}>Ovulácia</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric" onSubmitEditing={(value)=>ovulation_start= value.nativeEvent.text}>{OvulationStart()}</TextInput>
                </View>
            </View>
            <View style={styles.buttonBox}>
                <Pressable style={styles.buttonS}  onPress={()=>{
                    cycle_length = 0;
                    navigation.navigate("Home");
                    }
                }>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/cancel.png")} />
                </Pressable>
                <Pressable style={styles.buttonS} onPress={()=>{SaveSettings(db,navigation)}}>
                    <Image  style={styles.imageS} source={require("../assets/ok.png")}  resizeMode="contain"/>
                </Pressable>
            </View>
        </View>
    );
}

function SaveSettings(db,navigation)
{
  
   SaveSetting(db,cycle_length,"cycle_length",navigation );
   SaveSetting(db,ovulation_start,"ovulation_start" ,navigation);
   SaveSetting(db,period_length,"period_length",navigation );
   
   

}

function SaveSetting(db, value,id, navigation)
{ //   console.log("navigation" + navigation);
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
            (txObj, error) => {console.log('Error insert', error); saves = 0;HandleDbProblem(error)}
            );                         
        }
        )
}

function IncreaseSave(navigation)
{
    //console.log("IncreaseSave - without call");
    //console.log("navigation" + navigation);
saves++;
if (saves == 3 )
    {
        saves = 0;
        navigation.navigate("Home");
    }
}

function HandleDbProblem(ex)
{
    //console.log("HandleDbProblem - without call");
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