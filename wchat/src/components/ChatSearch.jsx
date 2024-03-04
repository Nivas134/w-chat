import Search from "@mui/icons-material/SearchRounded";
import Input from "@mui/joy/Input";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredFriendsListReducer } from "../redux/reducers/userReducer";

function ChatSearch() {
  const allFrineds = useSelector((state) => state.user.friendsListReducer);

  const dispatch = useDispatch();

  const [chatSearchTerm, setchatSearchTerm] = useState("");
  const [filteredFreindsList, setFilteredFriendsList] = useState([]);
  const [allFriendsList, setAllFriendsList] = useState(allFrineds);

  useEffect(() => {
    // console.log("ALL FRIENDS....", allFrineds);
    // setAllFriendsList(allFrineds);
    console.log("ALL FRIENDS serachTerm...", chatSearchTerm);

    setFilteredFriendsList(
      allFriendsList.filter((item) =>
        item.name.toLowerCase().includes(chatSearchTerm.toLowerCase())
      )
    );
  }, [chatSearchTerm]);

  useEffect(() => {
    dispatch(setFilteredFriendsListReducer(filteredFreindsList));
  }, [filteredFreindsList]);

  return (
    <Input
      sx={{
        backgroundColor: "#1d2b3380",
        display: "flex",
        width: "85%",
        color: "#CDD7E1",
        "&:hover": { color: "var(--joy-palette-neutral-300, #CDD7E1)" },
        justifyContent: "center",
        alignItems: "center",
      }}
      startDecorator={<Search />}
      placeholder="Search Chats"
      variant="plain"
      value={chatSearchTerm}
      onChange={(e) => {
        setchatSearchTerm(e.target.value);
      }}
    />
  );
}

export default ChatSearch;
