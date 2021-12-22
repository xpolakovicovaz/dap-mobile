import React from 'react';
import {StyleSheet, View, Text, Pressable, Image, Dimensions, FlatList} from 'react-native';
import moment from 'moment'

import colors from '../global/colors';

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
const DATA = [
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
  ];
function RenderItem()
{
    return (<View style={styles.box}></View>);
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
const CalendarScreen = ({ route, navigation }) => {
  day = route.params.date;
    //else
    //day = moment();
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
