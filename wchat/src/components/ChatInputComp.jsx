import MailIcon from "@mui/icons-material/MailOutlineRounded";
import Send from "@mui/icons-material/SendRounded";
import Input from "@mui/joy/Input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateChatIdByEmail } from "../helpers/generateChatID";
import { socket } from "../helpers/socketServer";
import {
  setLastMessageReducer,
  setLastMessagedUserReducer,
  setMessagesReducer,
  setuniqueChatsReducer,
} from "../redux/reducers/userReducer";

const ChatInputComp = React.memo(() => {
  // dispatch hook
  const dispatch = useDispatch();

  // state selectors
  const allUserMessages = useSelector((state) => state.user.messages);
  const uniqueChats = useSelector((state) => state.user.uniqueChats);
  const loggedInUser = useSelector((state) => state.user.user);
  const receiver = useSelector((state) => state.user.currentChat);
  const currentChatUser = useSelector((state) => state.user.currentChat);
  const lastMessagesRuducerState = useSelector(
    (state) => state.user.lastMessages
  );

  //state
  const [chatMessage, setchatMessage] = useState("");
  const [userMessages, setuserMessages] = useState(allUserMessages);
  // allUserMessages ? allUserMessages : {}
  const [chats, setChats] = useState(uniqueChats);
  const [tempUniqueID, setTempUniqueID] = useState("");
  const [otherUserMessages, setOtheUserMessages] = useState();
  const [userLastMessages, setuserLastMessages] = useState(
    lastMessagesRuducerState
  );
  const [lastUserMessage, setLastUserMessage] = useState({});

  let uniqueChatID = "";

  // Getting uniqueChatId to easily find out chats
  const getUnuiqueChatID = () => {
    return generateChatIdByEmail(loggedInUser?.email, receiver?.email);
  };

  // --------------------------------------- EFFECTIVE START------------------------------//

  // Updating Chats of User

  const updateUserChats = () => {
    uniqueChatID = getUnuiqueChatID();
    const finalChats = {
      sender: loggedInUser?.email,
      receiver: receiver?.email,
      uniqueChatID: uniqueChatID,
      chatMessages: userMessages,
    };
    console.log("ERRRRRR", 1111111);
    chats
      ? setChats({
          ...chats,
          [uniqueChatID]: finalChats,
        })
      : setChats({
          [uniqueChatID]: finalChats,
        });
  };

  useEffect(() => {
    updateUserChats();
    dispatch(setuniqueChatsReducer(chats));
    dispatch(setLastMessageReducer(userLastMessages));
  }, [receiver?.email, userMessages]);

  useEffect(() => {
    setuserMessages(chats && chats[uniqueChatID]?.chatMessages);
    dispatch(setMessagesReducer(chats && chats[uniqueChatID]?.chatMessages));
  }, [receiver?.email]);

  // Updating Messages of User

  useEffect(() => {
    console.log("CHATSSSSS", chats, "OTHERUSERMESSAGES", otherUserMessages);
    dispatch(setuniqueChatsReducer(chats));
  }, [chats]);

  useEffect(() => {
    dispatch(setLastMessagedUserReducer(lastUserMessage));
  }, [lastUserMessage]);

  useEffect(() => {
    socket.on(`message ${loggedInUser?.email}`, (data) => {
      console.log("DATAAAAAAAAAAAAAAAAA", data);
      // TODO newUniqueID === uniqueChatID
      if (currentChatUser.email === data.sender.email) {
        userMessages
          ? setuserMessages([...userMessages, data])
          : setuserMessages([data]);
      } else {
        // Updating Other user chats
        // const newUniqueID = generateChatIdByEmail(
        //   data.receiver.email,
        //   data.sender.email
        // );

        userLastMessages
          ? setuserLastMessages({
              ...userLastMessages,
              [data.sender.email]: data.message,
            })
          : setuserLastMessages({
              [data.sender.email]: data.message,
            });

        setLastUserMessage(data.sender.email);

        const newUniqueID = data.newUniqueID;

        setTempUniqueID(newUniqueID);

        // const otherMsgs =
        //   chats && chats[newUniqueID]
        //     ? [...chats[newUniqueID]?.chatMessages, data]
        //     : [data];

        const otherMsgs =
          chats && chats[newUniqueID]
            ? [...(chats[newUniqueID]?.chatMessages || []), data]
            : [data];

        const nullChats = {
          sender: data.sender.email,
          receiver: data.receiver.email,
          uniqueChatID: newUniqueID,
          chatMessages: otherMsgs,
        };

        console.log("NULL Chat other", data, nullChats);
        // if (chats && chats[newUniqueID] === null) {
        chats
          ? setChats({
              ...chats,
              [newUniqueID]: nullChats,
            })
          : setChats({
              [newUniqueID]: nullChats,
            });
        // alert(`New Message From ${data.sender.name} - ${data.message}`);
        // }
        // let otherUserMessages =
        //   chats && chats[newUniqueID]?.chatMessages
        //     ? [chats[newUniqueID]?.chatMessages, data]
        //     : [data];
        // const otherChats = {
        //   sender: data.sender.email,
        //   receiver: data.receiver.email,
        //   uniqueChatID: newUniqueID,
        //   chatMessages: otherUserMessages,
        // };
        // chats
        //   ? setChats({
        //       ...chats,
        //       [newUniqueID]: otherChats,
        //     })
        //   : setChats({
        //       [newUniqueID]: otherChats,
        //     });
        // dispatch(setuniqueChatsReducer(chats));
      }
    });
    dispatch(setuniqueChatsReducer(chats));
    console.log("MESSAGES", userMessages);
    console.log("IDDDDDDD", uniqueChatID, tempUniqueID);

    // dispatch(setMessagesReducer(chats && chats[uniqueChatID]?.chatMessages));
    if (tempUniqueID == uniqueChatID) {
      dispatch(setMessagesReducer(userMessages));
    }
  }, [userMessages, chats]);

  // ------------------------ EFFECTIVE END ------------------ //
  //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // ----------------------- New Feature start ---------------------//

  // useEffect(() => {
  //   socket.on(`message ${loggedInUser?.email}`, (data) => {
  //     const newUniqueID = generateChatIdByEmail(
  //       data.receiver.email,
  //       data.sender.email
  //     );
  //     setTempUniqueID(newUniqueID);
  //     // setChatUsers({
  //     //   receiver: data.receiver.email,
  //     //   sender: data.sender.email,
  //     // });

  //     setuserMessages((prevUserMessages) => ({
  //       ...prevUserMessages,
  //       [newUniqueID]: [
  //         ...(prevUserMessages?.[newUniqueID] || []), // Use the existing array or create a new one
  //         {
  //           receiver: data.receiver.email,
  //           sender: data.sender.email,
  //           message: data.message,
  //         },
  //       ],
  //     }));

  //     const userChats = {
  //       sender: data.sender.email,
  //       receiver: data.receiver.email,
  //       uniqueChatID: newUniqueID,
  //       chatMessages: userMessages && userMessages[newUniqueID],
  //     };

  //     chats
  //       ? setChats({
  //           ...chats,
  //           [newUniqueID]: userChats,
  //         })
  //       : setChats({
  //           [newUniqueID]: userChats,
  //         });
  //     // }

  //     console.log("MESSAGES-------", userMessages);
  //     // setuserMessages(chats && chats[newUniqueID]?.chatMessages);
  //     // dispatch(setMessagesReducer(userMessages));
  //   });
  //   dispatch(setuniqueChatsReducer(chats));
  //   dispatch(setMessagesReducer(userMessages && userMessages[tempUniqueID]));
  //   console.log(
  //     "userMessages[newUniqueID]----------",
  //     userMessages,
  //     tempUniqueID,
  //     userMessages && userMessages[tempUniqueID]
  //   );
  //   dispatch(setTempUniqueChatID(tempUniqueID));
  // }, [userMessages, receiver?.email]);

  // useEffect(() => {
  //   const newUniqueID = generateChatIdByEmail(
  //     chatUsers.receiver,
  //     chatUsers.sender
  //   );
  //   const userChats = {
  //     receiver: chatUsers.receiver,
  //     sender: chatUsers.sender,
  //     uniqueChatID: newUniqueID,
  //     chatMessages: userMessages && userMessages[newUniqueID],
  //   };

  //   chats
  //     ? setChats({
  //         ...chats,
  //         [newUniqueID]: userChats,
  //       })
  //     : setChats({
  //         [newUniqueID]: userChats,
  //       });
  // }, [userMessages]);

  // ----------------------- New Feature end ---------------------//

  // TODO userMessages

  // sending and Updating messaging list

  //test-----

  // useEffect(() => {
  //   dispatch(setMessagesReducer(userMessages));
  //   dispatch(setTempUniqueChatID(tempUniqueID));
  // }, [userMessages]);

  // useEffect(() => {
  //   socket.on(`message ${loggedInUser?.email}`, (data) => {
  //     const newUniqueID = data.newUniqueID;
  //     setuserMessages((prevUserMessages) => ({
  //       ...prevUserMessages,
  //       [newUniqueID]: [
  //         ...(prevUserMessages?.[newUniqueID] || []), // Use the existing array or create a new one
  //         {
  //           receiver: data.receiver,
  //           sender: data.sender,
  //           message: data.message,
  //         },
  //       ],
  //     }));
  //     console.log("DATAAA-----", data);
  //   });
  //   // setchatMessage("");
  //   dispatch(setMessagesReducer(userMessages));
  //   dispatch(setTempUniqueChatID(tempUniqueID));
  // }, [userMessages]);

  const sendMessage = () => {
    //-----------------------------------------------------
    const newUniqueID = generateChatIdByEmail(
      loggedInUser.email,
      receiver.email
    );
    socket.emit("message", {
      sender: loggedInUser,
      message: chatMessage,
      receiver: receiver,
      lastMessage: chatMessage,
      isSeen: false,
      newUniqueID: newUniqueID,
    });
    //////TODO;
    userMessages
      ? setuserMessages([
          ...userMessages,
          {
            sender: loggedInUser,
            message: chatMessage,
            receiver: receiver,
            lastMessage: chatMessage,
            isSeen: false,
          },
        ])
      : setuserMessages([
          {
            sender: loggedInUser,
            message: chatMessage,
            receiver: receiver,
          },
        ]);

    setLastUserMessage(receiver.email);

    userLastMessages
      ? setuserLastMessages({
          ...userLastMessages,
          [receiver.email]: `You: ${chatMessage}`,
        })
      : setuserLastMessages({
          [receiver.email]: `You: ${chatMessage}`,
        });

    setchatMessage("");

    setTempUniqueID(newUniqueID);
    // console.log(userMessages);
    // -----------------------------------------------------------------
    console.log("userMessages".toUpperCase(), userMessages);
  };

  return (
    <div className="input-comp">
      <div className="chat-input-box">
        <Input
          sx={{
            backgroundColor: "#051423",
            display: "flex",
            width: "85%",
            color: "#CDD7E1",
            "&:hover": { color: "var(--joy-palette-neutral-300, #CDD7E1)" },
            position: "relative",
          }}
          startDecorator={<MailIcon />}
          placeholder="Type a message"
          variant="plain"
          value={chatMessage}
          onChange={(e) => setchatMessage(e.target.value)}
          // TODO
          onKeyDown={(e) =>
            e.key === "Enter" && chatMessage ? sendMessage() : {}
          }
        />
      </div>
      <div>
        {chatMessage && (
          <Send className="send-icon" onClick={chatMessage && sendMessage} />
        )}
      </div>
    </div>
  );
});

export default ChatInputComp;
