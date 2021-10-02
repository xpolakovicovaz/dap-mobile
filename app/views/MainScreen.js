import React from 'react';
import {StyleSheet, View, Text, Pressable, Image} from 'react-native'
import colors from '../global/colors';

function MainScreen(props) {
    return (
        <View style={styles.background}>
            <View style={styles.textBox}>
                <Text style={styles.smallText}>este</Text>
                <Text style={styles.bigText}>15</Text>
                <Text style={styles.smallText}>dni</Text>
            </View>
            <View style={styles.buttonBox}>
                <Pressable style={styles.buttonS} >
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/gear.png")}/>
                </Pressable>
                <Pressable style={styles.buttonS}>
                    <Image  style={styles.imageS} source={require("../assets/cal.png")}  resizeMode="contain"/>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
background:{
    flex:1,
    backgroundColor:colors.background,
    color:colors.grey,
        backgroundColor:colors.background,
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