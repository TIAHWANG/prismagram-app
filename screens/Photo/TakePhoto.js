import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import constants from "../../constants";
import Loader from "../../components/Loader";
import styles from "../../styles";

const View = styled.View`
    flex: 1;
    background-color: white;
`;

export default () => {
    const [loading, setLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const askPermission = async () => {
        try {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            if (status === "granted") {
                setHasPermission(true);
            }
        } catch (e) {
            console.log(e);
            hasPermission(false);
        }
    };
    const toggleType = () => {
        if (cameraType === Camera.Constants.Type.front) {
            setCameraType(Camera.Constants.Type.back);
        } else {
            setCameraType(Camera.Constants.Type.front);
        }
    };
    useEffect(() => {
        askPermission();
    }, []);
    return (
        <View>
            {loading ? (
                <Loader />
            ) : hasPermission ? (
                <Camera
                    type={cameraType}
                    style={{
                        width: constants.width,
                        height: constants.height / 2,
                        justifyContent: "flex-end",
                        padding: 10,
                    }}
                >
                    <TouchableOpacity onPress={toggleType}>
                        <Ionicons name={Platform.OS === "ios" ? "ios-reverse-camera" : "md-reverse-camera"} size={28} color={styles.blackColor} />
                    </TouchableOpacity>
                </Camera>
            ) : null}
        </View>
    );
};
