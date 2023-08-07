import React, { useEffect, useState, Suspense } from "react";

import { makeRequest } from "../api/makeRequest";
import { getCurrentUser } from "../utils/getUser";
import avatar from "../assets/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setConversation,
  setConversations,
  setOnlineUsers,
} from "../redux/slices/messengerSlice";
import Button from "../shared/button/Button";
import { socket } from "../socket";
import { AnimatePresence } from "framer-motion";

import { findFriend } from "../utils/findFriend";
import ConversationUsers from "../components/ConversationUsers";
import Chat from "../components/Chat";
import { FaPlus } from "react-icons/fa";

const LazySingleConversation = React.lazy(() =>
  import("../components/SingleConversation")
);

const Messenger = () => {
  const { user } = getCurrentUser();
  const [currentConversation, setCurrentConversation] = useState(null);
  const [newConversation, setNewConversation] = useState(false);

  const [messageReceived, setMessageReceived] = useState("");

  const dispatch = useDispatch();

  const { conversations, onlineUsers } = useSelector(
    (state) => state.messenger
  );

  useEffect(() => {
    getConversations();
  }, [dispatch, messageReceived]);

  useEffect(() => {
    if (socket) {
      socket.emit("addUser", user);
      socket.on("getUsers", (data) => {
        dispatch(setOnlineUsers(data));
        setOnlineUsers(data);
      });
      socket.on("getMessage", (data) => {
        setMessageReceived(data);
        getConversations();
      });
    }
  }, []);
  const getConversations = async () => {
    try {
      const res = await makeRequest.get(`conversations/${user?._id}`);
      if (res.data.isSuccess) {
        dispatch(setConversations(res.data.conversations));
        dispatch(setConversation(res.data.conversations[0]));
        setCurrentConversation(res.data.conversations[0]);
      }
    } catch (error) {}
  };

  return (
    <div className="h-page bg-gray-200  flex overflow-hidden">
      <div className="lg:w-96 w-24 bg-gray-50 lg:flex flex-col h-full shadow-lg relative ">
        <div className="flex p-4 gap-4 items-center text-2xl font-bold">
          <img
            src={user?.dp}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="hidden lg:block">{user?.name}</span>
        </div>
        {!newConversation && (
          <div className="w-16 h-16 bg-gray-50 border-2 hover:bg-gray-200 rounded-full  flex items-center justify-center  absolute outline-2 bottom-20 z-10 -right-8 ring-2 ring-offset-2 ">
            <Button
              icon={<FaPlus />}
              className={"p-5 m-1  rounded-full"}
              onClick={() => setNewConversation(true)}
            />
          </div>
        )}
        <div className="p-2 hidden lg:block">
          <input
            type="search"
            // onChange={handleChange}
            className="border-b-2 p-2 w-full outline-none"
            placeholder="search conversation"
            disabled={conversations.length === 0}
          />
        </div>
        <div className="p-4 flex flex-col gap-5 overflow-y-scroll  scrollbar-none">
          {conversations?.map((p) => (
            <Suspense fallback={<div>Loading...</div>}>
              <LazySingleConversation
                onlineUsers={onlineUsers}
                userId={user?._id}
                conversation={p}
                setCurrentConversation={setCurrentConversation}
                key={p?._id}
                friend={findFriend(
                  currentConversation?.participants,
                  user?._id
                )}
                messageReceived={messageReceived}
              />
            </Suspense>
          ))}
        </div>
      </div>

      <Chat
        socket={socket}
        userId={user?._id}
        onlineUsers={onlineUsers}
        setCurrentConversation={setCurrentConversation}
        currentConversationId={currentConversation?._id}
        messageReceived={messageReceived}
        getConversations={getConversations}
      />

      <AnimatePresence>
        {newConversation && (
          <ConversationUsers
            setCurrentConversation={setCurrentConversation}
            userId={user?._id}
            setNewConversation={setNewConversation}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messenger;
