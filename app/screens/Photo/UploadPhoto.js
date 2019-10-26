import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback, Image, Text } from "react-native";
import axios from "axios";
import constants from "../../constants";
import styled from "styled-components";
import styles from "../../styles";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../hooks/useInput";
import AuthButton from "../../components/AuthButton";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD_MUTATION = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.TextInput`
  width: ${constants.width / 2};
  height: 20px;
  border-color: ${styles.darkGreyColor};
`;

const Button = styled.TouchableOpacity`
  width: ${constants.width / 1.7};
  height: 20px;
  border-radius: 4px;
`;

export default ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const captionInput = useInput("caption");
  const locationInput = useInput("seoul");

  const [uploadMutation] = useMutation(UPLOAD_MUTATION);
  const photo = navigation.getParam("photo");
  const name = photo.filename;
  const type = photo.filename.split(".")[1];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", { name: name, uri: photo.uri, type: "image/jpeg" });

    try {
      setLoading(true);
      const {
        data: { path }
      } = await axios.post("http://192.168.0.10:4000/api/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
      const {
        data: { upload }
      } = await uploadMutation({
        variables: {
          caption: captionInput.value,
          files: [path],
          location: locationInput.value
        },
        refetchQueries: () => [{ query: FEED_QUERY }]
      });
      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Can`t upload now...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback>
        <View>
          <Image source={photo} style={{ width: 100, height: 100 }} />
          <TextInput
            placeholder="caption"
            onChangeText={captionInput.onChange}
            value={captionInput.value}
          />
          <TextInput
            placeholder="location"
            onChangeText={locationInput.onChange}
            value={locationInput.value}
          />
          <AuthButton
            onPress={handleSubmit}
            text={"upload"}
            loading={loading}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
