import React from "react";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p``;

const Posts = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

export default ({ data, loading, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data.userDetail) {
    const {
      userDetail: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <>
        <Helmet>
          <title>Profile | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <Button text="logout" onClick={logOut} />
              ) : (
                <FollowButton id={id} isFollowing={isFollowing} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={postsCount.toString()} /> posts
              </Count>
              <Count>
                <FatText text={followersCount.toString()} /> followers
              </Count>
              <Count>
                <FatText text={followingCount.toString()} /> following
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </>
    );
  } else {
    return null;
  }
};
