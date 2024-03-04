import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChat } from "../redux/reducers/userReducer";

const ChatsList = React.memo((props) => {
  const { name, email } = props.friend;
  const currentChatUser = useSelector((state) => state.user.currentChat);
  const loggedInUser = useSelector((state) => state.user.user);
  const lastMessagesRuducerState = useSelector(
    (state) => state.user.lastMessages
  );
  // const updateChatsFunc = useSelector((state) => state.user.updateChatsFunc);
  console.log(
    "UUUUUU",
    props,
    lastMessagesRuducerState && lastMessagesRuducerState[email],
    lastMessagesRuducerState,
    email
  );
  const dispatch = useDispatch();

  const setCurrentActiveChat = () => {
    // console.log("UUUUUU", updateChatsFunc);
    // updateChatsFunc();
    dispatch(setCurrentChat(props.friend));
  };

  return (
    <div
      className={`chat-tab ${currentChatUser.name === name ? "active" : ""}`}
      onClick={setCurrentActiveChat}
    >
      <div
        className={`chat-list ${currentChatUser.name === name ? "active" : ""}`}
      >
        <span className="user-label">
          {name.substring(0, 2).toLocaleUpperCase()}
        </span>
        <h6>{name}</h6>
        <p className="last-message">
          {lastMessagesRuducerState && lastMessagesRuducerState[email]}
        </p>
      </div>
    </div>
  );
});

export default ChatsList;
