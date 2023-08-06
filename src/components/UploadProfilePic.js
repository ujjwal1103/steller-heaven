import React, { useState } from "react";
import avatar from "../assets/avatar.svg";
import Button from "../shared/button/Button";
import { storage } from "../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { makeRequest } from "../api/makeRequest";

const UploadProfilePic = ({ profile, setdpUpload }) => {
  const [pic, setPic] = useState(profile?.dp);

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileRef = ref(storage, `images/${file.name}`);
      const res = await uploadBytes(fileRef, file);
      if (res) {
        const url = await getDownloadURL(fileRef);
        setPic(url);
      }
    }
  };

  const handleSave = async () => {
    try {
      const { data } = await makeRequest.put(`user/dp/${profile._id}`, {
        pic: pic,
      });
      console.log(data);
      if (data.isSuccess) {
        console.log(data.user);
        setdpUpload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute inset-0 w-screen h-screen bg-gray-950 bg-opacity-50 flex items-center justify-center">
      <div className="lg:w-1/3 h-1/2 p-3 flex items-center justify-center flex-col gap-10 shadow-lg bg-gray-50 rounded">
        <div>
          <label htmlFor="dp">
            <img
              src={pic ? pic : avatar}
              alt=""
             
              className="w-52 h-52 rounded-full object-cover"
            />
            <input type="file" hidden id="dp" onChange={handleChange} />
          </label>
        </div>

        <div className="flex gap-4 ">
          <Button
            text={"Save"}
            onClick={handleSave}
            className="p-3 w-36 bg-slate-700 text-gray-50"
            disabled={!pic}
          />
          <Button
            text={"Cancel"}
            className="p-3 w-36 bg-slate-300 text-gray-700"
            onClick={() => setdpUpload(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadProfilePic;
