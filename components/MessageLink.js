import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity``;
const Text = styled.Text``;

// Case 1
// export default () => (
//     <Container onPress={() => console.log("눌렸음")}>
//         <Text>Messages</Text>
//     </Container>
// );

// Case 2
export default () => {
    const navigation = useNavigation();
    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
            <Text>Messages</Text>
        </Container>
    );
};
