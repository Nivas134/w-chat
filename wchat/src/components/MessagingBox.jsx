import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MessagingBox = React.memo(() => {
  const chattingMessages = useSelector((state) => state.user.messages);
  const loggedInUser = useSelector((state) => state.user.user);
  const uniqueChatID = useSelector((state) => state.user.tempUniqueChatID);

  const [messages, setmessages] = useState({});

  useEffect(() => {
    console.log();
  }, [chattingMessages]);

  return (
    <div className="chatting">
      <ul className="chatting-list">
        {chattingMessages &&
          chattingMessages?.map((msg, index) => {
            {
              console.log(
                "#########.",
                loggedInUser?.email,
                msg?.sender?.email
              );
            }
            return (
              <li
                className={`chat-list-msg ${
                  loggedInUser?.email === msg?.sender?.email ? "right" : "left"
                }`}
              >
                <span
                  className={`msg-label ${
                    loggedInUser?.email === msg?.sender?.email
                      ? "right"
                      : "left"
                  }`}
                >
                  {msg?.sender?.name.substring(0, 2).toLocaleUpperCase()}
                </span>
                <span
                  key={index}
                  className={`chat-msg ${
                    loggedInUser?.email === msg?.sender?.email
                      ? "right"
                      : "left"
                  }`}
                >
                  {msg.message}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
});

export default MessagingBox;
