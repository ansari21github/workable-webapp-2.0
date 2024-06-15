import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { RiArrowDropDownLine } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { TbSend } from "react-icons/tb";
import { MdBookmarkBorder } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearBookmarks } from "../slices/bookmarkSlice";
import { logout } from "../slices/jobsAppliedSlice";

function User({ isScrolled }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(clearBookmarks());
    localStorage.removeItem("userEmail");
    dispatch(logout());

    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      {localStorage.getItem("authToken") ? (
        <div className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <img
              src={"/assets/profile.jpg"}
              alt="profile"
              className={`w-[40px] h-[40px] rounded-full border-2 ${
                isScrolled ? "border-word" : "border-white"
              }`}
            />
          </div>
          {open && (
            <div className="rounded border-[1px] border-gray-200 bg-white absolute right-0 top-[40px] w-[200px] shadow-lg z-10 mt-3 px-2">
              <div className="cursor-pointer pl-2 flex items-center gap-4 hover:bg-highlight hover:text-word p-4 text-gray-500 text-[14px]">
                <FaRegCircleUser className="text-lg text-gray-500" /> Your
                Profile
              </div>
              <div className="cursor-pointer hover:text-word pl-2 flex items-center gap-4 hover:bg-highlight p-4 text-gray-500 text-[14px]">
                <TbSend className="text-xl text-gray-500" />
                <Link to="/jobs-applied">Jobs Applied</Link>
              </div>
              <div className="cursor-pointer hover:text-word pl-2 flex items-center gap-4 hover:bg-highlight p-4 text-gray-500 text-[14px]">
                <MdBookmarkBorder className="text-xl text-gray-500" />
                <Link to="/bookmarked-jobs">Bookmarked</Link>
              </div>
              <div
                onClick={handleLogout}
                className="cursor-pointer hover:text-word pl-2 flex items-center gap-4 hover:bg-highlight p-4 text-gray-500 text-[14px]"
              >
                <IoLogOutOutline className="text-xl text-gray-500" />
                Sign Out
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`flex text-[15px] font-bold items-center ${
            isScrolled ? "text-word " : "text-white"
          }`}
        >
          <Link to="/login" className="hover:underline">
            Login / Sign up
          </Link>
        </div>
      )}
    </>
  );
}

export default User;
