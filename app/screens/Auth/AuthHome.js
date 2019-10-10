import React from "react";
import constants from "../../constants";
import styled from "styled-components/native";
import AuthButton from "../../components/AuthButton";

const AuthView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  width: ${constants.width / 2.5};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
  color: ${props => props.theme.blueColor};
  margin-top: 20px;
  font-weight: 600;
`;

export default ({ navigation }) => (
  <AuthView>
    <Image
      resizeMode={"contain"}
      source={require("../../assets/font-logo.png")}
    />
    <AuthButton
      text={"Create New Account"}
      onPress={() => navigation.navigate("Signup")}
    />
    <Touchable onPress={() => navigation.navigate("Login")}>
      <LoginLink>
        <LoginLinkText>Log in</LoginLinkText>
      </LoginLink>
    </Touchable>
  </AuthView>
);
