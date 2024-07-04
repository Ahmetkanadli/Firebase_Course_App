import {StyleSheet,Text, View} from "react-native";
import Courses from "../components/Courses";
import {useContext} from "react";
import {CoursesContext} from "../store/courseContext";

export  default  function AllCourses(){

   const coursesContext = useContext(CoursesContext);

    return <Courses
        courses ={coursesContext.courses}
        coursesPeriod='Tüm Kurslar'
        nullText='HerHangi bir Kursa Kayıtlı değilsiniz'
    /> ;
}

const styles = StyleSheet.create({

})
