import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    width: ${constants.width / 1.8};
    padding: 10px;
    background-color: ${(props) => props.theme.greyColor};
    border: 1px solid ${(props) => props.theme.lightGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
    autoCapitalize = "none",
    keyboardType = "default",
    placeholder,
    value,
    onChange,
    returnKeyType = "done",
    onSubmitEditing = () => null,
    autoCorrect = true,
}) => (
    <Container>
        <TextInput
            onChangeText={onChange}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            autoCorrect={autoCorrect}
        />
    </Container>
);

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf(["default", "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"]),
    autoCapitalize: PropTypes.oneOf(["none", "sentences", "words", "characters"]),
    onChange: PropTypes.func.isRequired,
    returnKeyType: PropTypes.oneOf(["done", "go", "next", "search", "send"]),
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool,
};

export default AuthInput;
