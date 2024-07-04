// React'ten createContext fonksiyonunu içe aktarıyoruz.
import { createContext } from 'react';
// @babel/core'den stat fonksiyonunu içe aktarıyoruz (bu örnekte kullanılmamış).
import { stat } from "@babel/core/lib/gensync-utils/fs";

// Sabit bir kurs listesi tanımlıyoruz.
const COURSES = [
    {
        id: '1',
        description: 'C Programlama',
        amount: 69,
        date: new Date('2023-01-05'),
    },
    {
        id: '2',
        description: 'C# Programlama',
        amount: 69,
        date: new Date('2023-04-10'),
    },
    {
        id: '3',
        description: 'Angular',
        amount: 69,
        date: new Date('2022-12-08'),
    },
    {
        id: '4',
        description: 'Bootstrap 5',
        amount: 69,
        date: new Date('2022-10-10'),
    },
    {
        id: '5',
        description: 'React Js',
        amount: 69,
        date: new Date('2023-05-20'),
    },
    {
        id: '6',
        description: 'React Native',
        amount: 69,
        date: new Date('2023-07-30'),
    },
    {
        id: '7',
        description: 'Javascript',
        amount: 69,
        date: new Date('2023-06-12'),
    },
    {
        id: '8',
        description: 'Komple Web',
        amount: 69,
        date: new Date('2021-10-22'),
    },
    {
        id: '9',
        description: 'Frontend',
        amount: 69,
        date: new Date('2022-11-25'),
    },
];

// Kursları ve kurs yönetim fonksiyonlarını içeren bir context oluşturuyoruz.
export const CoursesContext = createContext({
    courses: [],
    addCourse: ({ description, amount, date }) => { },
    deleteCourse: ({ id }) => { },
    updateCourse: (id, { description, amount, date }) => { },
});

// Kurs yönetim işlemlerini gerçekleştiren reducer fonksiyonu tanımlıyoruz.
function coursesReducer(state, action) {
    switch (action.type) {
        // Yeni bir kurs ekleme işlemi
        case 'ADD':
            const id = new Date().toDateString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];

        // Kurs silme işlemi
        case 'DELETE':
            return state.filter(course => course.id !== action.payload);

        // Kurs güncelleme işlemi
        case 'UPDATE':
            // Güncellenecek kursun indeksini buluyoruz
// state dizisinde, action.payload.id ile eşleşen kursun indeksini buluyoruz.
            const updatableCourseIndex = state.findIndex((course) => course.id === action.payload.id);

// Güncellenecek kursu bulduktan sonra, o kursun mevcut verilerini alıyoruz.
            const updatableCourse = state[updatableCourseIndex];

// Güncellenmiş kurs bilgilerini oluşturuyoruz
// Mevcut kurs verilerini (...updatableCourse) ve yeni gelen verileri (...action.payload.data) birleştiriyoruz.
// Bu sayede, sadece gelen yeni veriler güncellenmiş olacak, geri kalan veriler aynı kalacak.
            const updatedItem = { ...updatableCourse, ...action.payload.data };

// Güncellenmiş kursu içeren yeni bir kurslar dizisi oluşturuyoruz
// Mevcut state dizisini kopyalıyoruz (...state) ve bu kopya üzerinde değişiklik yapacağız.
            const updatedCourses = [...state];

// Kopyalanmış dizide, güncellenmiş kursun indeksine (updatableCourseIndex) güncellenmiş kurs verilerini (updatedItem) yerleştiriyoruz.
            updatedCourses[updatableCourseIndex] = updatedItem;

// Son olarak, güncellenmiş kurslar dizisini geri döndürüyoruz.
// Bu yeni dizi, güncellemenin yapıldığı durumu temsil edecek.
            return updatedCourses;


        // Default durumda mevcut durumu döndürüyoruz
        default:
            return state;
    }
}

// CoursesContextProvider bileşenini tanımlıyoruz
function CoursesContextProvider({ children }) {
    // useReducer hook'u ile coursesReducer fonksiyonunu ve başlangıç durumunu kullanıyoruz
    const [coursesState, dispatch] = useReducer(coursesReducer, COURSES);

    // Yeni bir kurs eklemek için fonksiyon
    function addCourse(courseData) {
        dispatch({ type: 'ADD', payload: courseData });
    }

    // Bir kursu silmek için fonksiyon
    function deleteCourse(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    // Bir kursu güncellemek için fonksiyon
    function updateCourse(id, courseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: courseData } });
    }

    // Context'in değerini tanımlıyoruz
    const value = {
        courses: coursesState,
        addCourse: addCourse,
        deleteCourse: deleteCourse,
        updateCourse: updateCourse,
    };

    // CoursesContext.Provider bileşenini döndürüyoruz ve çocuk bileşenleri içine alıyoruz
    return <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
}

// CoursesContextProvider bileşenini dışa aktarıyoruz
export default CoursesContextProvider;
