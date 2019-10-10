import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../fragments";
import { gql } from "apollo-boost";
import Post from "../components/Post";
import Loader from "../components/Loader";
import { ScrollView } from "react-native-gesture-handler";

const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

const Detail = ({ navigation }) => {
  const { loading, data } = useQuery(POST_DETAIL, {
    variables: { id: navigation.getParam("id") }
  });
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.seeFullPost && <Post {...data.seeFullPost} />
      )}
    </ScrollView>
  );
};

export default Detail;
