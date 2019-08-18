import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import UseInput from "../Hooks/UseInput";
import Input from "./Input";
import { Compass, Logo, HeartEmpty, User } from "./Icons";
import { ME } from "../SharedQueries";

const Header = styled.header`
  ${props => props.theme.whiteBox}
  width: 100%;
  background-color: ${props => props.theme.bgColor};
  border: 0;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: center;
  }
  &:last-child {
    margin-left: auto;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  height: auto;
  border-radius: 3px;
  text-align: center;
  width: 80%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;


export default withRouter(({ history }) => {
  const search = UseInput("");
  const { data } = useQuery(ME);
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <HeaderLink to="/">
            <Logo />
          </HeaderLink>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!data.myProfile ? (
            <HeaderLink to="/#">
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.myProfile.username}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});
