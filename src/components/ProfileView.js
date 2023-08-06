import { useClickOutside } from "@react-hookz/web";
import React, { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const ProfileView = ({ profile, setClose }) => {
  const ref = useRef();

  useClickOutside(ref, () => {
    setClose(false);
  });
  return (
    <div className="h-page w-[500px] bg-slate-400" ref={ref}>
      <div className="w-full text-xl text-gray-800 shadow-transparent bg-gray-100 flex p-3 gap-5 items-center">
        <button onClick={() => setClose(false)}>
          <AiOutlineClose />
        </button>
        <span className="text-xl align-middle">Contact Info</span>
      </div>
      <div className="bg-slate-50 p-10 flex flex-col gap-6 justify-center items-center">
        <div className="w-52 h-52 bg-black rounded-full flex justify-center items-center overflow-hidden">
          <img src={profile?.dp} alt="" className="object-cover w-full h-full" />
        </div>
        <div className="text-2xl">
          <span>{profile.name}</span>
        </div>
      </div>
      <div className="bg-slate-50 my-4 p-3  ">
        <div className="text-2xl">
          <h6 className="text-gray-500 text-base">About</h6>
          <span className="text-xl">I am Ujjwal 😜</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
