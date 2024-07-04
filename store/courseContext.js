import { createContext, useReducer } from 'react';



export const CoursesContext = createContext({
    courses: [],
    addCourse: ({ description, amount, date }) => {},
    deleteCourse: (id) => {},
    setCourses: (courses) => {},
    updateCourse: (id, { description, amount, date }) => {},
});

// Kurs yönetim işlemlerini gerçekleştiren reducer fonksiyonu tanımlıyoruz.
function coursesReducer(state, action) {
    switch (action.type) {
        // Yeni bir kurs ekleme işlemi
        case 'ADD':
            const id = new Date().toDateString() + Math.random().toString();
            return [action.payload, ...state];

        // Kurs silme işlemi
        case 'DELETE':
            return state.filter(course => course.id !== action.payload);
        case 'SET' :
            const reversedData = action.payload.reverse();
            return  reversedData;
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

function CoursesContextProvider({ children }) {
    const [coursesState, dispatch] = useReducer(coursesReducer, []);

    function addCourse(courseData) {
        dispatch({ type: 'ADD', payload: courseData });
    }
    function deleteCourse(id) {
        dispatch({ type: 'DELETE', payload: id });
    }
    function setCourses(courses) {
        dispatch({type : 'SET',payload :courses})
    }
    function updateCourse(id, courseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: courseData } });
    }

    const value = {
        courses: coursesState,
        addCourse: addCourse,
        deleteCourse: deleteCourse,
        setCourses : setCourses,
        updateCourse: updateCourse,
    };

    return (
        <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
    );
}

export default CoursesContextProvider;
