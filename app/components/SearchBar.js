import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import styles from "../styles";

const TextInput = styled.TextInput`
  width: ${constants.width - 40};
  height: 35px;
  background-color: ${styles.lightGreyColor};
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const SearchBar = ({ onChange, value, onSubmit }) => {
  return (
    <TextInput
      returnKeyType="search"
      onChangeText={onChange}
      onEndEditing={onSubmit}
      value={value}
      placeholder={"Search"}
      placeholderTextColor={styles.darkGreyColor}
    />
  );
};

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
