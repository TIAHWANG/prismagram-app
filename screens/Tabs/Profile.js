import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ScrollView, StyleSheet } from "react-native";
import Loader from "../../components/Loader";
import { USER_FRAGMENT } from "../../fragments";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
    {
        me {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor: "white",
    },
});

export default () => {
    const { loading, data } = useQuery(ME);
    return <ScrollView style={styles.ScrollView}>{loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}</ScrollView>;
};
