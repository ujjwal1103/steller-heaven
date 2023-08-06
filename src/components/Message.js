import { format } from "timeago.js";
import { containsOnlyEmojis } from "../utils/validations";
const Message = ({ self, message }) => {
  return (
    <div
      className={`flex flex-col fit max-w-lg p-2 relative rounded-md shadow-lg
         ${self ? "bg-gray-100 text-gray-900" : "bg-gray-500 text-gray-50"} 
       `}
    >
      {containsOnlyEmojis(message.text) ? (
        <span className="text-2xl break-words">{message.text}</span>
      ) : (
        <span className="break-all">{message.text}</span>
      )}
      <span className="text-sm italic text-right">
        {format(message.createdAt)}
      </span>
      {self && (
        <span className="text-sm italic text-right">
          {message.seen ? "yes" : "no"}
        </span>
      )}
    </div>
  );
};

export default Message;
