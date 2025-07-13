import React, { useState, useEffect } from "react";
import "./ResumeManagerPage.css";
import Header from "../components/Header";
import "../components/Header.css";
import "./CommonStyles.css";
import ParticleBackground from "../components/ParticleBackground";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getResumes, updateResume } from "../services/resumeService";
import ProtectedRoute from "../components/ProtectedRoute";
import ResumeLoadingModal from "../components/ResumeLoadingModal";

function ResumeManagerPage() {
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState("title");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResume, setSelectedResume] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveResult, setSaveResult] = useState(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    getResumes().then(setResumes);
  }, []);

  const filteredResumes = resumes.filter((resume) => {
    const target = resume[searchOption]?.toLowerCase() || "";
    return target.includes(searchTerm.toLowerCase());
  });

  const handleUpdate = () => {
    if (!selectedResume) return;

    setLoading(true);
    setSaveResult(null);

    updateResume(selectedResume.id, selectedResume)
      .then((updated) => {
        setResumes((prev) =>
          prev.map((r) => (r.id === updated.id ? updated : r))
        );
        setSelectedResume(null);
        setIsEditing(false);
        setSaveResult("success");
      })
      .catch(() => {
        setSaveResult("fail");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
    if (selectedResume?.id === id) {
      setSelectedResume(null);
      setIsEditing(false);
    }
    // 서버 연동이 있다면 여기에 API 호출 추가
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
            <h2>자기소개서 관리</h2>
            <button
              className="add-resume-btn"
              onClick={() => navigate("/resume-interview")}
            >
              + 자기소개서 입력
            </button>
            <p>
              저장된 자기소개서를{" "}
              <strong style={{ color: "#2563eb" }}>관리</strong>하고, AI 면접을{" "}
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
                  onClick={() => {
                    setSelectedResume(resume);
                    setIsEditing(false);
                  }}
                >
                  <div className="resume-card-header">
                    <h3>{resume.title}</h3>
                    
                  </div>
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
                  <span
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (
                          window.confirm(
                            "자소서를 삭제하면 복구하지 못합니다. 정말 삭제하시겠습니까?"
                          )
                        ) {
                          handleDelete(resume.id);
                        }
                      }}
                    >
                      🗑️
                    </span>
                </div>
              ))}
            </div>

            {selectedResume && (
              <>
                <div
                  className="modal-overlay"
                  onClick={() => {
                    setSelectedResume(null);
                    setIsEditing(false);
                  }}
                ></div>

                <div className="resume-modal">
                  <label>제목</label>
                  {isEditing ? (
                    <input
                      className="input-field"
                      value={selectedResume.title}
                      onChange={(e) =>
                        setSelectedResume((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <div className="read-only-field">
                      {selectedResume.title}
                    </div>
                  )}

                  <label>기업명</label>
                  {isEditing ? (
                    <input
                      className="input-field"
                      value={selectedResume.company}
                      onChange={(e) =>
                        setSelectedResume((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <div className="read-only-field">
                      {selectedResume.company}
                    </div>
                  )}

                  <label>직무</label>
                  {isEditing ? (
                    <input
                      className="input-field"
                      value={selectedResume.position}
                      onChange={(e) =>
                        setSelectedResume((prev) => ({
                          ...prev,
                          position: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <div className="read-only-field">
                      {selectedResume.position}
                    </div>
                  )}

                  <label>내용</label>
                  {isEditing ? (
                    <textarea
                      className="textarea-field"
                      value={selectedResume.content}
                      onChange={(e) =>
                        setSelectedResume((prev) => ({
                          ...prev,
                          content: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <div
                      className="read-only-field scrollable"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {selectedResume.content}
                    </div>
                  )}

                  <p className="date">저장 날짜: {selectedResume.createdAt}</p>

                  <div className="modal-buttons">
                    {!isEditing ? (
                      <button
                        className="start-btn"
                        onClick={() => setIsEditing(true)}
                      >
                        수정하기
                      </button>
                    ) : (
                      <button className="edit-btn" onClick={handleUpdate}>
                        저장하기
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}

            {loading || saveResult ? (
              <ResumeLoadingModal
                mode="edit"
                result={saveResult}
                onCancel={() => setLoading(false)}
                onCloseResult={() => {
                  setSaveResult(null);
                  setLoading(false);
                }}
              />
            ) : null}
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

export default ResumeManagerPage;
