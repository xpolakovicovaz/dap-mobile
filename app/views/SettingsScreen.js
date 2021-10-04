import React from 'react';
import {View, Text, TextInput, StyleSheet, Pressable, Image } from 'react-native';

import colors from '../global/colors';

function SettingsScreen(props) {
    return (
        <View style={styles.background}>
            <View style={styles.itemsListBox}>
                <View style={styles.itemBox}>
                    <Text style={styles.description}>Dĺžka cyklu</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric"/>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.description}>Trvanie</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric"/>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.description}>Začiatok ovulácie</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric"/>
                </View>
                <View style={styles.itemBox}>
                    <Text style={styles.description}>Trvanie</Text>
                    <TextInput style={styles.userValue} keyboardType="numeric"/>
                </View>
            </View>
            <View style={styles.buttonBox}>
                <Pressable style={styles.buttonS} >
                    <Image  style={styles.imageS} resizeMode="contain" source={require("../assets/cancel.png")}/>
                </Pressable>
                <Pressable style={styles.buttonS}>
                    <Image  style={styles.imageS} source={require("../assets/ok.png")}  resizeMode="contain"/>
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