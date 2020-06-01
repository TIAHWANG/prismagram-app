import "react-native-gesture-handler";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoTabs = createMaterialTopTabNavigator();
const PhotoNavigation = createStackNavigator();

const PhotoTab = () => {
    return (
        <PhotoTabs.Navigator tabBarPosition="bottom">
            <PhotoTabs.Screen name="SelectPhoto" component={SelectPhoto} />
            <PhotoTabs.Screen name="TakePhoto" component={TakePhoto} />
        </PhotoTabs.Navigator>
    );
};

export default () => {
    return (
        <PhotoNavigation.Navigator>
            <PhotoNavigation.Screen name="PhotoTab" component={PhotoTab} />
            <PhotoNavigation.Screen name="UploadPhoto" component={UploadPhoto} />
        </PhotoNavigation.Navigator>
    );
};
