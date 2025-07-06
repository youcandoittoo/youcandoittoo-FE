import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css";
import "./ResumeInterviewPage.css";
import Header from "./components/Header";
import LoadingModal from "./components/LoadingModal";

function ResumeInterviewPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/interview-session");
    }, 2000); // 2초 뒤 전환
  };

  const handleCancelLoading = () => {
    setLoading(false);
  };

  return (
    <div className="select-page-container">
      <div className="bar"></div>
      <div className="select-page-card">
        <Header />
        <hr className="hero-divider" />

        <div className="resume-card">
          <div className="resume-header">
            <div
              className="icon-circle"
              style={{ backgroundColor: "#e6f4ec", color: "#2e7d32" }}
            >
              📄
            </div>
            <h3 className="card-title">
              AI Interview Based on Resume (Self-Introduction)
            </h3>
            <button className="start-button" onClick={handleStart}>
              Start
            </button>
          </div>
          <hr className="hero-divider" />

          <div className="resume-input-grid">
            <textarea
              className="resume-textarea"
              placeholder="자기소개서 내용을 입력해주세요..."
            />
            <div className="resume-file-box">
              첨부 파일 (ex : PDF, DOC)...
            </div>
          </div>
        </div>

        <footer className="footer">
          © 2025 야 너도 할 수 있어_AI면접 프로그램 | Designed by Soonchunhyang Univ.
        </footer>

        {loading && <LoadingModal onCancel={handleCancelLoading} />}
      </div>
    </div>
  );
}

export default ResumeInterviewPage;
