import React, { useState, useEffect } from "react";
import { IoBriefcaseOutline, IoLocationOutline } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { IoMdBookmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addBookmark,
  removeBookmark,
  getBookmarks,
} from "../slices/bookmarkSlice";
import { removeFromBookmarked } from "../slices/bookmarkSlice";
import { addToBookmarks } from "../slices/bookmarkSlice";

function JobsCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookmarks = useSelector((state) => state.bookmarks);

  useEffect(() => {
    // Fetch bookmarks when component mounts
    dispatch(getBookmarks());
  }, [dispatch]);

  const isBookmarked = (job) => bookmarks.some((j) => j._id === job._id);

  const handleBookmarkClick = async (event, job) => {
    event.preventDefault();
    event.stopPropagation();

    if (!localStorage.getItem("authToken")) {
      navigate("/login");
      console.log("User not logged in");
      return;
    }

    try {
      if (isBookmarked(job)) {
        dispatch(removeBookmark(job));
        dispatch(removeFromBookmarked({ item: job }));
      } else {
        dispatch(addBookmark(job));
        dispatch(addToBookmarks({ item: job }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardClick = () => {
    navigate(`/jobs/${props._id}`);
  };

  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(props.date_posted, "day");

  return (
    <div
      className="flex flex-col md:flex-row justify-between w-full gap-4 border border-gray-100 bg-white shadow-md py-7 px-4 rounded-md cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex gap-5">
        <div>
          <img
            src={`/assets/${props.company}.png`}
            className="h-20 w-20"
            alt={`${props.company} logo`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-[18px] font-semibold text-gren">
            {props.job_title}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <div>at</div>
            <div className="text-gren">{props.company}</div>
            <div className="text-[10px]">
              <LuDot />
            </div>
            <div className="font-semibold">{props.mode}</div>
            <div className="text-[10px]">
              <LuDot />
            </div>
            <div>{props.location}</div>
            <div className="text-[10px]">
              <LuDot />
            </div>
            <div>{props.employment_type}</div>
          </div>
          <div className="text-[13px] text-gray-600">
            Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`}{" "}
            ago
          </div>
        </div>
      </div>
      <div
        className="text-[20px] font-bold text-gray-500"
        onClick={(event) => handleBookmarkClick(event, props)}
      >
        {isBookmarked(props) ? <IoMdBookmark /> : <CiBookmark />}
      </div>
    </div>
  );
}

export default JobsCard;
