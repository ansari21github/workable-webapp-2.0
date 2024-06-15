import React, { useEffect, useState } from "react";
import JobsCard from "../components/JobsCard";
import Footer from "../components/Footer";
import User from "../components/User";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

function BookmarkedJobs() {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  console.log(bookmarks);

  useEffect(() => {
    // Set bookmarkedJobs state whenever bookmarks in the Redux store change
    if (Array.isArray(bookmarks)) {
      setBookmarkedJobs(bookmarks);
    }
  }, [bookmarks]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-custom-blue py-4 px-5 xl:px-28 flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              alt="Logo"
              className="h-16 w-42"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1 text-white font-bold">
            <Link to="/jobs">Search for jobs </Link>
            <IoSearch className="text-[20px] mt-1" />
          </div>
          <User />
        </div>
      </div>
      <div className="px-6 xl:px-28 my-5">
        <div className="text-gray-700 text-2xl font-semibold">
          Bookmarked Jobs
        </div>
        <div className="text-gray-500 text-base font-semibold">
          {bookmarkedJobs.length} results
        </div>
      </div>

      <div className="flex flex-col px-5 md:px-10 xl:px-28 my-6 space-y-4">
        {bookmarkedJobs.map((job) => (
          <div key={job.id}>
            <JobsCard key={job.id} {...job} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default BookmarkedJobs;
