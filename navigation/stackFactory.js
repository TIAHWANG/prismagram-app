import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";

const stackFactory = createStackNavigator();

export default ({ route }) => {
    const { initialRoute, customConfig } = route.params;
    return (
        <stackFactory.Navigator initialRouteName="Home">
            <stackFactory.Screen name={route.name} component={initialRoute} options={customConfig} />
        </stackFactory.Navigator>
    );
};
