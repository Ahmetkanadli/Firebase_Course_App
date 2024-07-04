import {Alert, Pressable, StyleSheet, Text, View,} from 'react-native';
import React from "react";
import Input from "./input";
import {useState} from "react";
import { getFormattedDate} from "../helper/date";

export default function CourseForm({cancelHandler, onSubmit, buttonLabel, defaultValues}) {

    const [inputs, setInputs] = useState({
        amount: {
            value : defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date :{
            value : defaultValues ? getFormattedDate(defaultValues.date) :'',
            isValid: true,
        },
        description : {
            value : defaultValues ? defaultValues.description : '',
            isValid: true,
        }
    });

    function addOrUpdateHandler(){
        const courseData = {
            amount : Number(inputs.amount.value),
            date : new Date(inputs.date.value),
            description : inputs.description.value
        }

        const amountIsValid =  courseData.amount > 0;
        const dateIsValid = courseData.date.toDateString() != 'Invalid Date';
        const descriptionIsValid = courseData.description.trim().length>0;

        if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((currentInputs)=>{
                return{
                    amount : {value : currentInputs.amount.value, isValid: amountIsValid},
                    description : {value : currentInputs.description.value, isValid: descriptionIsValid},
                    date : {value : currentInputs.date.value, isValid: dateIsValid},
                }
            });
            return ;
        }

        onSubmit(courseData);
    }

    function inputChange(inputIdentifier,enteredValue) {
        setInputs((currentInput) => {
            return{
                ...currentInput,
                [inputIdentifier]: {value :enteredValue, isValid : true}
            }
        })
    }

    console.log(inputs)

    return(
        <View style={styles.inputContainer}>
            <Text style={styles.header}>Kurs Bilgileri</Text>
            <Input
                label="Kurs Adı"
                invalid={inputs.description.isValid}
                texInputConfig={{
                    multiline: true,
                    onChangeText: inputChange.bind(this,'description'),
                    value : inputs.description.value

                }}
            />
            <Input
                label="Tarih"
                invalid={inputs.date.isValid}
                texInputConfig={{
                    placeholder: "YYYY-MM-DD",
                    keyboardType: "numeric",
                    onChangeText:  inputChange.bind(this,'date'),
                    value : inputs.date.value

                }}
            />
            <Input
                label="Tutar"
                invalid={inputs.amount.isValid}
                texInputConfig={{
                    keyboardType: "numeric",
                    onChangeText: inputChange.bind(this,'amount'),
                    value : inputs.amount.value
                }}
            />
            <View style={styles.errorMessage}>
                {!inputs.amount.isValid && (
                    <Text>Lütfen Tutarı Doğru Giriniz</Text>
                )}
                {!inputs.date.isValid && (
                    <Text>Lütfen Tarihi Doğru Giriniz</Text>
                )}
                {!inputs.description.isValid && (
                    <Text>Lütfen Açıklamayı Doğru Giriniz</Text>
                )}
            </View>
            <View style={styles.buttons}>
                <Pressable onPress={cancelHandler}>
                    <View style={styles.cancel}>
                        <Text style={styles.cancelText}>
                            İptal Et
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress={addOrUpdateHandler}>
                    <View style={styles.addOrUpdate}>
                        <Text style={styles.addOrUpdateText}>
                            {buttonLabel}

                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header :{
        fontSize : 30,
        textAlign : 'center',
        marginBottom : 30,
        fontWeight: "bold"

    },
    inputContainer: {
        elevation : 10,
        borderRadius : 20,
        padding: 20,
        backgroundColor: 'white',  // Background color ekleyin
        shadowOffset: { width: 0, height: 2 }, // Gölge açısını değiştirin
        shadowOpacity: 0.5,  // Gölge opaklığını artırın
        shadowRadius: 3.84,  // Gölge yarıçapını artırın
        shadowColor : "#000",  // Gölge rengini siyah yapın
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop : 30

    },
    cancel: {
        backgroundColor: 'red',
        minWidth: 120, marginRight: 30,
        padding: 8,
        alignItems: "center",
        borderRadius: 10,

    },
    cancelText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    addOrUpdate: {
        backgroundColor: 'darkblue',
        minWidth: 120,
        marginRight: 30,
        padding: 8,
        alignItems: "center",
        borderRadius: 10,
    },
    addOrUpdateText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    errorMessage :{
        alignItems : "center",
        marginBottom : 15,
        color: 'red'
    }
})
