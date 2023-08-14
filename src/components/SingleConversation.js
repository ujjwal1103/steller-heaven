import { useEffect, useState } from "react";
import { setConversation, setFriend } from "../redux/slices/messengerSlice";
import { useDispatch } from "react-redux";
import { findFriend } from "../utils/findFriend";
import { motion } from "framer-motion";
import { makeRequest } from "../api/makeRequest";

const SingleConversation = ({
  userId,
  onlineUsers,
  conversation,
  setCurrentConversation,
  messageReceived,
  socket,
}) => {
  const [isOnline, setIsOnline] = useState(false);
  const [friend, setCurrentFriend] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setCurrentFriend(findFriend(conversation?.participants, userId));
  }, [conversation, userId]);

  useEffect(() => {
    setIsOnline(onlineUsers?.map((o) => o.userId).includes(friend?._id));
  }, [onlineUsers, friend]);

  const swipeVariants = {
    initial: { y: 0 },
    up: { y: -10 },
  };


  const handleConversationClick = async () => {
    dispatch(setFriend(findFriend(conversation?.participants, userId)));
    dispatch(setConversation(conversation));
    setCurrentConversation(conversation);
    if(conversation?._id){
      const res = await makeRequest.put("seen", {conversationId: conversation?._id});
      console.log(res);
    }else{
      console.log("no")
    }
  };

  return (
    <motion.div
      className="flex items-center gap-5  relative cursor-pointer"
      initial="initial"
      whileHover="up"
      variants={swipeVariants}
      onClick={handleConversationClick}
    >
      <img
        src={friend?.dp}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="lg:flex  flex-col hidden ">
        <span className="font-semibold text-xl truncate">{friend?.name}</span>
        {messageReceived.conversationId === conversation._id && (
          <span className="font-semibold ">
            {conversation?.lastMessage &&
              conversation?.lastMessage?.text.slice(0, 20) + "..."}
            ...
          </span>
        )}
      </div>
      {isOnline && (
        <span className="absolute w-4 h-4 bg-green-500 rounded-full top-0 left-0"></span>
      )}
    </motion.div>
  );
};

export default SingleConversation;
