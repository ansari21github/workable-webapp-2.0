import React from "react";
import Home from "./pages/Home";
import {Route , Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JobDetail from "./pages/JobDetail";
import Jobs from "./pages/Jobs";
import BookmarkedJobs from './pages/BookmarkedJobs';
import JobsApplied from './pages/JobsApplied';

function App() {
  return (
    <>
  
     <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>} />
     <Route path="/signup" element={<Register/>} />
     <Route path="/jobs" element={<Jobs/>} />
     <Route path="/jobs/:id" element={<JobDetail/>} />
     <Route path="/bookmarked-jobs" element={<BookmarkedJobs/>} />
     <Route path="/jobs-applied" element={<JobsApplied/>} />
     </Routes>
    </>
  )
}

export default App
