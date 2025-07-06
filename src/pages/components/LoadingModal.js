import React from "react";
import "./LoadingModal.css";

function LoadingModal({ onCancel }) {
  return (
    <div className="loading-overlay">
      <div className="loading-box">
        <button className="close-button" onClick={onCancel}>×</button>
        <div className="loading-icon">🔍</div>
        <p className="loading-text">AI가 자소서를 학습 중 입니다.</p>
        <div className = "loading-deco">⌛</div>
        <div className="loading-bar">
          <div className="loading-progress" style={{ width: "20%" }}></div>
        </div>
        <p className="loading-percentage">20% 완료</p>
      </div>
    </div>
  );
}

export default LoadingModal;
