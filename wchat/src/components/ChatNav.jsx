import React from "react";
import { useSelector } from "react-redux";

function ChatNav() {
  const loggedInUser = useSelector((state) => state.user.user);

  return (
    <div>
      <h6>{loggedInUser?.name}</h6>
    </div>
  );
}

export default ChatNav;
