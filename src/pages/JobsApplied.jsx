import React, { useEffect, useState } from "react";
import JobsCard from "../components/JobsCard";
import Footer from "../components/Footer";
import User from "../components/User";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getJobsApplied } from "../slices/jobsAppliedSlice";
function JobsApplied() {
  const dispatch = useDispatch();
  const jobsApplied = useSelector((state) => state.jobsApplied);
  const [appliedJobs, setAppliedJobs] = useState([]);
  console.log(jobsApplied);

  useEffect(() => {
    // Fetch bookmarks when component mounts
    dispatch(getJobsApplied());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(jobsApplied)) {
      setAppliedJobs(jobsApplied);
    }
  }, [jobsApplied]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-custom-blue py-2 px-5 xl:px-28 flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              alt="Logo"
              className="h-16 w-42"
            />
          </Link>
        </div>
        <div className="flex text-[15px] text-white font-semibold items-center gap-8">
          <div className="flex gap-1">
            <Link to="/jobs">Search for jobs </Link>
            <IoSearch className="text-[20px]" />
          </div>
          <User />
        </div>
      </div>
      <div className="px-6 xl:px-28 my-5">
        <div className="text-gray-700 text-2xl font-semibold">
          Jobs you've applied to
        </div>
        <div className="text-gray-500 text-base font-semibold">
          {appliedJobs.length} results
        </div>
      </div>
      <div className="flex flex-col px-5 md:px-10 xl:px-28 my-6 space-y-4">
        {appliedJobs.map((jobObj, index) => {
          const { item } = jobObj || {}; // Safely destructure `item`
          if (!item) {
            console.warn(
              `Job object at index ${index} is missing 'item':`,
              jobObj
            );
            return null; // Skip rendering if `item` is undefined
          }

          console.log("Job:", item); // Log each job item for debugging
          return (
            <div key={item.id || index}>
              {" "}
              {/* Use index as fallback key if id is missing */}
              <JobsCard {...item} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default JobsApplied;
