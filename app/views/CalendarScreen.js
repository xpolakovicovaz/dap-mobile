import React from 'react';
import {StyleSheet, View, Text, Pressable, Image, Dimensions, FlatList} from 'react-native';
import moment from 'moment'

import colors from '../global/colors';
//import { GetDb, LastEnd, LastStart,PeriodLength, CycleLength,OvulationStart, db} from '../db/dbController';
import CalendarElement from './CalendarElement';

const screenWidth = Dimensions.get("window").width;
const boxsize = Math.floor((screenWidth-20)/7);
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
let DATA = [
  /*
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b7',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Third Item',
      },    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b7',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d73',
          title: 'Third Item',
        },
        */
  ];
  


function RenderItem({item})
{
    return (
      <Pressable style={styles.labelBox} onPress={()=>navigation.navigate("Calendar", {navigation:navigation, date:moment()})}>
              
      {CalendarElement(item.date, item.period,item.ovulation, item.sex, item.pill, item.note, item.active)}
      </Pressable>
    );
}

function RenderLabel({item})
{
    return (
      <View style={styles.labelBox}>
        <Text style={styles.labelText}>{item.label}</Text>
      </View>
      );
}
/*
const RenderLabel=({value})=>(

      <View style={styles.labelBox}>
        <Text style={styles.labelText}>{value}</Text>
      </View>
)
;*/
let day = moment();
//let last_start = LastStart();
//let last_end = LastEnd();
//
//let DATA = [];

const CalendarScreen = ({ route, navigation }) => {
  day = route.params.date;
//let db=GetDb();
let DATA =  InitData();
    //else
    //day = moment();
    /*
  React.useEffect(()=>{
    data = InitData();})
     db.transaction((tx)=>{
       tx.executeSql("select date	,p_start, p_end	,sex, pill, note from day where strftime('%m', date) = '?' and strftime('%Y', date) = '?'",
       [day.format("MM"), day.format("yyyy")],
       (_, { rows:{ _array} }) =>{//callback function
        //   console.log('db data res ------>', _array)
           _array.map(({date	,p_start, p_end	,sex, pill, note})=> 
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

       )
     }

    )
  }
  )
*/
return (
    <View style={styles.background}>
        <View style={styles.titleBox}>
                <Text style={styles.titleText}>{GetMonthLabel(day)}</Text>
        </View>
        <View style={styles.gridBox}>
          <FlatList data={labels} renderItem={RenderLabel} numColumns={7} key={2} >
              
          </FlatList>
          <FlatList data={DATA} renderItem={RenderItem} numColumns={7} key={8}>
              
          </FlatList>
        </View>
    </View>
)
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
  console.log("init start");
  let startDay = GetStartDay();
let i = 0;
  var dates = [];
  for (i=0;i<42;i++)
  {

    console.log("startDay", startDay.month() , day.month() ,startDay.year() , day.year() );
    dates.push({id:i, date: startDay,p_start:false, p_end:false	,sex:false, pill:false, note:"", period:false, ovulation:false, active: startDay.month() == day.month() && startDay.year() == day.year()  });
    startDay = startDay.clone().add(1,"days");
  }
  console.log("init end");
  return dates;
};

function GetStartDay()
{
  if (day.day==1)
    return day;
  else
    return moment().add(-1,"months").endOf('month').startOf('isoweek');
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
        height:"20%",
        margin:1,
        alignItems:"center",
        justifyContent:"center"
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
    margin:marginwidth
},
})

export default CalendarScreen;
