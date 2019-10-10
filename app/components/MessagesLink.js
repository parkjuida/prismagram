import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";
import NavIcon from "./NavIcon";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;
const Text = styled.Text``;

export default withNavigation(({ navigation }) => (
  <Container onPress={() => navigation.navigate("MessageNavigation")}>
    <NavIcon
      focused={true}
      name={Platform.OS == "ios" ? "ios-paper-plane" : "md-paper-plane"}
    />
  </Container>
));
