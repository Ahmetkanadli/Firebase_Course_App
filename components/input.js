import {StyleSheet, Text, View,TextInput} from 'react-native';
import React from "react";

export default function Input({label, texInputConfig, invalid}) {
    return(
        <View style={styles.container}>
            <Text style={[invalid ? styles.label : styles.invalidLabel]}>{label}</Text>
            <TextInput style={styles.input} {...texInputConfig}/>
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        marginVertical : 4,
        marginHorizontal : 10,

        shadowColor : 'grey'
    },
    label:{
        fontSize : 20,
        color : 'black',
        marginBottom: 4
    },
    input: {
        fontSize : 18,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius : 10,

        marginBottom : 20,
        padding : 10
    },
    invalidLabel :{
        fontSize : 20,
        color:'red',
        marginBottom: 4
    }

})
