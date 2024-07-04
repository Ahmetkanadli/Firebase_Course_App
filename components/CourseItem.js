import {View, Text, Pressable,StyleSheet} from "react-native";
import {getFormatDate} from "../helper/date";
import {useNavigation} from "@react-navigation/native";

export default function  CourseItem({amount,date,description,id}) {

    const  navigation = useNavigation();

    function coursePress() {
        navigation.navigate('ManageCourse',{
            courseId:id,
        })
    }

    return(
        <Pressable onPress={coursePress}>
            <View style={styles.courseContainer}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.description}>{description}</Text>
                    <Text>{getFormatDate(date)}</Text>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{amount + '  TL'}</Text>
                </View>
            </View>
        </Pressable>
    );
}
const styles = StyleSheet.create({
    courseContainer: {
        flexDirection : "row",
        justifyContent : 'space-between',
        backgroundColor : 'white',
        marginVertical : 8,
        padding : 15,
        borderRadius : 10,
        elevation : 3,
        shadowColor : 'black',
        shadowRadius : 10,
        shadowOffset : {width : 1, height : 1},
        shadowOpacity : 0.5

    },
    descriptionContainer: {},
    description: {
        fontSize : 20,
        fontWeight : "bold",
        marginBottom : 5,
    },
    priceContainer: {
        backgroundColor : 'skyblue',
        alignItems : "center",
        justifyContent : "center",
        borderRadius : 10,
        paddingVertical : 5,
        paddingHorizontal : 10

    },
    price :{
        fontWeight: "bold",
        fontSize : 18,

    },
})
