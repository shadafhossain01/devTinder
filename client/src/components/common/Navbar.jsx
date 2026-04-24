import React from "react";
import { Link, useNavigate } from "react-router";
import {  useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios"
import { BaseUrl } from "../../utils/constant";
import { removeUser } from "../../store/slices/userSlice";
import { removeFeedUser } from "../../store/slices/feedSlice";

const Navbar = () => {
   const user = useSelector((state) => state.user);
   const dispatch=useDispatch()
   const navigate=useNavigate()

  const handleLogout=async()=>{
    await axios.get(BaseUrl + "/logout",{withCredentials:true});
    dispatch(removeUser());
    dispatch(removeFeedUser())
    toast.success(`${user.fullname} logout successfully.`)
    navigate("/login")
  }

  return (
    <div className="navbar bg-base-300 shadow-sm py-4 fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold">
          DevTinder 🧑‍💻
        </Link>

        {user && (
          <div className="flex items-center gap-x-[15px]">
            <h6 className="text-[17px]">
              Welcome , {""}
              <span className="text-primary font-semibold">
                 {user.fullname}
              </span>
            </h6>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Profile Picture" src={user.imageUrl} />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between text-base">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/connections"} className="justify-between text-base">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to={"/requests"} className="justify-between text-base">
                    Requests
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} className="text-base">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
