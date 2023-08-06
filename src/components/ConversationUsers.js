import React, { useEffect, useRef, useState } from "react";
import { motion, easeIn } from "framer-motion";
import { makeRequest } from "../api/makeRequest";
import Button from "../shared/button/Button";
import { useClickOutside } from "@react-hookz/web";
import { useDispatch, useSelector } from "react-redux";
import { findFriend } from "../utils/findFriend";
import {
  setConversation,
  setConversations,
  setFriend,
} from "../redux/slices/messengerSlice";

const ConversationUsers = ({
  userId,
  setNewConversation,
  setCurrentConversation,
}) => {
  const ref = useRef();
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  const { conversations } = useSelector((state) => state.messenger);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await makeRequest.get(`conversation/users/${userId}`);
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleChange = async (e) => {
    try {
      const res = await makeRequest.get(
        `conversation/users/${userId}?search=${e.target.value}`
      );
      setUsers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useClickOutside(ref, () => {
    setNewConversation(false);
  });

  const handleConversation = async (id) => {
    try {
      const { data } = await makeRequest.post("conversation", {
        participants: [userId, id],
      });
      if (data?.isSuccess) {
        console.log(data);
        dispatch(setFriend(findFriend(data.conversation.participants, userId)));
        dispatch(setConversations([...conversations, data.conversation]));
        dispatch(setConversation(data.conversation));
        setCurrentConversation(data.conversation);
        setNewConversation(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: "-90vw" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.3, ease: easeIn }}
      exit={{ opacity: 0.4,  y: "-90vh" }}
      className="absolute overflow-hidden transition-all duration-700 bg-gray-50 shadow-md w-96 h-page right-0"
      ref={ref}
    >
      <div className="p-2">
        <input
          type="search"
          onChange={handleChange}
          className="border-b-2 p-2 w-full outline-none"
          placeholder="search user"
        />
      </div>
      <div className="p-2 flex flex-col gap-5 scrollbar-none overflow-y-scroll h-full pb-20">
        <div className="flex justify-end">
          <Button
            text={"close"}
            className={"border-2 p-2 bg-gray-50"}
            onClick={() => {
              setTimeout(() => {
                setNewConversation(false);
              }, 1000);
            }}
          />
        </div>
        {users
          ?.filter((u) => u._id !== userId)
          .map((u, i) => (
            <div
              onClick={() => {
                handleConversation(u?._id);
              }}
              key={u?._id}
              className="bg-gray-200 p-3 flex items-center gap-5"
            >
              <img
                src={u?.dp}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />
              <span>{u?.name}</span>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default ConversationUsers;
