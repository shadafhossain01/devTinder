import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 shadow-sm py-4 fixed top-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-2xl font-bold">
          devTinder 🧑‍💻
        </Link>
        <div className="flex items-center gap-x-[15px]">
          <h6 className="text-base">
            Welcome , <span className="text-secondary font-medium">Shadaf Hossain</span>
          </h6>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
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
                <Link className="text-base">Settings</Link>
              </li>
              <li>
                <Link className="text-base">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
