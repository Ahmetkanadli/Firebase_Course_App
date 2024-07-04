import {StyleSheet, View, Text, FlatList} from "react-native";
import CourseItem from "./CourseItem";

export default function CoursesList({courses}) {

    function renderCostItems(itemData) {
       return <CourseItem {...itemData.item} // Bu itemi olduğu gibi propsa atar
       />;
    }

    return (
        <FlatList
            data={courses}
            keyExtractor={(item) => item.id}
            renderItem={renderCostItems}
        />
    );
}

const styles = StyleSheet.create({})
