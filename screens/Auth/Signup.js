import React, { useState } from "react";
import styled from "styled-components";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "react-apollo-hooks";
import * as Google from "expo-google-app-auth";
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

const FBContainer = styled.View`
    margin-top: 25px;
    padding-top: 25px;
    border-top-width: 1px;
    border-color: ${(props) => props.theme.lightGreyColor};
    border-style: solid;
`;

const GoogleContainer = styled.View`
    margin-top: 20px;
`;

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
    const googleLogin = async () => {
        const GOOGLE_ID = process.env.GOOGLE_ID;
        try {
            const result = await Google.logInAsync({
                iosClientId: GOOGLE_ID,
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                    headers: { Authorization: `Bearer ${result.accessToken}` },
                });
                const { email, family_name, given_name } = await user.json();
                updateFormData(email, given_name, family_name);
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    const updateFormData = (email, firstName, lastName) => {
        emailInput.setValue(email);
        fNameInput.setValue(firstName);
        lNameInput.setValue(lastName);
        const [username] = email.split("@");
        usernameInput.setValue(username);
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...fNameInput} placeholder="이름" autoCapitalize="words" />
                <AuthInput {...lNameInput} placeholder="성" autoCapitalize="words" />
                <AuthInput {...emailInput} placeholder="이메일" keyboardType="email-address" returnKeyType="send" autoCorrect={false} />
                <AuthInput {...usernameInput} placeholder="사용자 이름" returnKeyType="send" autoCorrect={false} />
                <AuthButton loading={loading} text="Sign Up" onPress={handleSignup} />
                <FBContainer>
                    <AuthButton bgColor={"#2D4DA7"} loading={false} onPress={() => null} text="Connect Facebook" />
                </FBContainer>
                <GoogleContainer>
                    <AuthButton bgColor={"#EE1922"} loading={false} onPress={googleLogin} text="Connect Google" />
                </GoogleContainer>
            </View>
        </TouchableWithoutFeedback>
    );
};
