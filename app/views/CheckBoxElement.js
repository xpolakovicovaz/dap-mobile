import React from 'react';
import { StyleSheet,TouchableOpacity, View , Image} from 'react-native';


import colors from '../global/colors';

//let size = 100;

export default  function CheckBoxElement({checked, onChange}) {

    let [size, setSize] = React.useState(100);

      return (
        <View style={styles.empty}  onLayout={(event) => {setSize( getSize(event.nativeEvent.layout));onChange(checked) ;console.log(size);}}>
  
            <TouchableOpacity  style={[styles.background,{width:size, height:size}]}   onPress={()=>{console.log(size);onChange(!checked)}}>
               
           {checked && <Image style={[{width:Math.floor(size*0.9), height:Math.floor(size*0.9)}]} resizeMode="stretch" source={require("../assets/ok.png")} />}
                
            </TouchableOpacity>
            </View>
      );

      };

function getSize(layout){
    const {x, y, width, height} = layout;
    console.log("size " + width + " , "+height);
    return Math.floor(Math.min(width, height)*0.9);
};


const styles = StyleSheet.create({
    background:{
        backgroundColor:colors.background,
        color:colors.grey,
        borderWidth:1,
        borderColor:colors.grey,
        width:"100%",
        height:"100%"
    },
    empty:{
        flex:1,
        margin:2,
        width:"100%",
        height:"100%"
    },
    imageS:{
        width:50,
        height:50,
        margin:"10%"
    }
}) 
