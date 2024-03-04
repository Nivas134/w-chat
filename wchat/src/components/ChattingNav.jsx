import React from "react";
import { useSelector } from "react-redux";

function ChattingNav() {
  const { name } = useSelector((state) => state.user.currentChat);
  return <div>{name ? name : "ChatBox"}</div>;
}

export default ChattingNav;
