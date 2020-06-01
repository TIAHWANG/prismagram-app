import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native-gesture-handler";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default ({ navigation: { navigate } }) => (
    <View>
        <Text>Auth Home</Text>
        <TouchableOpacity onPress={() => navigate("Login")}>
            <Text>Go to Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Signup")}>
            <Text>Go to Sign Up</Text>
        </TouchableOpacity>
    </View>
);
