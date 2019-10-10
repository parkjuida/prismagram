import React, { useState } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { Image, Platform } from "react-native";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import { withNavigation } from "react-navigation";

const Container = styled.View``;

const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const Bold = styled.Text`
  font-weight: 500;
`;

const Location = styled.Text`
  font-size: 12px;
`;

const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const IconContainer = styled.View`
  margin-right: 10px;
`;

const InfoContainer = styled.View`
  padding: 10px;
`;

const Caption = styled.Text``;

const CommentCount = styled.Text`
  margin-top: 5px;
  opacity: 0.5;
  font-size: 12px;
`;

const Post = ({
  user,
  location,
  files = [],
  caption,
  comments = [],
  isLiked: isLikedProp,
  likeCount: likeCountProp,
  id,
  navigation
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });
  const handleLike = async () => {
    setIsLiked(p => !p);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    try {
      await toggleLikeMutation();
    } catch (e) {}
  };
  return (
    <Container>
      <Header>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <Image
            style={{ height: 40, width: 40, borderRadius: 20 }}
            source={{
              uri: user.avatar
            }}
          />
        </Touchable>
        <Touchable
          onPress={() =>
            navigation.navigate("UserDetail", { username: user.username })
          }
        >
          <HeaderUserContainer>
            <Bold>{user.username}</Bold>
            <Location>{location}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>
      <Swiper showsPagination={false} style={{ height: constants.height / 2 }}>
        {files.map(file => (
          <Image
            style={{ width: constants.width, height: constants.height / 2 }}
            key={file.id}
            source={{ uri: file.url }}
          />
        ))}
      </Swiper>
      <InfoContainer>
        <IconsContainer>
          <IconContainer>
            <Touchable onPress={handleLike}>
              <Ionicons
                size={28}
                color={isLiked ? styles.redColor : styles.blackColor}
                name={
                  Platform.OS == "ios"
                    ? isLiked
                      ? "ios-heart"
                      : "ios-heart-empty"
                    : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
                }
              />
            </Touchable>
          </IconContainer>
          <IconContainer>
            <Touchable>
              <Ionicons
                size={28}
                color={styles.blackColor}
                name={Platform.OS === "ios" ? "ios-text" : "md-text"}
              />
            </Touchable>
          </IconContainer>
        </IconsContainer>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Touchable>
          <Caption>
            <Bold>{user.username}</Bold> {caption}
          </Caption>
          <Touchable>
            <CommentCount>See all {comments.length} Comments</CommentCount>
          </Touchable>
        </Touchable>
      </InfoContainer>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      })
    })
  ),
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default withNavigation(Post);
