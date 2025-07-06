import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SelectInterviewPage from "./pages/SelectInterviewPage";
import ResumeInterviewPage from "./pages/ResumeInterviewPage"; 
import JobPostInterviewPage from "./pages/JobPostInterviewPage";
import CategoryInterviewPage from "./pages/CategoryInterviewPage";
import InterviewSession from "./pages/InterviewSession";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/select" element={<SelectInterviewPage />} />
        <Route path="/resume-interview" element={<ResumeInterviewPage />} />
        <Route path="/jobpost-interview" element={<JobPostInterviewPage />} />
        <Route path="/category-interview" element={<CategoryInterviewPage />} />
         <Route path="/interview-session" element={<InterviewSession />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;