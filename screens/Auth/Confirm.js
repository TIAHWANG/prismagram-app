import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
    const { email } = route.params;
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
        variables: {
            secret: confirmInput.value,
            email,
        },
    });

    const handleConfirm = async () => {
        const { value } = confirmInput;
        if (value === "" || !value.includes(" ")) {
            return Alert.alert("유효하지 않은 Secret입니다");
        }
        try {
            setLoading(true);
            const {
                data: { confirmSecret },
            } = await confirmSecretMutation();
            if (confirmSecret !== "" || confirmSecret !== false) {
                logIn(confirmSecret);
            } else {
                Alert.alert("잘못된 Secret입니다");
            }
        } catch (e) {
            console.log(e);
            Alert.alert("Secret을 다시 확인해 주세요");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...confirmInput} placeholder="Secret" returnKeyType="send" onSubmitEditing={handleConfirm} autoCorrect={false} />
                <AuthButton loading={loading} text="Confirm" onPress={handleConfirm} />
            </View>
        </TouchableWithoutFeedback>
    );
};
