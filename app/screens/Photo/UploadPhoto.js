import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import axios from "axios";

export default ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [fileUrl, setFileUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const photo = navigation.getParam("photo");
  const name = photo.filename;
  const type = photo.filename.split(".")[-1];

  const formData = new FormData();
  formData.append("file", {
    name: photo.filename,
    type: type.toLower.Case(),
    uri: photo.uri
  });
  try {
  const {data:{path}} = await axios.post("http://localhost:4000/api/upload", formData, {
    headers: {
      "content-type": "multipart/form-data"
    }
  });
    setFileUrl(path);
  } catch(e) {
    Alert.alert("Can`t upload now...");
  }

  return (
    <View>
      <Text>Upload photo</Text>
    </View>
  );
};
