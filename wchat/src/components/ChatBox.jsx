import React from "react";
import { useSelector } from "react-redux";
import ChatInputComp from "./ChatInputComp";
import ChatNav from "./ChatNav";
import ChatSearch from "./ChatSearch";
import Chats from "./Chats";
import ChattingNav from "./ChattingNav";
import MessagingBox from "./MessagingBox";

const ChatBox = React.memo(() => {
  const { name } = useSelector((state) => state.user.currentChat);
  const chattingMessages = useSelector((state) => state.user.messages);
  const loggedInUser = useSelector((state) => state.user.user);

  console.log("currentActiveChat", name, "chattingMessages", chattingMessages);

  return (
    <div className="chat-box">
      <div className="chat-nav">
        <ChatNav />
      </div>
      <div className="chat-search">
        <ChatSearch />
      </div>
      <div className="chats">
        <Chats />
      </div>
      <div>
        <div className="chatting-nav">
          <ChattingNav />
        </div>
      </div>
      <div className="chatting-area">
        <MessagingBox />
      </div>
      <div>
        {name && (
          <div className="chat-input">
            <ChatInputComp />
          </div>
        )}
      </div>
    </div>
  );
});

export default ChatBox;
