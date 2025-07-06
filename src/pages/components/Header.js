import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="tab-header">
      <img
        src="/logo192.png"
        alt="Logo"
        className="logo-img"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      />

      <div
        className={`tab ${isActive("/select") ? "active" : ""}`}
        onClick={() => navigate("/select")}
      >
        Select Interview
      </div>

      <div
        className="tab dropdown-wrapper"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <div className={`tab-label ${isActive("/resume-interview") || isActive("/jobpost-interview") || isActive("/category-interview") || isActive("/interview-session") ? "active" : ""}`}>
          AI Interview
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu absolute-dropdown">
            <div
              className="dropdown-item resume"
              onClick={() => navigate("/resume-interview")}
            >
              📄 Resume Interview
            </div>
            <div
              className="dropdown-item jobpost"
              onClick={() => navigate("/jobpost-interview")}
            >
              📑 Job Post Interview
            </div>
            <div
              className="dropdown-item category"
              onClick={() => navigate("/category-interview")}
            >
              🧠 Category Interview
            </div>
          </div>
        )}
      </div>

      <div className="tab">Record</div>
    </div>
  );
}

export default Header;
