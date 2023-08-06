import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  conversation: {},
  friend: {},
  messages: [],
  onlineUsers: [],
};

const messengerSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setConversation(state, action) {
      state.conversation = action.payload;
    },
    setFriend(state, action) {
      state.friend = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    deleteConversation(state, action) {
      const conversationIdToDelete = action.payload;
      state.conversations = state.conversations.filter(
        (conversation) => conversation._id !== conversationIdToDelete
      );

      // Find the index of the conversation that should be active after deletion
      const currentIndex = state.conversations.findIndex(
        (conversation) => conversation._id === conversationIdToDelete
      );

      if (currentIndex !== -1) {
        // If the deleted conversation was not the last one in the array
        // Set the active conversation to the previous conversation
        state.conversation = state.conversations[currentIndex - 1];
      } else if (state.conversations.length > 0) {
        // If the deleted conversation was the last one in the array
        // Set the active conversation to the last conversation in the array
        state.conversation = state.conversations[state.conversations.length - 1];
      } else {
        // If there are no conversations left after deletion
        // Set the active conversation to an empty object or null
        state.conversation = null;
      }
    },
    navigateConversation(state, action) {
      const conversationIdToFind = action.payload;
      const currentIndex = state.conversations.findIndex(
        (conversation) => conversation._id === conversationIdToFind
      );

      if (currentIndex !== -1) {
        state.conversation = state.conversations[currentIndex];
      } else {
        const nextIndex = state.conversations.findIndex(
          (conversation) => conversation._id !== state.conversation._id
        );

        if (nextIndex !== -1) {
          state.conversation = state.conversations[nextIndex];
        }
      }
    },
  },
});

export const {
  setConversations,
  setConversation,
  setMessages,
  addMessage,
  setFriend,
  setOnlineUsers,
  navigateConversation,
  deleteConversation,
} = messengerSlice.actions;
export default messengerSlice.reducer;
