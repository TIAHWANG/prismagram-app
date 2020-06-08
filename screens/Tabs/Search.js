import React from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: white;
`;

const Text = styled.Text``;

class Search extends React.Component {
    static navigationOptions = () => ({
        headerTitle: () => <SearchBar value={""} onChange={() => null} onSubmit={() => null} placeholder={"Search"} />,
    });
    render() {
        return (
            <View>
                <Text>Search</Text>
            </View>
        );
    }
}

export default Search;
