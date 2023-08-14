import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { makeRequest } from "../api/makeRequest";
import { addMessage, setMessages } from "../redux/slices/messengerSlice";
import { useDispatch, useSelector } from "react-redux";
import ConversationDropdown from "./ConversationDropdown";
import { AnimatePresence, motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import { BsEmojiWink } from "react-icons/bs";
import ProfileView from "./ProfileView";
const Chat = ({
  userId,
  currentConversationId,
  onlineUsers,
  socket,
  messageReceived,
  setCurrentConversation,
  getConversations
}) => {
  const emojiref = useRef();
  const [error, setError] = useState(null);
  const scrollref = useRef(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const [profileView, setProfileView] = useState(false);
  const { messages, friend } = useSelector((state) => state.messenger);
  const dispatch = useDispatch();

  const [isOnline, setIsOnline] = useState(false);
  const [actions, setActions] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const {_id:friendId} = friend

  useEffect(() => {
    
    if(friendId) setIsOnline(onlineUsers?.map((o) => o.userId).includes(friendId))
  }, [onlineUsers, friendId]);

  useEffect(() => {
    if (messageReceived && messageReceived.sender === friendId) {
      dispatch(addMessage(messageReceived));
    }
  }, [messageReceived, friendId, dispatch]);

  useEffect(() => {
    const getMessages = async () => {
        if(currentConversationId){
            try {
                const {data} = await makeRequest.get(`messages/${currentConversationId}`);
                if (data.isSuccess) {
                  setError("");
                  
                  dispatch(setMessages(data.messages));
                }
              } catch (error) {
                dispatch(setMessages([]));
                setError(error?.response?.data?.message || error?.message);
                console.log(error);
              }
        } 
    };
    getMessages();
  }, [currentConversationId, dispatch]);

  useEffect(() => {

    scrollref && scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, dispatch, currentMessage]);

  const handleEmojiSelect = (emoji) => {
    setCurrentMessage(currentMessage + emoji.native);
  };

  const handleSend = async () => {
    try {
      if (currentMessage.trim()) {
        const res = await makeRequest.post("message", {
          conversationId: currentConversationId,
          sender: userId,
          receiver: friend?._id,
          text: currentMessage,
        });
        if (res.data.isSuccess) {
          dispatch(addMessage(res.data.message));
          getConversations();
          socket.emit("sendMessage", res.data.message);
          setError("");
          setCurrentMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useClickOutside(emojiref, () => {
    setShowEmojiPicker(false);
  });

  if (!friend?._id || !currentConversationId) {
    return (
      <div className="w-full h-full bg-gray-950 flex justify-center items-center flex-col">
        <h1 className=" text-2xl text-gray-50">Start a New Conversation</h1>
      </div>
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ y: -1000 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3, type: "spring" }}
      exit={{ opacity: 0.4, x: "-90vw" }}
      key={currentConversationId}
      className="w-full h-full flex justify-between "
    >
      <div className="w-full h-full flex justify-between flex-col">
        <div className="bg-gray-50 p-5 flex  mb-2 justify-between items-center">
          <div className="flex items-center gap-5  relative cursor-pointer">
            <img
              src={friend?.dp}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
              onClick={() => setProfileView(true)}
            />
            <div className="flex flex-col ">
              <span
                onClick={() => setProfileView(true)}
                className="font-semibold text-xl"
              >
                {friend?.name}
              </span>
              <span className="text-sm text-gray-600">
                {isOnline && "online"}
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="border p-2 hover:bg-gray-200">
              <BiDotsVerticalRounded
                className="text-3xl cursor-pointer"
                onClick={() => setActions((prev) => !prev)}
              />
            </div>
            <AnimatePresence>
              {actions && (
                <ConversationDropdown
                  setCurrentConversation={setCurrentConversation}
                  conversationId={currentConversationId}
                  setClose={setActions}
                  userId={userId}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className=" overflow-y-scroll flex flex-col gap-6 h-full p-6">
          {messages.length > 0 &&
            messages?.map((m) => (
              <div
                key={m._id}
                ref={scrollref}
                className={`w-fit max-w-lg rounded-md
                ${m?.sender === userId && "self-end"}`}
              >
                <Message self={m?.sender === userId} message={m} />
              </div>
            ))}
          {error && <p>Start sending messages</p>}
        </div>
        <div className="p-4 bg-white flex">
          <div className="border rounded-md flex justify-between w-full gap-5 relative">
            {showEmojiPicker && (
              <div className="absolute bottom-20" ref={emojiref}>
                <Picker
                  data={data}
                  set={"Apple"}
                  onEmojiSelect={handleEmojiSelect}
                  showPreview={"none"}
                  previewPosition={"none"}
                />
              </div>
            )}

            <textarea
              type="text"
              className="p-3 w-full text-xl outline-none resize-none  "
              placeholder="type use message here"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            ></textarea>
            <button
              className="text-2xl"
              onClick={() => setShowEmojiPicker(true)}
            >
              <BsEmojiWink />
            </button>
            <button
              className="p-3 text-3xl"
              onClick={handleSend}
              disabled={!currentMessage}
            >
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
      {profileView && (
        <ProfileView profile={friend} setClose={setProfileView} />
      )}
    </motion.div>
  );
};

export default Chat;
