import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, FlatList, Alert} from 'react-native';
import moment from 'moment'

import colors from '../global/colors';
import { GetDb, LastEnd, LastStart,PeriodLength, CycleLength,OvulationStart, HandleDbProblem} from '../db/dbController';
import CalendarElement from './CalendarElement';

const screenWidth = Dimensions.get("window").width;
const boxsize = Math.floor((screenWidth-32)/7);
const marginwidth =Math.floor( (screenWidth-14-(boxsize*7))/2);
const labels = [
  {id:"Po", label:"Po"},
  {id:"Ut", label:"Ut"},
  {id:"St", label:"St"},
  {id:"Št", label:"Št"},
  {id:"Pt", label:"Pt"},
  {id:"So", label:"So"},
  {id:"Ne", label:"Ne"}
];
let day = moment();

let db = GetDb();

const CalendarScreen = ({ route, navigation }) => {

  day = route.params.date;
let [isFetching, setIsFetching] = React.useState(false);
let [DATA, setData] = React.useState(InitData());
let start = "";
let end = "";
let state = false;


  React.useEffect(()=>{

     db.transaction((tx)=>{
      
      //load data for month
       tx.executeSql("select date	,p_start, p_end	,sex, pill, note from day where strftime('%m', date) = ? and strftime('%Y', date) = ?",
       [day.format("MM"), day.format("yyyy")],
       (_, { rows:{ _array} }) =>{//callback function
           _array.map(({date	,p_start, p_end	,sex, pill, note})=> 
           {
               UpdateData(DATA, date	,p_start, p_end	,sex, pill, note);
              
           });

           //setItems();
       },
        (txObj, error) => {HandleDbProblem(error);}
        );//
        tx.executeSql("select date from day where p_start = 1 and date < ?  order by date desc limit 1 ",
        [day.format("yyyy-MM-DD") ],
        (tr, { rows:{ _array} })=> {  
          _array.map(({date })=>
          {
          start = date;
          })
        },
        (tr, error)=>{HandleDbProblem(error);}      
        );
        tx.executeSql("select date from day where p_end = 1 and date <= ?  order by date desc limit 1 ",
        [day.format("yyyy-MM-DD") ],
        (tr, { rows:{ _array} })=> {  
          _array.map(({date })=>
          {
          end = date;
          })
        },
        (tr, error)=>{HandleDbProblem(error);}      
        );
      },//
      (error) => {HandleDbProblem(error);},//
      ()=>{
          if (start == "")
        state = false;
       else if (end != "" &&  moment(start, "yyyy-MM-DD") <=  moment(end, "yyyy-MM-DD" ))
        state = false;
       else 
        state = ( moment(start, "yyyy-MM-DD").add(PeriodLength(),'days') > day ||  moment(start, "yyyy-MM-DD").add(PeriodLength(),'days') <  moment().startOf('day') &&  moment().startOf('day') == day.add(1,"months").add(-1,"days") ); 
        
       SetPeriod(DATA, state); 
       setData(DATA);setIsFetching(true);
      }      
       );
       
    });
   
return (
    <View style={styles.background}>
        <View style={styles.titleBox}>
                 <TouchableOpacity style={styles.buttonH}  onPress={()=>{
                    navigation.push("Calendar", {navigation:navigation, date:day.clone().add(-1,"months").startOf("month")});
                    }}>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/left.png")} />
                </TouchableOpacity>
                <Text style={styles.titleText} adjustsFontSizeToFit={true}>{GetMonthLabel(day)}</Text>
                <TouchableOpacity style={styles.buttonH} onPress={()=>{
                    navigation.push("Calendar", {navigation:navigation, date:day.clone().add(1,"months").startOf("month")});
                    }}>
                    <Image  style={styles.imageS} source={require("../assets/right.png")}  resizeMode="contain"/>
                </TouchableOpacity>
        </View>
        <View style={styles.gridBox}>
          <FlatList data={labels} renderItem={RenderLabel} numColumns={7} key={2} >
              
          </FlatList>
          <FlatList data={DATA} renderItem={(item)=>RenderItem(item, navigation)}  numColumns={7} key={8} extraData={isFetching}>
              
          </FlatList>
        </View>
        <View style={styles.buttonBox}>
                <TouchableOpacity style={styles.buttonS}  onPress={()=>{
                    navigation.navigate("Settings");
                    }}>
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/gear.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonS} onPress={()=>{
                    navigation.push("Home", {navigation:navigation});
                    }}>
                    <Image  style={styles.imageS} source={require("../assets/home.png")}  resizeMode="contain"/>
                </TouchableOpacity>
            </View>
    </View>
)
}

function OnCalendarElementPressed(navigation, item)
{
  if (item.date > new moment().startOf("day"))
    Alert.alert("Nedokážeš zmeniť budúcnosť");
  else
    navigation.push("DayEditor", {navigation:navigation, date:item.date, period:item.period, note:item.note, sex:item.sex, pill:item.pill});
}

function RenderItem({item},navigation)
{
  if(item.active)
    return (
      <TouchableOpacity style={styles.labelBox} onPress={()=>OnCalendarElementPressed(navigation, item)}>
      {CalendarElement(item.date, item.period,item.ovulation, item.sex, item.pill, item.note, item.active, item.future_period)}
      </TouchableOpacity>
    );
    else
    return (
      <View style={styles.labelBox}>
      {CalendarElement(item.date, item.period,item.ovulation, item.sex, item.pill, item.note, item.active, item.future_period)}
      </View>
    );
}

function RenderLabel({item})
{
    return (
      <View style={styles.labelBox}>
        <Text style={styles.labelText} adjustsFontSizeToFit={true}>{item.label}</Text>
      </View>
      );
}

function GetMonthLabel(date)
{
    let  a = "Julianár"
    switch (date.month())
    {
        case 0: {a= "Január";break};
        case 1: {a= "Február";break};
        case 2: {a= "Marec";break};
        case 3: {a= "Apríl";break};
        case 4: {a= "Máj ";break};
        case 5: {a= "Jún";break};
        case 6: {a= "Júl";break};
        case 7: {a= "August";break};
        case 8: {a= "September";break};
        case 9: {a= "Október";break};
        case 10:{a= "November";break};
        case 11:{a= "December";break};
    }
    a +=" "+ date.format("yyyy");
    return a;
}



function InitData() {

  let startDay = GetStartDay();
  
  let i = 0;
  var dates = [];
  for (i=0;i<42;i++)
  {
    dates.push({id:i, date: startDay,p_start:false, p_end:false	,sex:false, pill:false, note:"", period:false, ovulation:false, active: startDay.month() == day.month() && startDay.year() == day.year(), future_period:false  });
    startDay = startDay.clone().add(1,"days");
  }
  return dates;
};

function UpdateData(DATA, date	,p_start, p_end	,sex, pill, note)
{
  let a = DATA.find(x=>x.date.format("yyyy-MM-DD") == new moment(date,"yyyy-MM-DD").format("yyyy-MM-DD"));
  if (a != null)
  {
    a.sex = sex==1;
    a.pill = pill==1;
    a.note = note;
    a.p_end = p_end==1;
    a.p_start = p_start==1;

  }
}

function SetPeriod(DATA, period)
{
  let display_ovulation = false;
  if( moment(LastStart(), "yyyy-MM-DD")>  moment(LastEnd(), "yyyy-MM-DD"))
  {
    if ( moment(LastStart(), "yyyy-MM-DD").add(PeriodLength(), "days") > new moment().startOf("day"))
      LastEnd( moment(LastStart(), "yyyy-MM-DD").add(PeriodLength(), "days").format("yyyy-MM-DD") );
    else 
      LastEnd(new moment().add(1,"days").startOf("day").format("yyyy-MM-DD") );
  }
  let ovulation_counter = 0;
  if (LastStart()<day)
    {
      ovulation_counter = day.diff(LastStart(), 'days')-1;
      display_ovulation = true;
    }

  let now = new moment().startOf("day");
 
  DATA.forEach(element => {
    if (element.date <= now)
    {
      if(element.p_start == 1)
       {
        period = true;
        ovulation_counter = 0;
        display_ovulation = true;
       }
      element.period = period;
      if (element.p_end == 1)
        period = false;
    }
    if (element.date ==  moment (LastEnd(), "yyyy-MM-DD"))
    { 
      period = false;
      element.period = false;
    } 
    if (display_ovulation && ovulation_counter == OvulationStart() && element.date <= moment (LastStart(), "yyyy-MM-DD") && element.period==false)
      {
        element.ovulation= true;
      }
    ovulation_counter ++;
  }); 
  if ( day.clone().add(1,"months")>now)
  {
    SetFuturePeriod(DATA)
  }
  
}

function SetFuturePeriod(DATA)
{
  let ls = moment(LastStart(),"yyyy-MM-DD").startOf("day") ;
  
  if ( ls.clone().add(CycleLength(),"days")<=new moment().startOf("day"))
    ls = new moment().startOf("day").add(1,"days");
  while(ls.clone().add(CycleLength(),"days") <= day)
    ls = ls.clone().add(CycleLength(),"days")
  let cycleDay = 0;
  let lastDate = day.clone().add(1, "months");
  
  while (ls <= lastDate )
  {
    cycleDay++;
    if (cycleDay <= PeriodLength())
      setFutureData(DATA,ls, true, false);
    if (cycleDay == OvulationStart())
      setFutureData(DATA,ls, false,true);
    if(cycleDay == CycleLength())
      cycleDay= 0
    ls = ls.clone().add(1,"days");
  } 
}
function setFutureData(DATA,date, period, ovulation)
{
  let a = DATA.find(x=>x.date.format("yyyy-MM-DD") ==  moment(date,"yyyy-MM-DD").format("yyyy-MM-DD"));
  if (a != null)
  {
    a.future_period = period;
    a.ovulation = ovulation;
  }
}

function GetStartDay()
{
  if (day.day==1)
    return day;
  else
    return day.clone().add(-1,"months").endOf('month').startOf('isoweek');
}

const styles = StyleSheet.create({
    background:{
        flex:1,     
        backgroundColor:colors.background,
        color:colors.grey,
        borderWidth:1,
        borderColor:colors.grey
    },
    box:{
        backgroundColor:colors.red,
        height:boxsize,
        width:boxsize,
        borderWidth:1,
        borderColor:colors.grey,
        margin:1

    },
    titleBox:{
        margin:1, 
        height:70,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
    },
    titleText:{
        fontSize:25,
        color:colors.grey,
        fontWeight:"bold",
        
    },
    labelBox:{
      margin:1,
      height:boxsize,
      width:boxsize,
      alignItems:"center",
      justifyContent:"center"
  },
  labelText:{
      fontSize:20,
      color:colors.grey,
      fontWeight:"bold"
      
  },
  gridBox:{
    flex:1,    
    margin:marginwidth,
    justifyContent:'center'
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
buttonH:{
  width:70,
  height:"100%",
  backgroundColor:colors.background,
  alignItems:"center"
},
imageS:{
  width:50,
  height:50,
  margin:7
}
})

export default CalendarScreen;
