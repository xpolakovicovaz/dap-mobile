import React from 'react';
import {StyleSheet, View, Text, Pressable, Image, Dimensions} from 'react-native';
import moment from 'moment'


import colors from '../global/colors';
import {InitSetting, GetDb, LastEnd, LastStart,PeriodLength, CycleLength,OvulationStart} from '../db/dbController';

let inPeriod = false;
let loaded = false;

const MainScreen= ({navigation})=> {
    const [items, setItems] = React.useState(null);
    console.log("main screen - open ");
    let number = GetRemindingDays();
    let db = GetDb();
 //   if (!loaded)
{
   let a =  InitSetting();

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
                            cycle_length = value; CycleLength(value); break;
                        case "ovulation_start":
                            ovulation_start = value; OvulationStart(value);break;
                        case "period_length":
                            period_length = value;PeriodLength(value); break;
                    }
                });
                console.log("cycle_length " + cycle_length);
                console.log("ovulation_start " + ovulation_start);
                console.log("period_length " + period_length);
                //setItems();
            },
            error=>{//error function
                console.log("ERROR - openDatabase kkk - "+ error);
                //HandleDbProblem(error);
            },
  
        );  
        tx.executeSql("select date from day where p_start = 1 order by date desc limit 1",
        [],
        (tr, { rows:{ _array} })=> { _array.map(({date})=>{console.log("success - last_start - " +date);LastStart(date)})},
        (tr, error)=>{console.log("ERROR - last_start - "+ error);}
        );    
        tx.executeSql("select date from day where p_end = 1 order by date desc limit 1",
        [],
        (tr, {rows:{_array}})=> {_array.map(({date})=>{console.log("success - last end - " + date);LastEnd(date)})},
        (tr, error)=>{console.log("ERROR - last_start - "+ error);}
        );      
    },          
    (error) => HandleDbProblem(error),
    ()=>{loaded = true;setItems();})
});
console.log("loading - end")
}

    console.log("MainScreen start");
    return (
        <View style={styles.background}>
            <View style={styles.textBox}>
                <Text style={styles.smallText}>Ešte</Text>
                <Text style={[styles.bigText,{color:inPeriod?colors.red:colors.grey}]}>{number}</Text>
                <Text style={styles.smallText}>{GetDayText(number)}</Text>
            </View>
            <View style={styles.buttonBox}>
                <Pressable style={styles.buttonS} onPress={()=>navigation.navigate("Settings")}>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/gear.png")}/>
                </Pressable>
                <Pressable style={styles.buttonS}>
                    <Image  style={styles.imageS} source={require("../assets/cal.png")}  resizeMode="contain"/>
                </Pressable>
            </View>
        </View>
    );
}

function GetDayText (number)
{
    switch(number)
    {
        case 1: return "deň";
        case 2:
        case 3:
        case 4: return "dni";
        default: return "dní";
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
            console.log(" CycleLength je " +CycleLength());
            inPeriod = false;
        }
        else
        {
            d = moment(LastStart(), 'yyyy-MM-DD', false).add(PeriodLength(), "day").diff(moment(), "day");
            console.log(" PeriodLength je " +PeriodLength());
            console.log(" expected end j " +moment(LastStart(), 'yyyy-MM-DD', false).add(PeriodLength(), "day").format("yyyy-MM-DD"));
            console.log(" now je " +moment().format("yyyy-MM-DD"));
            inPeriod = true;
        }
    }
    console.log("last start je " +LastStart());
    console.log("last end je " + LastEnd());
    console.log("d jeeeeeeeee " + d);
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