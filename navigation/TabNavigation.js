import "react-native-gesture-handler";
import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const TabNavigation = createBottomTabNavigator();

export default () => {
    return (
        <TabNavigation.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#e91e63",
            }}
        >
            <TabNavigation.Screen name="Home" component={Home} />
            <TabNavigation.Screen name="Search" component={Search} />
            <TabNavigation.Screen
                name="Add"
                component={View}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate("PhotoNavigation");
                    },
                })}
            />
            <TabNavigation.Screen name="Notifications" component={Notifications} />
            <TabNavigation.Screen name="Profile" component={Profile} />
        </TabNavigation.Navigator>
    );
};
