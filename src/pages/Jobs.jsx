// Jobs.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import JobsCard from "../components/JobsCard";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import User from "../components/User";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // const response = await axios.get("http://localhost:8000/api/jobs");
        const response = await axios.get("https://workable-webapp-backend.onrender.com/api/jobs");

        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (criteria) => {
    const filtered = jobs.filter((job) => {
      return (
        (!criteria.title ||
          job.job_title.toLowerCase().includes(criteria.title.toLowerCase())) &&
        (!criteria.location ||
          job.location
            .toLowerCase()
            .includes(criteria.location.toLowerCase())) &&
        (!criteria.type ||
          job.employment_type.toLowerCase() === criteria.type.toLowerCase()) &&
        (!criteria.mode ||
          job.mode.toLowerCase() === criteria.mode.toLowerCase()) &&
        (!criteria.experience ||
          job.experience.toLowerCase() === criteria.experience.toLowerCase())
      );
    });
    setFilteredJobs(filtered);
  };

  return (
    <div>
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between py-2 bg-custom-blue px-5 xl:px-28">
        <div className="flex justify-center items-center">
          <Link to="/">
            <img
              src="https://workablehr-ui.s3.amazonaws.com/job-board/assets/jobs-by-workable-logo.png"
              className="h-16 w-42 p-2 mx-auto"
              alt="Workable Logo"
            />
          </Link>
        </div>
        <div className="mt-5">
          <User />
        </div>
      </div>
      {/* Search bar section */}
      <div className="shadow-xl p-6 border-b border-gray-200 bg-white sticky top-0">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex flex-col px-5 md:px-10 xl:px-28 my-5">
        <div className="text-gray-500 text-[17px] font-semibold">
          {filteredJobs.length} results
        </div>
      </div>
      {/* Jobs listing section */}
      <div className="flex flex-col px-5 md:px-10 xl:px-28 my-6 space-y-4">
        {filteredJobs.map((job) => (
          <div key={job._id}>
            <JobsCard key={job._id} {...job} />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
