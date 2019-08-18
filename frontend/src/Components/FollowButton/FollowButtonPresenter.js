import React from "react";
import Button from "../Button";

export default ({ onClick, isFollowing }) => {
  return <Button text={isFollowing ? "Unfollow":"Follow"} onClick={onClick} />;
};
