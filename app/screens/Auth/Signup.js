import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${props => props.theme.lightGreyColor};
  border-style: solid;
`;

export default ({ navigation }) => {
  const fNameInput = useInput(navigation.getParam("email", ""));
  const lNameInput = useInput("");
  const uNameInput = useInput("");
  const emailInput = useInput("");
  const [loading, setLoading] = useState(false);

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
      username: uNameInput.value
    }
  });

  const handleSignup = async () => {
    const { value: email } = emailInput;
    const { value: fName } = fNameInput;
    const { value: lName } = lNameInput;
    const { value: uName } = uNameInput;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("That email is invalid");
    }
    if (fName === "" || lName === "") {
      return Alert.alert("I need your name");
    }
    if (uName === "") {
      return Alert.alert("Invalid username");
    }

    try {
      setLoading(true);
      const {
        data: { createAccount }
      } = await createAccountMutation();

      if (createAccount) {
        Alert.alert("Account created", "Login now~");
        navigation.navigate("Login", { email });
        return;
      }
    } catch (e) {
      setLoading(false);
      Alert.alert("Username taken");
      navigation.navigate("Login", { email });
    }
  };

  const facebookLogIn = async () => {
    try {
      setLoading(true);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "2464353617221271",
        {
          permissions: ["public_profile", "email"]
        }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
        );
        const { email, first_name, last_name } = await response.json();
        updateFormData(email, first_name, last_name);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const googleLogIn = async () => {
    try {
      setLoading(true);
      const result = await Google.logInAsync({
        androidClientId:
          "294451014538-so33kp70iopatgegogr4gfupbjke5j8v.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        let user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${result.accessToken}` }
        });
        const { email, family_name, given_name } = await user.json();
        updateFormData(email, given_name, family_name);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (email, firstName, lastName) => {
    emailInput.setValue(email);
    fNameInput.setValue(firstName);
    lNameInput.setValue(lastName);
    const [username] = email.split("@");
    uNameInput.setValue(username);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...fNameInput}
          placeholder="First name"
          autoCapitalize="words"
        />
        <AuthInput
          {...lNameInput}
          placeholder="Last name"
          autoCapitalize="words"
        />

        <AuthInput
          {...emailInput}
          placeholder="Email"
          keyboardType={"email-address"}
          returnKeyType="send"
          autoCorrect={false}
        />

        <AuthInput
          {...uNameInput}
          placeholder="User name"
          autoCorrect={false}
        />
        <AuthButton loading={loading} text={"Sign up"} onPress={handleSignup} />
        <FBContainer>
          <AuthButton
            loading={loading}
            onPress={() => facebookLogIn()}
            text="Facebook login"
            bgColor={"#2D4DA7"}
          />
          <AuthButton
            loading={loading}
            onPress={() => googleLogIn()}
            text="Google login"
            bgColor={"#EE1922"}
          />
        </FBContainer>
      </View>
    </TouchableWithoutFeedback>
  );
};
