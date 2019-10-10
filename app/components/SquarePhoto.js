import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import constants from "../constants";
import { withNavigation } from "react-navigation";

const Image = styled.Image`
  width: ${constants.width / 3};
  height: ${constants.height / 5.5};
`;

const SquarePhoto = ({ navigation, files = [], id }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
    <Image source={{ uri: files[0].url }} />
  </TouchableOpacity>
);

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired
};

export default withNavigation(SquarePhoto);
