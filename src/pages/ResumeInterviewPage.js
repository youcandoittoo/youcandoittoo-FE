import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CommonStyles.css";
import "./ResumeInterviewPage.css";
import Header from "../components/Header";
import ResumeLoadingModal from "../components/ResumeLoadingModal";
import { useAuth } from "../context/AuthContext";
import ParticleBackground from "../components/ParticleBackground";
import ProtectedRoute from "../components/ProtectedRoute";

function ResumeInterviewPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");

  const [uploadMode, setUploadMode] = useState("none"); // none | file | direct
  const [fileName, setFileName] = useState("");
  const [directContent, setDirectContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [saveResult, setSaveResult] = useState(null);

  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setUploadMode("file");
    }
  };

  const handleDirectInput = () => {
    setUploadMode("direct");
    setFileName("");
  };

  const resetUploadMode = () => {
    setUploadMode("none");
    setFileName("");
    setDirectContent("");
  };

  const handleSave = () => {
    if (!title || !company || !position) {
      alert("제목, 기업명, 직무를 모두 입력해주세요.");
      return;
    }

    if (uploadMode === "none") {
      alert("파일 첨부 또는 직접 입력을 선택해주세요.");
      return;
    }

    setLoading(true);
    setSaveResult(null);

    const fail = Math.random() < 0.2;

    setTimeout(() => {
      if (fail) {
        setSaveResult("fail");
        return;
      }

      // 저장 성공 처리
      setSaveResult("success");
    }, 2000);
  };

  // ✅ 저장 성공 시 resume-manager로 이동
  useEffect(() => {
    if (saveResult === "success") {
      const timer = setTimeout(() => {
        navigate("/resume-manager");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [saveResult, navigate]);

  return (
    <>
      <ProtectedRoute />
      <ParticleBackground />

      <div className="interview-page-wrapper">
        <div className="bar-background"></div>
        <div className="content-wrapper">
          <div className="custom-card">
            <Header user={user} logout={logout} />

            <h2 className="card-title">자기소개서 입력</h2>

            <div className="resume-input-section">
              <input
                type="text"
                className="input-field"
                placeholder="✏️ 제목을 입력하세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="✏️ 지원 기업명을 입력하세요."
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                type="text"
                className="input-field"
                placeholder="✏️ 지원 직무를 입력하세요."
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />

              <div className="upload-box">
                {uploadMode === "none" && (
                  <>
                    <div className="upload-options">
                      <button
                        className="upload-btn"
                        onClick={handleUploadClick}
                      >
                        ⬇️ <span className="upload-label">파일 첨부</span>
                      </button>
                      <span className="or-text">또는</span>
                      <button
                        className="upload-btn"
                        onClick={handleDirectInput}
                      >
                        🖊️ <span className="upload-label">직접 입력</span>
                      </button>
                    </div>
                    <div className="upload-info">
                      <p>업로드 가능 용량 : 100.00MB</p>
                      <p>업로드 가능 확장자: .hwp .doc .docx .pdf</p>
                    </div>
                  </>
                )}

                {uploadMode === "file" && (
                  <div className="file-preview">
                    <p>📄 선택한 파일: {fileName}</p>
                    <button className="upload-btn" onClick={resetUploadMode}>
                      🔄 편집 방식 변경
                    </button>
                  </div>
                )}

                {uploadMode === "direct" && (
                  <div className="direct-input">
                    <div
                      className="read-only-field"
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) =>
                        setDirectContent(e.currentTarget.textContent)
                      }
                      style={{ minHeight: "150px", whiteSpace: "pre-wrap" }}
                    ></div>
                    <button className="upload-btn" onClick={resetUploadMode}>
                      🔄 편집 방식 변경
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".hwp,.doc,.docx,.pdf"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <button className="save-btn" onClick={handleSave}>
              저장하기
            </button>
          </div>

          <footer className="footer">
            © 2025 야 너도 할 수 있어_AI면접 프로그램 | Designed by
            Soonchunhyang Univ.
          </footer>

          {loading && (
            <ResumeLoadingModal
              mode="save"
              result={saveResult}
              onCancel={() => setLoading(false)}
              onCloseResult={() => setSaveResult(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ResumeInterviewPage;
