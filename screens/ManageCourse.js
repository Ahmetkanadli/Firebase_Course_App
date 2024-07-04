import {Text, View, StyleSheet, Pressable} from "react-native";
import React from "react";
import {useLayoutEffect} from "react";
import {AntDesign} from '@expo/vector-icons';

export default function ManageCourse({route, navigation}) {

    const courseId = route.params?.courseId;
    let isEditing = false;

    if (courseId) {
        isEditing = true;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Kursu Güncelle" : "Kursu Ekle",
        });
    }, [navigation, isEditing]);

    function deleteCourse() {
        navigation.goBack();
    }

    function  cancelHandler(){
        navigation.goBack();
    }

    return (
        <View style={styles.container}>


            <View style={styles.buttons}>
                <Pressable onPress={cancelHandler}>
                    <View style={styles.cancel}>
                        <Text style={styles.cancelText}>
                            İptal Et
                        </Text>
                    </View>
                </Pressable>
                <Pressable>
                    <View style={styles.addOrUpdate}>
                        <Text style={styles.addOrUpdateText}>
                            {isEditing ? "Kursu Güncelle" : "Kursu Ekle"}
                        </Text>
                    </View>
                </Pressable>
            </View>


            {isEditing &&
                <View style={styles.deleteContaier}>
                    <AntDesign name="delete" size={24} color="black" onPress={deleteCourse}/><
                /View>
            }
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
    buttons : {
        flexDirection : "row",
        justifyContent : "center"
    },
    cancel : {
        backgroundColor : 'red',
        minWidth : 120,
        marginRight : 30,
        padding : 8,
        alignItems : "center",
        borderRadius : 10,
    },
    cancelText : {
        fontSize : 16,
        fontWeight : "bold",
        color:"white",
    },
    addOrUpdate : {
        backgroundColor : 'darkblue',
        minWidth : 120,
        marginRight : 30,
        padding : 8,
        alignItems : "center",
        borderRadius : 10,
    },
    addOrUpdateText : {
        fontSize : 16,
        fontWeight : "bold",
        color:"white",
    }
})
