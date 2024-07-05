import axios from "axios";

import 'react-native-get-random-values'; // Bu satırı ekleyin
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';



const url = 'https://react-course-app-b73e1-default-rtdb.firebaseio.com';

export async function storeCourse(courseData) {
    const id = uuidv4();  // Rastgele bir ID oluşturun
    const response = await axios.post(url + '/courses.json', { ...courseData, id });  // ID'yi courseData'ya ekleyin
    const firebaseId = response.data.name;

    // Save to AsyncStorage
    try {
        await AsyncStorage.setItem(id, JSON.stringify(courseData));
        console.log(`Data stored in AsyncStorage: ${id} - ${JSON.stringify(courseData)}`);
    } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
    }

    return id;
}

export async function getCourses() {
    const response = await axios.get(url + '/courses.json');
    const courses = [];

    for (const key in response.data) {
        const courseObject = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        courses.push(courseObject);

        // Save to AsyncStorage
        try {
            await AsyncStorage.setItem(key, JSON.stringify(courseObject));
            console.log(`Data saved to AsyncStorage: ${key} - ${JSON.stringify(courseObject)}`);
        } catch (error) {
            console.error("Error saving data to AsyncStorage", error);
        }
    }

    return courses;
}

/*
export async function getCourses() {
    const courses = [];

    try {
        // Tüm anahtarları alın
        const keys = await AsyncStorage.getAllKeys();
        // Anahtarları kullanarak tüm verileri alın
        const stores = await AsyncStorage.multiGet(keys);

        stores.forEach(([key, value]) => {
            if (value) {
                const courseObject = JSON.parse(value);
                // date özelliğini Date nesnesine dönüştür
                if (courseObject.date) {
                    courseObject.date = new Date(courseObject.date);
                }
                courses.push(courseObject);
                console.log(`Data retrieved from AsyncStorage: ${key} - ${value}`);
            }
        });
    } catch (error) {
        console.error("Error retrieving data from AsyncStorage", error);
    }

    return courses;
}
*/

export async function updateCourse(id, courseData) {
    const response = await axios.put(url + `/courses/${id}.json`, courseData);

    // Update AsyncStorage
    try {
        await AsyncStorage.setItem(id, JSON.stringify(courseData));
        console.log(`Data updated in AsyncStorage: ${id} - ${JSON.stringify(courseData)}`);
    } catch (error) {
        console.error("Error updating data in AsyncStorage", error);
    }

    return response.data;
}

export async function deleteCourseHttp(id) {
    const response = await axios.delete(url + `/courses/${id}.json`);

    // Remove from AsyncStorage
    try {
        await AsyncStorage.removeItem(id);
        console.log(`Data removed from AsyncStorage: ${id}`);
    } catch (error) {
        console.error("Error removing data from AsyncStorage", error);
    }

    return response.data;
}

// Function to log all data stored in AsyncStorage
export async function logAsyncStorageData() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const stores = await AsyncStorage.multiGet(keys);

        stores.forEach(([key, value]) => {
            console.log(`AsyncStorage key: ${key}, value: ${value}`);
        });
    } catch (error) {
        console.error("Error reading data from AsyncStorage", error);
    }
}

/*
// Eski kod
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
 */
