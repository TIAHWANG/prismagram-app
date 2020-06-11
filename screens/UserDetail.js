import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { StyleSheet, ScrollView } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
    query seeUser($username: String!) {
        seeUser(username: $username) {
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

export default ({ route }) => {
    const { username } = route.params;
    const { loading, data } = useQuery(GET_USER, { variables: { username } });
    return <ScrollView style={styles.ScrollView}>{loading ? <Loader /> : data && data.seeUser && <UserProfile {...data.seeUser} />}</ScrollView>;
};
