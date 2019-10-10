import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation }) => {
  const emailInput = useInput(navigation.getParam("email", ""));
  const [requestSecretMutation, { loading }] = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value
    }
  });

  const handleLogin = async () => {
    const { value } = emailInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(value)) {
      return Alert.alert("That email is invalid");
    }
    try {
      const {
        data: { requestSecret }
      } = await requestSecretMutation();
      if (requestSecret) {
        Alert.alert("Check your email");
        navigation.navigate("Confirm", { email: value });
        return;
      } else {
        Alert.alert("Account not found");
        navigation.navigate("Signup", { email: value });
      }
    } catch (e) {
      Alert.alert("Can`t log in now");
      console.log(e);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          placeholder="Email"
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          {...emailInput}
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} text={"Log In"} onPress={handleLogin} />
      </View>
    </TouchableWithoutFeedback>
  );
};
