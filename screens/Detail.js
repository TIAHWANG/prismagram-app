import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { StyleSheet, ScrollView } from "react-native";

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

const styles = StyleSheet.create({
    ScrollView: {
        backgroundColor: "white",
    },
});

const Text = styled.Text``;

export default ({ route }) => {
    const { id } = route.params;
    const { loading, data } = useQuery(POST_DETAIL, { variables: { id } });
    return <ScrollView style={styles.ScrollView}>{loading ? <Loader /> : data && data.seeFullPost && <Post {...data.seeFullPost} />}</ScrollView>;
};
