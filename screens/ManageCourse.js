import {Text, View, StyleSheet, Pressable} from "react-native";
import React from "react";
import {useLayoutEffect} from "react";
import {AntDesign} from '@expo/vector-icons';
import {useContext} from "react";
import {CoursesContext} from "../store/courseContext";
import CourseForm from "../components/CourseForm";
import {storeCourse, updateCourse, deleteCourseHttp} from "../helper/http";

export default function ManageCourse({route, navigation}) {

    const courseId = route.params?.courseId;
    const courseContext = useContext(CoursesContext);

    let isEditing = false;

    const selectedCourse = courseContext.courses.find((course) => course.id === courseId);


    if (courseId) {
        isEditing = true;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Kursu Güncelle" : "Kursu Ekle",
        });
    }, [navigation, isEditing]);

    async  function deleteCourse() {
        courseContext.deleteCourse(courseId);
        await deleteCourseHttp(courseId);
        navigation.goBack();
    }


    function cancelHandler() {
        navigation.goBack();
    }

    async function addOrUpdateHandler(courseData) {
        if (isEditing) {
            courseContext.updateCourse(
                courseId, courseData);
            await  updateCourse(courseId,courseData)
        } else {
            const id = await storeCourse(courseData);
            courseContext.addCourse({...courseData,id :id})
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <CourseForm
                cancelHandler={cancelHandler}
                onSubmit={addOrUpdateHandler}
                buttonLabel={isEditing ? "Kursu Güncelle" : "Kursu Ekle"}
                defaultValues = {selectedCourse}
            ></CourseForm>
            {isEditing && <View style={styles.deleteContaier}>
                <AntDesign name="delete" size={24} color="black" onPress={deleteCourse}/><
                /View>}
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
    },
    deleteContaier: {
        alignItems: "center",
        borderTopWidth: 2,
        paddingTop: 10,
        marginTop: 16
    },

})
