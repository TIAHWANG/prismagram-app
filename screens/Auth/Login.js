import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { LOGIN } from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
    const emailInput = useInput(route.params ? route.params.email : "");
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] = useMutation(LOGIN, {
        variables: {
            email: emailInput.value,
        },
    });

    const handleLogin = async () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === "") {
            return Alert.alert("이메일을 입력해 주세요");
        } else if (!value.includes("@") || !value.includes(".")) {
            return Alert.alert("이메일 형식에 맞게 입력해 주세요");
        } else if (!emailRegex.test(value)) {
            return Alert.alert("유효하지 않은 이메일입니다");
        }
        try {
            setLoading(true);
            const {
                data: { requestSecret },
            } = await requestSecretMutation();
            if (requestSecret) {
                Alert.alert("이메일로 시크릿이 발송되었습니다");
                navigation.navigate("Confirm", { email: value });
            } else {
                Alert.alert("계정을 찾을 수 없습니다");
                navigation.navigate("Signup", { email: value });
            }
        } catch (e) {
            console.log(e);
            Alert.alert("로그인 할 수 없습니다");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...emailInput}
                    placeholder="이메일"
                    keyboardType="email-address"
                    returnKeyType="send"
                    onSubmitEditing={handleLogin}
                    autoCorrect={false}
                />
                <AuthButton loading={loading} text="Log In" onPress={handleLogin} />
            </View>
        </TouchableWithoutFeedback>
    );
};
