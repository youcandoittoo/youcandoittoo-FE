import React, { useState, useEffect } from "react";
import "./ResumeManagerPage.css";
import Header from "../components/Header";
import "../components/Header.css";
import "./CommonStyles.css";
import "./ResumePickPage.css";
import "./ResumeManagerPage.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ParticleBackground from "../components/ParticleBackground";
import { getResumes, updateResume } from "../services/resumeService";
import ProtectedRoute from "../components/ProtectedRoute";
import AILoadingModal from "../components/AILoadingModal"; // ✅ 모달 import

function ResumePickPage() {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [isLearning, setIsLearning] = useState(false); // ✅ 학습 상태
  const { user, logout } = useAuth();

  useEffect(() => {
    getResumes().then(setResumes);
  }, []);

  const filteredResumes = resumes.filter((resume) => {
    const target = resume[searchOption]?.toLowerCase() || "";
    return target.includes(searchTerm.toLowerCase());
  });

  const handleStartInterview = () => {
    setIsLearning(true);
    setTimeout(() => {
      setIsLearning(false);
      navigate("/interview-session");
    }, 2000); // 2초 후 이동
  };

  return (
    <>
      <ProtectedRoute />
      <ParticleBackground />
      <div className="interview-page-wrapper">
        <div className="bar-background"></div>
        <div className="content-wrapper">
          <div className="custom-card">
            <Header user={user} logout={logout} />
            <h2>자기소개서 선택</h2>

            <p>
              저장된 자기소개서를{" "}
              <strong style={{ color: "#2563eb" }}>선택</strong>하고, AI 면접을{" "}
              <strong style={{ color: "#2563eb" }}>시작</strong>하세요.
            </p>
            <div className="search-bar">
              <input
                type="text"
                placeholder={
                  searchOption === "title"
                    ? "제목으로 검색하세요"
                    : searchOption === "company"
                    ? "기업명으로 검색하세요"
                    : "직무로 검색하세요"
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="segmented-control">
                {["title", "company", "position"].map((option) => (
                  <button
                    key={option}
                    className={
                      searchOption === option ? "segment active" : "segment"
                    }
                    onClick={() => setSearchOption(option)}
                  >
                    {option === "title"
                      ? "Title"
                      : option === "company"
                      ? "Company"
                      : "Job"}
                  </button>
                ))}
              </div>
            </div>

            <div className="resume-list">
              {filteredResumes.map((resume) => (
                <div
                  className="resume-card"
                  key={resume.id}
                  onClick={() => setSelectedResume(resume)}
                >
                  <h3>{resume.title}</h3>
                  <p>
                    <strong>기업명:</strong> {resume.company}
                  </p>
                  <p>
                    <strong>직무:</strong> {resume.position}
                  </p>
                  <p className="content-preview">
                    {resume.content.slice(0, 100)}...
                  </p>
                  <p className="date">저장 날짜: {resume.createdAt}</p>
                </div>
              ))}
            </div>

            {selectedResume && (
              <>
                <div
                  className="modal-overlay"
                  onClick={() => setSelectedResume(null)}
                ></div>
                <div className="resume-modal">
                  <div className="resume-modal-body">
                    <div className="resume-meta">
                      <label>제목</label>
                      <div className="read-only-field">
                        {selectedResume.title}
                      </div>

                      <label>기업명</label>
                      <div className="read-only-field">
                        {selectedResume.company}
                      </div>

                      <label>직무</label>
                      <div className="read-only-field">
                        {selectedResume.position}
                      </div>
                    </div>

                    <div className="resume-content">
                      <label>자기소개서</label>
                      <div className="read-only-field scrollable">
                        {selectedResume.content}
                      </div>

                      <p className="date">
                        저장 날짜: {selectedResume.createdAt}
                      </p>

                      <button
                        className="start-btn"
                        onClick={handleStartInterview}
                      >
                        AI 면접 시작
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ✅ AI 학습 모달 표시 */}
            {isLearning && (
              <AILoadingModal onCancel={() => setIsLearning(false)} />
            )}
          </div>
          <footer className="footer">
            © 2025 야 너도 할 수 있어_AI면접 프로그램 | Designed by
            Soonchunhyang Univ.
          </footer>
        </div>
      </div>
    </>
  );
}

export default ResumePickPage;
