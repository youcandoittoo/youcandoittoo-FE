import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import "./CommonStyles.css";
import Header from "../components/Header";
import ParticleBackground from "../components/ParticleBackground";
import AuthCard from "../components/AuthCard";
import { useAuth } from "../context/AuthContext";
import StepFlow from "../components/StepFlow";
import StepFlow1 from "../components/StepFlow1";

function Button({ children, ...props }) {
  return (
    <button className="custom-btn" {...props}>
      {children}
    </button>
  );
}

function MainPage() {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth(); // 전역 user 상태
  const [showAuthCard, setShowAuthCard] = useState(false);

  const handleLoginSuccess = (userInfo) => {
    console.log("로그인 성공: ", userInfo);
    login(userInfo); // context 전역 상태에 저장
    setShowAuthCard(false);
  };

  useEffect(() => {
  const items = document.querySelectorAll(".fade-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show"); // ✅ 다시 사라질 때 제거
        }
      });
    },
    { threshold: 0.3 }
  );

  items.forEach((item) => observer.observe(item));
  return () => observer.disconnect();
}, []);

  return (
    <>
      {/* 로그인 카드 오버레이 */}
      {showAuthCard && (
        <div className="auth-card-overlay">
          <AuthCard
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowAuthCard(false)}
          />
          <button className="close-btn" onClick={() => setShowAuthCard(false)}>
            ×
          </button>
        </div>
      )}
      <ParticleBackground />
      <div
        className={`interview-page-wrapper ${
          showAuthCard ? "blur-background" : ""
        }`}
      >
        <div className="bar-background"></div>
        <div className="content-wrapper">
          <div className="custom-card">
            <Header
              user={user}
              logout={logout}
              onLoginClick={() => setShowAuthCard(true)}
            />
            <section className="hero-section">
              <div className="big-logo">
                Trusted by <span className="blue-text">ambitious</span> job
                seekers
                <br />
                and <span className="blue-text2">forward-thinking</span> teams
              </div>
              <Button
                className="start-btn"
                onClick={() => {
                  if (!user) {
                    alert("로그인 후 이용 가능합니다.");
                    setShowAuthCard(true); // 로그인 카드 열기
                  } else {
                    navigate("/select"); // 정상 이동
                  }
                }}
              >
                Start
              </Button>
              <div className="hero-desc-link">
                <h5>
                  “<span className="underline">AI Interview</span>, Built for
                  the <span className="underline">Future of Work</span>.”
                </h5>
              </div>
              <hr className="hero-divider" />

              <section className="info-image-section">
                <div className="info-texts">
                  <h2 className="infor-desc-title">
                    AI Interviews, Built for Growth
                  </h2>
                  <h4 className="infor-desc-sub">
                    Tailored for students, job
                    <br /> seekers, and career changers.
                  </h4>
                  <p className="infor-desc">
                    Launched in collaboration with universities,
                    <br />
                    AI Interview is an AI-powered platform that helps users
                    <br />
                    build confidence, practice effectively, and receive
                    <br />
                    objective feedback.
                    <br />
                    From first-time job seekers to professionals preparing for a
                    career pivot,
                    <br />
                    we deliver smart, structured interview experiences—
                    <br />
                    anytime, anywhere.
                  </p>
                </div>
                <div className="video-crop-wrapper">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="cropped-video"
                  >
                    <source src="ai-robot-moving.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </section>
            </section>

            <section className="stats-section">
              <div>
                <p className="stats-number">100+</p>
                <p className="stats-desc">Mock interviews tested</p>
              </div>
              <div>
                <p className="stats-number">5+</p>
                <p className="stats-desc">Partnering majors / professors</p>
              </div>
              <div>
                <p className="stats-number">2025</p>
                <p className="stats-desc">Target launch year</p>
              </div>
            </section>

            <hr className="hero-divider" />

            <section className="resume-section">
              <div className="small-text">*Introduction to Features 01</div>
              <div className="resume-flex">
                <div className="resume-texts">
                  <h2 className="card-title">
                    AI Interview Based on Resume <br />
                    (Self-Introduction)
                  </h2>
                  <h3 className="card-desc1">
                    Tailored for students, job
                    <br /> seekers, and career changers.
                  </h3>
                  <p className="card-desc3">
                    Our AI analyzes your resume or self-introduction
                    (자기소개서) to generate highly
                    <br />
                    personalized interview questions.
                    <br />
                    You’ll be asked questions based on your experiences,
                    strengths, and goals—just like in a real interview.
                    <br />
                    Whether you're applying for internships or full-time roles,
                    this feature helps you
                    <br />
                    prepare authentic and relevant answers.
                  </p>
                  <div className="feature-flow-wrapper">
                    <ul className="feature-bullets">
                      <li>
                        <strong>Personalized</strong> questions from your resume
                      </li>
                      <li>
                        Practice expressing your{" "}
                        <strong>experiences and goals</strong>
                      </li>
                      <li>
                        Receive AI feedback on{" "}
                        <strong>tone, clarity, confidence</strong>
                      </li>
                      <li>
                        <strong>Ideal for</strong> students, job seekers,
                        portfolio users
                      </li>
                    </ul>
                    <div className="stepflow-wrapper">
                      <StepFlow />
                    </div>
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
                    Instantly generate interview
                    <br />
                    questions based on your target
                    <br />
                    job description.
                  </h3>
                  <p className="card-desc3">
                    Our AI analyzes the job posting you provide—extracting key
                    responsibilities,
                    <br />
                    qualifications, and keywords—to create highly relevant
                    interview questions tailored to
                    <br />
                    that specific role.
                    <br />
                    This helps you prepare for the actual expectations of
                    employers, not just general interviews.
                    <br />
                    Ideal for applicants who want to deeply align their answers
                    with a target job.
                  </p>
                  <div
                    className="feature-flow-wrapper"
                    style={{ marginTop: "150px" }}
                  >
                    <ul className="feature-bullets">
                      <li>
                        Upload or paste any<strong>job posting</strong> (PDF,
                        text, or link)
                      </li>
                      <li>
                        Automatically generate{" "}
                        <strong>job-specific interview questions</strong>
                      </li>
                      <li>
                        Practice answers{" "}
                        <strong>aligned with role requirements</strong>
                      </li>
                      <li>
                        Receive <strong>AI feedback</strong> on{" "}
                        <strong>relevance</strong>and <strong>clarity</strong>
                      </li>
                      <li>
                        Greate for <strong>tailored preparation</strong> before
                        actual interviews
                      </li>
                    </ul>
                    <div className="stepflow-wrapper">
                      <StepFlow1 />
                    </div>
                  </div>
                </div>
                <img
                  src="/jobposting-interview.png"
                  alt="Job Posting Interview"
                  className="card-img"
                />
              </div>
            </section>
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

export default MainPage;
