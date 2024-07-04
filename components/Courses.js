import {StyleSheet, Text, View} from "react-native";
import React from "react";
import CoursesSummary from "./CoursesSummary";
import CoursesList from "./CoursesList";


export default function Courses({coursesPeriod, courses, nullText}) {

    let content= <Text>{nullText}</Text>

    if (courses.length >0) {
        content = <CoursesList courses = {courses}/>;
    }

    return (
        <View style={styles.container}>
            {content}
            <CoursesSummary periodName={coursesPeriod} courses ={courses}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        paddingHorizontal: 20,
    },

})
