import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../api/testApi";
import { logout, setFriendsListReducer } from "../redux/reducers/userReducer";
import ChatsList from "./ChatsList";

const Chats = React.memo(() => {
  const loggedInUser = useSelector((state) => state.user.user);
  //   const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  const lastMessagedUser = useSelector(
    (state) => state.user.lastMessagedUserReducer
  );

  const filteredFreindsList = useSelector(
    (state) => state.user.filteredFriendsListReducer
  );

  // const [filteredFreinds, setFilteredFreinds] = useState(filteredFreindsList);
  const [frineds, setFriends] = useState([]);

  const dispatch = useDispatch();

  let sortList = [...frineds];

  const logoutUser = useCallback(async () => {
    await dispatch(logout());
    window.location = "/login";
  }, [dispatch]);

  useEffect(() => {
    if (!frineds.length) {
      getUsers(token, loggedInUser?.email)
        .then((res) => {
          // console.log("AllUsers", res);
          if (res.code) {
            logoutUser();
          }
          setFriends(
            res.data.filter((item) => item.email !== loggedInUser?.email)
          );
        })
        .catch((err) => {
          console.log("Error while getting users", err);
        });
    }
  }, [token, loggedInUser, logoutUser]);

  useEffect(() => {
    dispatch(setFriendsListReducer(frineds));
    console.log("Resulted sort friends", frineds);
  }, [frineds]);

  useEffect(() => {
    setFriends(filteredFreindsList);
    console.log("ALL FILTERED FRIENDS .... from last", filteredFreindsList);
  }, [filteredFreindsList]);

  // Sorting by last Messaged User
  useEffect(() => {
    console.log(
      "LLLLLLLLLLLLLLLLLLLL - sorted ---",
      lastMessagedUser,
      sortList.sort((a, b) =>
        a.email === lastMessagedUser ? -1 : b.email === lastMessagedUser ? 1 : 0
      )
    );
    setFriends(
      sortList.sort((a, b) =>
        a.email === lastMessagedUser ? -1 : b.email === lastMessagedUser ? 1 : 0
      )
    );
  }, [lastMessagedUser]);

  return (
    <div>
      <div>
        {frineds?.map((friend) => {
          return <ChatsList key={friend.email} friend={friend} />;
        })}
      </div>
    </div>
  );
});

export default Chats;
