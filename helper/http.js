import axios from "axios";

const url = 'https://react-course-app-b73e1-default-rtdb.firebaseio.com'

export async function storeCourse(courseData) {

    const response = await axios.post(url +'/courses.json', courseData)
    return response.data.name;
}


export async function getCourses() {

    const response = await axios.get(url+'/courses.json');

    const courses = [];

    for (const key in response.data) {
        const courseObject ={
            id : key,
            amount : response.data[key].amount,
            date : new Date(response.data[key].date.value),
            description : response.data[key].description,
        }
        courses.push(courseObject);
    }

    return courses;
}

export function updateCourse(id,courseData) {
    return axios.put(url+`/courses${id}.json`,courseData)
}

export function deleteCourseHttp(id) {
    return axios.delete(url+`/courses${id}.json`,)
}
