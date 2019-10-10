import React from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { USER_FRAGMENT } from "../fragments";
import { gql } from "apollo-boost";
import Post from "../components/Post";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";
import { ScrollView } from "react-native-gesture-handler";

const GET_USER = gql`
  query userDetail($username: String!) {
    userDetail(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const Detail = ({ navigation }) => {
  const { loading, data } = useQuery(GET_USER, {
    variables: { username: navigation.getParam("username") }
  });
  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.userDetail && <UserProfile {...data.userDetail} />
      )}
    </ScrollView>
  );
};

export default Detail;
