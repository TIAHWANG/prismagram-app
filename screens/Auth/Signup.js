import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default ({ route, navigation }) => {
    const emailInput = useInput(route.params ? route.params.email : "");
    const fNameInput = useInput("");
    const lNameInput = useInput("");
    const usernameInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            email: emailInput.value,
            firstName: fNameInput.value,
            lastName: lNameInput.value,
            username: usernameInput.value,
        },
    });

    const handleSignup = async () => {
        const { value: email } = emailInput;
        const { value: fName } = fNameInput;
        const { value: lName } = lNameInput;
        const { value: username } = usernameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            return Alert.alert("유효하지 않은 이메일입니다");
        }
        if (fName === "") {
            return Alert.alert("이름을 입력해 주세요");
        }
        if (username === "") {
            return Alert.alert("사용자 이름을 입력해 주세요");
        }
        try {
            setLoading(true);
            const {
                data: { createAccount },
            } = await createAccountMutation();
            if (createAccount) {
                Alert.alert("계정이 생성되었습니다", "로그인 하세요");
                navigation.navigate("Login", { email });
            }
        } catch (e) {
            console.log(e);
            Alert.alert("이미 가입되어있는 계정입니다", "로그인 하세요");
            navigation.navigate("Login", { email });
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...fNameInput} placeholder="이름" autoCapitalize="words" />
                <AuthInput {...lNameInput} placeholder="성" autoCapitalize="words" />
                <AuthInput {...emailInput} placeholder="이메일" keyboardType="email-address" returnKeyType="send" autoCorrect={false} />
                <AuthInput {...usernameInput} placeholder="사용자 이름" returnKeyType="send" autoCorrect={false} />
                <AuthButton loading={loading} text="Sign Up" onPress={handleSignup} />
            </View>
        </TouchableWithoutFeedback>
    );
};
