import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
    padding-right: 20px;
`;

export default () => {
    const navigation = useNavigation();
    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
            <NavIcon name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"} />
        </Container>
    );
};
