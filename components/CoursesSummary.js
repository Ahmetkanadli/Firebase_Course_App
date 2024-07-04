import {StyleSheet,View,Text} from "react-native";
import React from "react";


export default function CoursesSummary({periodName,courses}) {

    const coursesSum = courses.reduce((sum, course) => {
        return sum + course.amount;
    },0)

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{periodName}</Text>
            <Text style={styles.cost}>{'Toplam: '+coursesSum + ' TL'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        paddingHorizontal: 20,
        paddingVertical :5,
        borderRadius:10,
        alignItems : "center",
        marginBottom : 15

    },
    title :{

        fontSize : 18,
        fontWeight : "bold"
    },
    cost : {

        fontSize : 18,
        fontWeight : "bold"
    }
})
