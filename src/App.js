import React from "react";
import './styles/theme.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import SelectInterviewPage from "./pages/SelectInterviewPage";
import ResumeInterviewPage from "./pages/ResumeInterviewPage"; 
import JobPostInterviewPage from "./pages/JobPostInterviewPage";
import CategoryInterviewPage from "./pages/CategoryInterviewPage";
import InterviewSession from "./pages/InterviewSession";
import { AuthProvider } from "./context/AuthContext"; // 추가
import ResumeManagerPage from "./pages/ResumeManagerPage";
import ResumePickPage from "./pages/ResumePickPage";
import RecordListPage from './pages/record/RecordListPage';
import RecordDetailPage from './pages/record/RecordDetailPage';
import InterviewResultPage from './pages/interview/InterviewResultPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/select" element={<SelectInterviewPage />} />
          <Route path="/resume-interview" element={<ResumeInterviewPage />} />
          <Route path="/jobpost-interview" element={<JobPostInterviewPage />} />
          <Route path="/category-interview" element={<CategoryInterviewPage />} />
          <Route path="/interview-session" element={<InterviewSession />} />
          <Route path="/resume-manager" element={<ResumeManagerPage />} />
          <Route path="/resume-pick" element={<ResumePickPage />} />
          <Route path="/record" element={<RecordListPage />} />
          <Route path="/record/:recordId" element={<RecordDetailPage />} />
          <Route path="/interview/result/:sessionId" element={<InterviewResultPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
