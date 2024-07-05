import { Text, View, StyleSheet, Pressable } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { AntDesign } from '@expo/vector-icons';
import { CoursesContext } from "../store/courseContext";
import CourseForm from "../components/CourseForm";
import { storeCourse, updateCourse, deleteCourseHttp, logAsyncStorageData } from "../helper/http";

export default function ManageCourse({ route, navigation }) {

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
        logAsyncStorageData();
    }, [navigation, isEditing]);

    async function deleteCourse() {
        courseContext.deleteCourse(courseId);
        await deleteCourseHttp(courseId);
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            console.warn('No screens to go back to');
        }
    }

    function cancelHandler() {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            console.warn('No screens to go back to');
        }
    }

    async function addOrUpdateHandler(courseData) {
        if (isEditing) {
            courseContext.updateCourse(courseId, courseData);
            await updateCourse(courseId, courseData);
        } else {
            const id = await storeCourse(courseData);
            courseContext.addCourse({ ...courseData, id: id });
        }
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            console.warn('No screens to go back to');
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <CourseForm
                cancelHandler={cancelHandler}
                onSubmit={addOrUpdateHandler}
                buttonLabel={isEditing ? "Kursu Güncelle" : "Kursu Ekle"}
                defaultValues={selectedCourse}
            />
            {isEditing && (
                <View style={styles.deleteContaier}>
                    <AntDesign name="delete" size={24} color="black" onPress={deleteCourse} />
                </View>
            )}
        </View>
    );
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
});
