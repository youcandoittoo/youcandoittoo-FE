import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ user, onLoginClick, logout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [interviewMenuOpen, setInterviewMenuOpen] = useState(false); // 드롭다운 메뉴
  const [logoutMenuOpen, setLogoutMenuOpen] = useState(false); // 로그아웃 메뉴

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="tab-header">
      {/* 좌측 로고 */}
      <div className="logo-wrap" onClick={() => navigate("/")}>
        <img src="/logo192.png" alt="Logo" className="logo-img" />
        <div className="logo-text">
          <div className="logo-title">You Can Do It</div>
          <div className="logo-desc">
            A Global Interview Intelligence Platform
          </div>
        </div>
      </div>

      {/* 가운데 탭들 */}
      <div className="tab-wrapper">
        <div
          className={`tab ${
            isActive("/") && location.pathname === "/" ? "active" : ""
          }`}
          onClick={() => navigate("/")}
        >
          Home
        </div>

        <div
          className={`tab ${
            isActive("/resume-manager") || isActive("/resume-interview")
              ? "active"
              : ""
          } ${!user ? "disabled-tab" : ""}`}
          onClick={() => {
            if (user) navigate("/resume-manager");
          }}
        >
          Self-introduction Manager
        </div>

        <div
          className={`tab dropdown-wrapper ${
            isActive("/select") ||
            isActive("/interview") ||
            isActive("/resume-pick")
              ? "active"
              : ""
          } ${!user ? "disabled-tab" : ""}`}
          onClick={() => {
            if (user) navigate("/select");
          }}
          onMouseEnter={() => user && setInterviewMenuOpen(true)}
          onMouseLeave={() => user && setInterviewMenuOpen(false)}
        >
          <div className="tab-label">AI Interview</div>
        </div>

        <div
          className={`tab ${isActive("/record") ? "active" : ""} ${
            !user ? "disabled-tab" : ""
          }`}
          onClick={() => {
            if (user) navigate("/record");
          }}
        >
          Record
        </div>
      </div>
      {/* 우측 유저 영역 */}
      <div className="login-section">
        {user ? (
          <div
            className="user-hover-wrap"
            onMouseEnter={() => setLogoutMenuOpen(true)}
            onMouseLeave={() => setLogoutMenuOpen(false)}
          >
            <div className="user-name">{user.name}</div>

            {/* 상태로 조건부 렌더링 */}
            {logoutMenuOpen && (
              <div className="logout-hover-menu">
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={onLoginClick}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
