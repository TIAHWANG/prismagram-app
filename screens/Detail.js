import React from "react";
import styled from "styled-components";

const View = styled.View``;
const Text = styled.Text``;

export default ({ route }) => {
    const { id } = route.params;
    return (
        <View>
            <Text>I should fetch for: {id} </Text>
        </View>
    );
};
