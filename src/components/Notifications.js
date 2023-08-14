import { useRef } from "react";

const Notifications = ({ notifications, setNotifications }) => {
  const notificationRef = useRef();


  return (
    <div
      ref={notificationRef}
      className="absolute text-gray-900 bg-gray-50 shadow-lg p-3 right-0 top-12 w-96 flex flex-col gap-4 rounded-md"
    >
      {notifications?.length === 0 && (
        <span className="text-center ">No Notificataions</span>
      )}
      {notifications?.map((noty, index) => {
        return (
          <h1 key={index} className="text-gray-900">
            {noty}
          </h1>
        );
      })}
      {notifications?.length > 0 && (
        <button
          onClick={() => setNotifications([])}
          className="bg-blue-500 p-2 text-gray-50 rounded-md"
        >
          Clear Notifications
        </button>
      )}
    </div>
  );
};

export default Notifications;
