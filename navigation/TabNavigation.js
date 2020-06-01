import "react-native-gesture-handler";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import stackFactory from "./stackFactory";
import MessageLink from "../components/MessageLink";

const TabNavigation = createBottomTabNavigator();

export default () => {
    return (
        <TabNavigation.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: "#e91e63",
            }}
        >
            <TabNavigation.Screen
                name="Home"
                component={stackFactory}
                initialParams={{
                    name: "Home",
                    initialRoute: Home,
                    customConfig: {
                        title: "Home",
                        headerStyle: {
                            height: 80,
                        },
                        headerRight: MessageLink,
                    },
                }}
            />
            <TabNavigation.Screen
                name="Search"
                component={stackFactory}
                initialParams={{
                    name: "Home",
                    initialRoute: Search,
                    customConfig: {
                        title: "Search",
                        headerStyle: {
                            height: 80,
                        },
                    },
                }}
            />
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
            <TabNavigation.Screen
                name="Notifications"
                component={stackFactory}
                initialParams={{
                    initialRoute: Notifications,
                    customConfig: {
                        title: "Notifications",
                        headerStyle: {
                            height: 80,
                        },
                    },
                }}
            />
            <TabNavigation.Screen
                name="Profile"
                component={stackFactory}
                initialParams={{
                    initialRoute: Profile,
                    customConfig: {
                        title: "Profile",
                        headerStyle: {
                            height: 80,
                        },
                    },
                }}
            />
        </TabNavigation.Navigator>
    );
};
