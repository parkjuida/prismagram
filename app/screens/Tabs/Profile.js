import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    myProfile {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
  const { loading, data } = useQuery(ME);

  return (
    <ScrollView>
      {loading ? (
        <Loader />
      ) : (
        data && data.myProfile && <UserProfile {...data.myProfile} />
      )}
    </ScrollView>
  );
};
