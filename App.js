import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageCourse from './screens/ManageCourse';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RecentCourse from "./screens/RecentCourse";
import AllCourses from "./screens/AllCourse";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CourseOverview() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: 'white' },
                tabBarActiveTintColor: 'darkblue',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
                ),
            }}
        >
            <Tab.Screen
                name="RecentCourses"
                component={RecentCourse}
                options={{
                    title: 'Yakın Zamanda Kaydolunanlar',
                    tabBarLabel: 'Yakın Zamanda',
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="hour-glass" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="AllCourses"
                component={AllCourses}
                options={({ navigation }) => ({
                    title: 'Tüm Kurslar',
                    tabBarLabel: 'Tüm Kurslar',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            style={({pressed}) => pressed && styles.pressed}
                            onPress={() => navigation.navigate('ManageCourse')}>
                            <View style={styles.iconContainer}>
                                <Text style={styles.iconText}>Ekle</Text>
                                <Entypo name="add-to-list" size={24} color="white" />
                            </View>
                        </Pressable>
                    )
                })}
            />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="CourseOverview"
                    component={CourseOverview}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ManageCourse" component={ManageCourse} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    iconContainer : {
        flexDirection: 'row',
        marginRight: 10,
        borderColor : 'red',
        backgroundColor : 'darkblue',
        paddingBottom : 5,
        paddingTop : 5,
        paddingLeft : 10,
        paddingRight : 10,
        borderRadius : 10
    },
    pressed : {
        opacity : 0.5,

    },
    iconText : {
        marginRight: 15,
        fontSize : 20,
        color : 'white'
    }
});
