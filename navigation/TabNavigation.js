import "react-native-gesture-handler";
import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import stackFactory from "./stackFactory";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessageLink from "../components/MessageLink";
import NavIcon from "../components/NavIcon";
import Detail from "../screens/Detail";

const TabNavigation = createBottomTabNavigator();
const Stack = createStackNavigator();

const Stacks = () => {
    return (
        <Stack.Navigator screenOptions={{ headerStyle: { ...stackStyles } }}>
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
    );
};

export default () => {
    return (
        <TabNavigation.Navigator
            initialRouteName="Search"
            tabBarOptions={{
                showLabel: false,
            }}
        >
            <TabNavigation.Screen
                name="Home"
                component={stackFactory}
                initialParams={{
                    initialRoute: Home,
                    customConfig: {
                        title: "Home",
                        headerStyle: {
                            height: 80,
                        },
                        headerRight: () => <MessageLink />,
                        headerTitle: (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Image style={{ height: 30 }} resizeMode="contain" source={require("../assets/logo.png")} />
                            </View>
                        ),
                    },
                }}
                options={{
                    tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-home" : "md-home"} />,
                }}
            />
            <TabNavigation.Screen
                name="Search"
                component={stackFactory}
                initialParams={{
                    initialRoute: Search,
                }}
                options={{
                    tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-search" : "md-search"} />,
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
                options={{
                    tabBarIcon: ({ focused }) => <NavIcon focused={focused} size={28} name={Platform.OS === "ios" ? "ios-add" : "md-add"} />,
                }}
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
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavIcon
                            focused={focused}
                            name={Platform.OS === "ios" ? (focused ? "ios-heart" : "ios-heart-empty") : focused ? "md-heart" : "md-heart-empty"}
                        />
                    ),
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
                options={{
                    tabBarIcon: ({ focused }) => <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-person" : "md-person"} />,
                }}
            />
        </TabNavigation.Navigator>
    );
};
