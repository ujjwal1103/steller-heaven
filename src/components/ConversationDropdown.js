import React, { useEffect, useRef } from "react";
import { makeRequest } from "../api/makeRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConversation,
  setFriend,
  setMessages,
} from "../redux/slices/messengerSlice";
import { findFriend } from "../utils/findFriend";
import { motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
const ConversationDropdown = ({
  conversationId,
  setCurrentConversation,
  setClose,
  userId,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const conversation = useSelector((state) => state.messenger.conversation);

  const handleDeleteMessages = async () => {
    try {
      const {data} = await makeRequest.delete(`messages/${conversationId}`);
      if (data.isSuccess) {
        dispatch(setMessages([]));
        setClose(false);
      }
    } catch (error) {
      setClose(false);
      console.log(error);
    }
  };

  useClickOutside(ref, () => {
    setClose(false);
  });

  useEffect(() => {
    setCurrentConversation(conversation);
    const friend = findFriend(conversation?.participants, userId);
    dispatch(setFriend(friend));
  }, [conversation, dispatch, setCurrentConversation, userId]);

  const handleDeleteConversation = async () => {
    try {
      const res = await makeRequest.delete(`conversation/${conversationId}`);
      if (res.data.isSuccess) {
        dispatch(deleteConversation(conversationId));
        setClose(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -120 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      exit={{ opacity: 0, y: -120 }}
      className="w-52 z-10 p-2 absolute right-0 rounded bg-gray-50 shadow-md border"
      ref={ref}
    >
      <button
        onClick={handleDeleteMessages}
        className="p-2 w-full hover:bg-gray-200"
      >
        Clear Messages
      </button>
      <button
        onClick={handleDeleteConversation}
        className="p-2 w-full hover:bg-gray-200"
      >
        Delete converstion
      </button>
    </motion.div>
  );
};

export default ConversationDropdown;
