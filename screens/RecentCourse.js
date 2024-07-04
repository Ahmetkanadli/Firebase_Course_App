import {Text, View} from "react-native";
import Courses from "../components/Courses";
import React,{useEffect} from "react";
import {useContext,useState} from "react";
import {CoursesContext} from "../store/courseContext";
import {getLastWeek} from "../helper/date";
import {getCourses} from "../helper/http";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorText from "../components/ErrorText";

export default function RecentCourse() {

    const coursesContext = useContext(CoursesContext);

    const [fetchedCourseState, setFetchedCourseState] = useState([]);
    const [error, setError] = useState();

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
     async function getAllCourses(){
         setIsFetching(true)
         setError(null)
         try {
             const courses = await getCourses();
             coursesContext.setCourses(courses);
         }
         catch (error) {
             setError('Kursları çekemedik!');
         }


         //setFetchedCourseState(courses);
         setIsFetching(false)
     }

     getAllCourses();
    },[]);

    if (error && !isFetching) {
        return <ErrorText message={error} />;
    }

    if(isFetching){
        return <LoadingSpinner/>
    }




    const recentCourses = coursesContext.courses.filter((course) => {
        const today = new Date();
        const dateLastWeek = getLastWeek(today, 7);

        return course.date >= dateLastWeek && course.date <= today;

    });


    return <Courses
        courses={recentCourses}
        coursesPeriod='Son 1 Hafta'
        nullText='Yakın Zamanda Her Hangi bir kursa kayıt olmadınız'
    />
}
