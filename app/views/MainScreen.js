import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import moment from 'moment'


import colors from '../global/colors';
import {InitSetting, GetDb, LastEnd, LastStart,PeriodLength, CycleLength,OvulationStart, HandleDbProblem} from '../db/dbController';

let inPeriod = false;
let loaded = false;

const MainScreen= ({navigation})=> {
    const [items, setItems] = React.useState(null);
    let number = GetRemindingDays();
    let db = GetDb();

   let a =  InitSetting();

   React.useEffect(()=>{
    db.transaction((tx)=>{
        tx.executeSql("select * from sett",//sql
            [], //sql args
            (_, { rows:{ _array} }) =>{//callback function
                _array.map(({id, value})=> 
                {
                    switch(id)
                    {
                        case "cycle_length":
                            cycle_length = value; CycleLength(+value); break;
                        case "ovulation_start":
                            ovulation_start = value; OvulationStart(+value);break;
                        case "period_length":
                            period_length = value;PeriodLength(+value); break;
                    }
                });
            },
            error=>{//error function
                HandleDbProblem(error);
            },
  
        );  
        tx.executeSql("select date from day where p_start = 1 order by date desc limit 1",
        [],
        (tr, { rows:{ _array} })=> { _array.map(({date})=>{LastStart(date)})},
        (tr, error)=>{HandleDbProblem(error);}
        );    
        tx.executeSql("select date from day where p_end = 1 order by date desc limit 1",
        [],
        (tr, {rows:{_array}})=> {_array.map(({date})=>{LastEnd(date)})},
        (tr, error)=>{HandleDbProblem(error);}
        );      
    },          
    (error) => HandleDbProblem(error),
    ()=>{loaded = true;setItems();})
});

    let today = new moment().startOf("month");
    return (
        <View style={styles.background}>
            <View style={styles.textBox}>
                <Text style={styles.smallText} adjustsFontSizeToFit={true}>E??te</Text>
                <Text style={[styles.bigText,{color:inPeriod?colors.red:colors.grey}]} adjustsFontSizeToFit={true}>{number}</Text>
                <Text style={styles.smallText} adjustsFontSizeToFit={true}>{GetDayText(number)}</Text>
            </View>
            <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.buttonS} onPress={()=>navigation.navigate("Settings")}>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/gear.png")}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonS} onPress={()=>navigation.push("Calendar", {navigation:navigation, date:today})}>
                    <Image  style={styles.imageS} source={require("../assets/cal.png")}  resizeMode="contain"/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function GetDayText (number)
{
    switch(number)
    {
        case 1: return "de??";
        case 2:
        case 3:
        case 4: return "dni";
        default: return "dn??";
    }
}
function GetRemindingDays()
{
    let d= "?";
    if (moment(LastStart(),"yyyy-MM-DD" , false) < moment())
    {
        if (moment(LastStart(),"yyyy-MM-DD" , false)< moment(LastEnd(),"yyyy-MM-DD" , false) && LastEnd() != "2999-01-01")
        {
            d = moment(LastStart(),'yyyy-MM-DD', false).add(CycleLength(), "day").diff(moment(), "days") ;
            inPeriod = false;
        }
        else
        {
            d = moment(LastStart(), 'yyyy-MM-DD', false).add(PeriodLength(), "day").diff(moment(), "day");
            inPeriod = true;
        }
    }
    return d;
} 

const styles = StyleSheet.create({
background:{
    flex:1,
    backgroundColor:colors.background,
    color:colors.grey,
    borderWidth:1,
    borderColor:colors.grey
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
buttonS:{
    width:"50%",
    height:"100%",
    backgroundColor:colors.background,
    borderWidth:1,
    borderColor:colors.grey,
    alignItems:"center"
},
imageS:{
    width:60,
    height:60,
    margin:5
}
})

export default MainScreen;