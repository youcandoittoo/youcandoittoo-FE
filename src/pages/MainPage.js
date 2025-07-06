import React from "react";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import "./MainPage.css";

function Button({ children, ...props }) {
  return (
    <button className="custom-btn" {...props}>
      {children}
    </button>
  );
}

function Card({ children }) {
  return <div className="custom-card">{children}</div>;
}

function CardContent({ children }) {
  return <div>{children}</div>;
}

function MainPage() {
  const navigate = useNavigate();
  useEffect(() => {
  const items = document.querySelectorAll(".fade-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("show");
        }, index * 200); // 항목별 지연 시간
      }
    });
  }, { threshold: 0.3 });

  items.forEach(item => observer.observe(item));

  return () => observer.disconnect();
}, []);
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="source-text">
          © 2025 야 너도 할 수 있어_AI면접 프로그램 | Designed by Soonchunhyang Univ.
        </div>
        <div className="header-inner">
          <div className="logo-area">
            <img src="/logo192.png" alt="Logo" className="logo-img" />
            <div>
              <div className="logo-title">You Can Do It</div>
              <div className="logo-desc">A Global Interview Intelligence Platform</div>
            </div>
          </div>
          <nav className="nav-menu">
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Work</a>
            <a href="#" className="nav-link">Services</a>
            <a href="#" className="nav-link">Pricing</a>
          </nav>
          <Button className="login-btn">Login</Button>
        </div>
      </header>
      <div className="custom-card hero-card">
        <section className="hero-section">
          <div className="big-logo">
            Trusted by <span className="blue-text">ambitious</span> job seekers<br />
            and <span className="blue-text2">forward-thinking</span> teams
          </div>
          <div className="hero-btn-wrap">
            <Button className="start-btn" onClick={() => navigate("/select")}>Start</Button>
          </div>
          <div className="hero-desc-link">
            <h5 className="desc-link">
              “<span className="underline">AI Interview</span>, Built for the <span className="underline">Future of Work</span>.”
            </h5>
          </div>
          <hr className="hero-divider" />

          <section className="info-image-section">
            <div className="info-texts">
              <h2 className="infor-desc-title">AI Interviews, Built for Growth</h2>
              <h4 className="infor-desc-sub">Tailored for students, job<br/> seekers, and career changers.</h4>
              <p className="infor-desc">
                Launched in collaboration with universities,<br />
                AI Interview is an AI-powered platform that helps users<br />
                build confidence, practice effectively, and receive<br />
                objective feedback.<br />
                From first-time job seekers to professionals preparing for a
                career pivot,
                <br />we deliver smart, structured interview experiences—<br />
                anytime, anywhere.
              </p>
            </div>
            <img
              src="/ai-robot.png"
              alt="AI Interview Illustration"
              className="info-big-img"
            />
          </section>
        </section>

        <section className="stats-section">
          <div>
            <p className="stats-number">3,000+</p>
            <p className="stats-desc">Interview sessions analyzed</p>
          </div>
          <div>
            <p className="stats-number">20+</p>
            <p className="stats-desc">Partner universities and institutions</p>
          </div>
          <div>
            <p className="stats-number">15,000+</p>
            <p className="stats-desc">
              Users served<br />
              Since 2025 Continuous AI-driven growth
            </p>
          </div>
        </section>
        <hr className="hero-divider" />

        <section className="resume-section">
          <div className="small-text">*Introduction to Features 01</div>
          <div className="resume-flex">
            <div className="resume-texts">
              <h2 className="card-title">
                AI Interview Based on Resume <br />(Self-Introduction)
              </h2>
              <h3 className="card-desc1">Tailored for students, job<br /> seekers, and career changers.</h3>
              <p className="card-desc">
                Our AI analyzes your resume or self-introduction (자기소개서) to generate highly<br />
                personalized interview questions.<br />
                You’ll be asked questions based on your experiences, strengths, and goals—just like in a real interview.<br />
                Whether you're applying for internships or full-time roles, this feature helps you<br />
                prepare authentic and relevant answers.
              </p>
             <div class="card-flow">
              <div class="step-card fade-item">Upload your self-introduction</div>
              <div class="step-card fade-item">Get tailored questions</div>
              <div class="arrow right">→</div>
              <div class="arrow down">↓</div>
              <div class="step-card fade-item">Receive instant AI feedback</div>
              <div class="step-card fade-item">Practice on video</div>
              <div class="arrow down">↓</div>
              <div class="arrow left">←</div>
            </div>
            </div>
            <img
              src="/resume-interview.png"
              alt="Resume Interview"
              className="card-img"
            />
          </div>
        </section>
        <hr className="hero-divider" />

        <section className="jobposting-section">
          <div className="small-text">*Introduction to Features 02</div>
          <div className="resume-flex">
            <div className="resume-texts">
              <h2 className="card-title">
                AI Interview Based on Job Posting
              </h2>
              <h3 className="card-desc1">
                Instantly generate interview<br />questions based on your target<br />job description.
              </h3>
              <p className="card-desc">
                Our AI analyzes the job posting you provide—extracting key responsibilities,<br />
                qualifications, and keywords—to create highly relevant interview questions tailored to<br />
                that specific role.<br />
                This helps you prepare for the actual expectations of employers, not just general interviews.<br />
                Ideal for applicants who want to deeply align their answers with a target job.
              </p>
              <ul className="card-list">
                <li>➔ Upload job description</li>
                <li>➔ Receive role-specific questions</li>
                <li>➔ Practice on video</li>
                <li>➔ Get AI-driven feedback</li>
              </ul>
            </div>
            <img
              src="/jobposting-interview.png"
              alt="Job Posting Interview"
              className="card-img"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
export default MainPage;