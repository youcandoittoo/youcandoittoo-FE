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

function MainPageKR() {
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
                <span className="blue-text">열정적인</span> 구직자들과
                <br />
                <span className="blue-text2">미래지향적인 </span> 팀들이 신뢰하는 서비스
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
                  "<span className="underline">미래</span>를 대비한 <span className="underline">AI 면접 솔루션</span>"
                </h5>
              </div>
              <hr className="hero-divider" />

              <section className="info-image-section">
                <div className="info-texts">
                  <h2 className="infor-desc-title">성공을 위한 AI 면접</h2>
                  <h4 className="infor-desc-sub">
                    AI Interview는 학생, 구직자, 커리어 전환자를 위한
                    <br /> AI 기반 면접 준비 플랫폼입니다.
                  </h4>
                  <p className="infor-desc">
                    대학과의 협력으로 출시된 AI Interview는
                    <br />
                    자신감을 키우고 효과적으로 연습하며, 객관적인 피드백을 받을
                    수 있도록 돕는
                    <br />
                    AI 기반 플랫폼입니다.
                    <br />
                    처음 취업을 준비하는 이들부터 커리어 전환을 준비하는
                    전문가까지,
                    <br />
                    언제 어디서나 스마트하고 체계적인 면접 경험을 제공합니다.
                    <br />
                    AI Interview는 당신의 성공적인 취업을 위해 설계되었습니다.
                    <br />
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
                <p className="stats-desc">모의 면접 검증 완료 </p>
              </div>
              <div>
                <p className="stats-number">5+</p>
                <p className="stats-desc">전공/교수진 협업 </p>
              </div>
              <div>
                <p className="stats-number">2025</p>
                <p className="stats-desc">정식 출시 예정</p>
              </div>
            </section>

            <hr className="hero-divider" />

            <section className="resume-section">
              <div className="small-text">*Introduction to Features 01</div>
              <div className="resume-flex">
                <div className="resume-texts">
                  <h2 className="card-title">자기소개서 기반 AI 면접</h2>
                  <h3 className="card-desc1">
                    학생, 구직자, 그리고 <br></br>커리어 전환자를 위해 맞춤 설계되었습니다.

                  </h3>
                  <p className="card-desc3">
                    AI가 당신의 이력서나 자기소개서를 분석하여 매우 개인화된
                    면접 질문을 생성합니다.
                    <br />
                    실제 면접처럼, 당신의 경험, 강점, 목표를 기반으로 질문이
                    주어집니다.
                    <br />
                    인턴십이든 정규직이든, 이 기능은 진정성 있고 관련성 높은
                    답변 준비에 도움을 줍니다.
                  </p>
                  <div
                    className="feature-flow-wrapper"
                    style={{ marginTop: "150px" }}
                  >
                    <ul className="feature-bullets">
                      <li>
                        이력서 기반의 <strong>개인 맞춤 질문</strong>
                      </li>
                      <li>
                        <strong>경험과 목표</strong>를 표현하는 연습
                      </li>
                      <li>
                        <strong>톤, 명확성, 자신감</strong>에 대한 AI 피드백
                      </li>
                      <li>
                        학생, 구직자, 포트폴리오 사용자에게{" "}
                        <strong>이상적</strong>
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
                  <h2 className="card-title">공고 기반 AI 면접</h2>
                  <h3 className="card-desc1">
                    목표하는 직무 설명을 기반으로<br></br> 면접 질문이 즉시 생성됩니다.
                  </h3>
                  <p className="card-desc3">
                    제공한 채용 공고를 분석하여 핵심 직무, 자격 요건, 키워드를
                    추출한 뒤,
                    <br />
                    해당 직무에 최적화된 면접 질문을 생성합니다.
                    <br />
                    일반적인 면접이 아닌, 실제 기업의 기대에 맞춘 준비가
                    가능하며,
                    <br />
                    지원 직무에 답변을 밀접하게 맞추고자 하는 지원자에게
                    적합합니다.
                  </p>
                  <div
                    className="feature-flow-wrapper"
                    style={{ marginTop: "200px" }}
                  >
                    <ul className="feature-bullets">
                      <li>
                        어떤 <strong>채용 공고</strong>든 업로드하거나 붙여넣기
                        (PDF, 텍스트, 링크 가능){" "}
                      </li>
                      <li>
                        <strong>직무 맞춤 면접 질문</strong> 자동 생성{" "}
                      </li>
                      <li>
                        <strong>직무 요건에 맞춘</strong> 답변 연습{" "}
                      </li>
                      <li>
                        <strong>관련성</strong>과 <strong>명확성</strong>에 대한
                        AI 피드백{" "}
                      </li>
                      <li>
                        <strong>실제 면접 전 맞춤 준비</strong>에 적합{" "}
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

export default MainPageKR;
