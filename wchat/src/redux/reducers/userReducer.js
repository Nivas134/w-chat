import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
    currentChat: { name: null },
    messages: null,
    uniqueChats: null,
    updateChatsFunc: null,
    tempUniqueChatID: null,
    lastMessages: null,
    filteredFriendsListReducer: [],
    friendsListReducer: [],
    lastMessagedUserReducer: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      state.currentChat = { name: null };
      state.messages = null;
      state.uniqueChats = null;
      state.updateChatsFunc = null;
      state.tempUniqueChatID = null;
      state.lastMessages = null;
      state.filteredFriendsListReducer = [];
      state.friendsListReducer = [];
    },
    setCurrentChat: (state, action) => {
      // console.log("setCurrentChat", action.payload);
      // console.log("ERRRRRRR", "0000000");
      state.currentChat = action.payload;
      // console.log("ERRRRRRR", "0000000");
    },
    setMessagesReducer: (state, action) => {
      console.log("UserMessagesPayload", action.payload);
      state.messages = action.payload;
    },
    setuniqueChatsReducer: (state, action) => {
      console.log("uniqueChats...", action.payload);
      state.uniqueChats = action.payload;
    },
    setUpdateChatsFunc: (state, action) => {
      state.updateChatsFunc = action.payload;
    },
    setTempUniqueChatID: (state, action) => {
      state.tempUniqueChatID = action.payload;
    },
    setLastMessageReducer: (state, action) => {
      state.lastMessages = action.payload;
    },
    setFilteredFriendsListReducer: (state, action) => {
      state.filteredFriendsListReducer = action.payload;
    },
    setFriendsListReducer: (state, action) => {
      state.friendsListReducer = action.payload;
    },
    setLastMessagedUserReducer: (state, action) => {
      state.lastMessagedUserReducer = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setCurrentChat,
  setMessagesReducer,
  setuniqueChatsReducer,
  setUpdateChatsFunc,
  setTempUniqueChatID,
  setLastMessageReducer,
  setFilteredFriendsListReducer,
  setFriendsListReducer,
  setLastMessagedUserReducer,
} = userSlice.actions;

export default userSlice.reducer;
