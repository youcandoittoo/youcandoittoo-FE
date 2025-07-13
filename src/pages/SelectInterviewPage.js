import React from "react";
import "./SelectInterviewPage.css";
import "./CommonStyles.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ParticleBackground from "../components/ParticleBackground";
import ProtectedRoute from "../components/ProtectedRoute";

function InterviewCard({ icon, title, description, details, color, onClick }) {
  return (
    <div className="interview-card" onClick={onClick}>
      <div className="icon-circle" style={{ backgroundColor: color }}>
        {icon}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>
      <ul className="card-details">
        {details.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SelectInterviewPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <>
      <ProtectedRoute />
      <ParticleBackground />
      <div className="interview-page-wrapper">
        {/* 전체 배경용 바 */}
        <div className="bar-background"></div>
        {/* 콘텐츠 영역 */}
        <div className="content-wrapper">
          <div className="custom-card">
            <Header user={user} logout={logout} />

            <hr className="hero-divider" />

            <div className="card-grid">
              <InterviewCard
                icon={
                  <span role="img" aria-label="doc">
                    📄
                  </span>
                }
                title="AI Interview Based on Resume (Self-Introduction)"
                description="Generate customized interview questions based on your submitted self-introduction."
                details={[
                  "Analyze resume content",
                  "Focused questions on personal experience",
                  "Provide in-depth questions",
                ]}
                color="#d6f2e9"
                onClick={() => navigate("/resume-pick")}
              />

              <InterviewCard
                icon={
                  <span role="img" aria-label="posting">
                    📑
                  </span>
                }
                title="AI Interview Based on Job Posting"
                description="Generate job-specific interview questions based on the job posting you’re applying for."
                details={[
                  "Analyze job requirements",
                  "Assess practical skills",
                  "Evaluate company fit",
                ]}
                color="#e1edfb"
                onClick={() => navigate("/jobpost-interview")}
              />

              <InterviewCard
                icon={
                  <span role="img" aria-label="category">
                    🧠
                  </span>
                }
                title="AI Interview by Job Type"
                description="Answer technical and behavioral questions tailored to your job type."
                details={[
                  "Technical questions by field",
                  "Assess technical proficiency",
                  "Evaluate personality and soft skills",
                ]}
                color="#f0e6fb"
                onClick={() => navigate("/category-interview")}
              />
            </div>
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

export default SelectInterviewPage;
