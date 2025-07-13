import React, { useState } from "react";
import "./AuthCard.css";

function AuthCard({ onLoginSuccess, onClose }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 테스트용 로그인 처리
  const handleLogin = () => {
    const fakeUser = { name: "Test User", email };
    onLoginSuccess(fakeUser); // 무조건 로그인 성공 처리
  };

  return (
    <div className="auth-wrapper">
      <div className={`auth-slider ${isSignUp ? "move-left" : ""}`}>
        {/* 로그인 패널 */}
        <div className="panel login-panel">
          <h2>Login</h2>
          <input
            type="text"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>
          <p>Don't have an account?</p>
          <button className="ghost-btn" onClick={() => setIsSignUp(true)}>
            Sign Up
          </button>
        </div>

        {/* 회원가입 패널 */}
        <div className="panel signup-panel">
          <h2>Sign Up</h2>
          <input type="text" className="auth-input" placeholder="Email" />
          <input type="password" className="auth-input" placeholder="Password" />
          <input type="password" className="auth-input" placeholder="Confirm Password" />
          <button className="primary-btn">Sign Up</button>
          <p>Already have an account?</p>
          <button className="ghost-btn" onClick={() => setIsSignUp(false)}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;
