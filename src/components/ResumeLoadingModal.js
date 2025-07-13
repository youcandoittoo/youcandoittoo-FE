import React, { useEffect, useState } from "react";
import "./LoadingModal.css";

function ResumeLoadingModal({ onCancel, result, onCloseResult, mode = "save" }) {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (result) {
      const showTimer = setTimeout(() => {
        setShowResult(true);
      }, 500);

      const hideTimer = setTimeout(() => {
        setShowResult(false);
        onCloseResult();
        onCancel();
      }, 2000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [result, onCancel, onCloseResult]);

  // 동적으로 문구 선택
  const loadingText = mode === "edit" ? "🔄자소서 수정 중" : "📝자소서 저장 중";
  const successText = mode === "edit" ? "✅ 수정 완료!" : "✅ 저장 완료!";
  const failText = mode === "edit" ? "❌ 수정 실패. 다시 시도해주세요." : "❌ 저장 실패. 다시 시도해주세요.";

  return (
    <div className="loading-overlay">
      <div className="loading-box">
        {!result && (
          <>
            <button className="close-button" onClick={onCancel}>×</button>
            <div className="loading-icon">🔍</div>
            <p className="loading-text">{loadingText}</p>
            <div className="loading-deco">⌛</div>
            <div className="loading-bar">
              <div className="loading-progress" style={{ width: "70%" }}></div>
            </div>
            <p className="loading-percentage">70% 완료</p>
          </>
        )}

        {result === "success" && showResult && (
          <div className="result-message success">{successText}</div>
        )}

        {result === "fail" && showResult && (
          <div className="result-message fail">{failText}</div>
        )}
      </div>
    </div>
  );
}

export default ResumeLoadingModal;
