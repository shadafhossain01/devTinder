import React, { useEffect } from "react"; 
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../utils/constant";
import { addFeedUser } from "../store/slices/feedSlice";
import FeedCard from "../components/FeedCard";

const Home = () => {
  const dispatch=useDispatch()
  const feedUser=useSelector(state=>state.feed)

  const getFeedData=async()=>{
    const res= await axios.get(BaseUrl + "/user/feed",{withCredentials:true});
     dispatch(addFeedUser(res.data.data));
  }

  useEffect(()=>{
    getFeedData()
  },[])

  if(feedUser.length==0){
        return (
          <h2 className="text-center font-semibold text-[24px]">
            No New User Found
          </h2>
        );
  }

  return feedUser.length>0 && <div className="flex justify-center items-center pb-10">
    <FeedCard user={feedUser[0]}/>
  </div>;
};

export default Home;
