import {StyleSheet, View} from "react-native";
import CoursesSummary from "./CoursesSummary";
import CoursesList from "./CoursesList";


export default function Courses({coursesPeriod}) {
    return (
        <View style={styles.container}>

            <CoursesList courses = {COURSES}/>
            <CoursesSummary periodName={coursesPeriod} courses ={COURSES}/>
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
