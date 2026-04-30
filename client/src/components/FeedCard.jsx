import axios from "axios";
import React from "react";
import { BaseUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../store/slices/feedSlice";

const FeedCard = ({user}) => {
  const dispatch=useDispatch()

  const handleFeed=async(status,id)=>{
    await axios.post( BaseUrl + `/request/send/${status}/${id}`,{},{withCredentials:true} );
    dispatch(removeFeedUser(id))
  }

  return (
    <div className="card bg-base-300 shadow-sm w-[30%]">
      <img
        src={user.imageUrl}
        alt="User Profile Photo"
        className="w-full object-cover h-100 object-top"
      />
      <div className="card-body">
        <h2 className="card-title">Fullname : {user.fullname}</h2>
        <p className="text-base">
          <span className="font-semibold"> About : </span>
          {user.about || "No Data Found"}
        </p>
        <p className="text-lg">
          <span className="font-semibold"> Age : </span> {user.age}
        </p>
        <p className="text-lg">
          <span className="font-semibold"> Gender : </span> {user.gender}
        </p>
        {user?.skills.length > 0 && (
          <p className="text-lg">
            <span className="font-semibold">
              Skills : {Array.isArray(user?.skills) && user.skills.join(", ")}
            </span>
          </p>
        )}

        {/* interest Btn */}
        <div className="flex justify-between mt-2">
          <button
            className="btn btn-primary w-[40%]"
            onClick={() => handleFeed("interested", user._id)}
          >
            Interested
          </button>
          {/* ignore Btn */}
          <button
            className="btn bg-red-500 w-[40%]"
            onClick={() => handleFeed("ignored", user._id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
