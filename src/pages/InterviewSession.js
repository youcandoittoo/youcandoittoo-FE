import React, { useEffect, useRef, useState } from "react";
import "./InterviewSession.css";
import "./CommonStyles.css";
import Webcam from "react-webcam";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { fetchAIQuestion, fetchAIFeedback } from "../api/mock/interviewAPI";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import ProtectedRoute from "../components/ProtectedRoute";

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function InterviewSession() {
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [transcript, setTranscript] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [chatVisible, setChatVisible] = useState(true);
  const finalTranscriptRef = useRef("");
  const chatWindowRef = useRef(null);
  const webcamRef = useRef(null);
  const recognitionRef = useRef(null);
  const { user, logout } = useAuth();
  const [exitConfirmVisible, setExitConfirmVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const resizingRef = useRef(false);

  const handleNextQuestion = async () => {
    if (currentQuestion < 4) {
      setChatHistory((prev) => [
        ...prev,
        { type: "question", text: questionList[currentQuestion] },
        { type: "answer", text: finalTranscriptRef.current.trim() },
      ]);

      const nextIndex = currentQuestion + 1;
      const nextQuestion = await fetchAIQuestion(
        nextIndex,
        finalTranscriptRef.current
      );
      setQuestionList((prev) => [...prev, nextQuestion]);
      setCurrentQuestion(nextIndex);
      finalTranscriptRef.current = "";
      setTranscript("");
      window.speechSynthesis.cancel();
      const newFeedback = await fetchAIFeedback(finalTranscriptRef.current);
      setFeedback(newFeedback);
    } else {
      alert("모든 질문이 완료되었습니다!");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadFirstQuestion = async () => {
      const question = await fetchAIQuestion(0);
      setQuestionList([question]);
      const initialFeedback = await fetchAIFeedback();
      setFeedback(initialFeedback);
    };
    loadFirstQuestion();
  }, []);

  useEffect(() => {
    const question = questionList[currentQuestion];
    if (!question) return;

    // 1. 음성 인식 중지 (기존에 실행 중이라면)
    recognitionRef.current?.stop();

    const utterance = new SpeechSynthesisUtterance(question);
    utterance.lang = "ko-KR";

    // 2. 질문 읽기 끝난 뒤 음성 인식 재시작
    utterance.onend = () => {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn("음성 인식 재시작 실패", e);
      }
    };

    window.speechSynthesis.speak(utterance);
  }, [currentQuestion, questionList]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscriptRef.current += result[0].transcript + " ";
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(finalTranscriptRef.current + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("음성 인식 오류:", event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  const handleStopInterview = () => {
    recognitionRef.current?.stop();
    navigate("/select");
  };

  const handleDragStart = (e) => {
    if (resizingRef.current) return;

    const chatWindow = chatWindowRef.current;
    const shiftX = e.clientX - chatWindow.getBoundingClientRect().left;
    const shiftY =
      e.clientY - chatWindow.getBoundingClientRect().top + window.scrollY;

    const moveAt = (pageX, pageY) => {
      chatWindow.style.left = pageX - shiftX + "px";
      chatWindow.style.top = pageY - shiftY + "px";
    };

    const onMouseMove = (e) => {
      moveAt(e.pageX, e.pageY);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", onMouseMove);
      },
      { once: true }
    );
  };

  const handleResizeStart = (e) => {
    e.stopPropagation();
    resizingRef.current = true;
    const chatWindow = chatWindowRef.current;
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = chatWindow.offsetWidth;
    const startHeight = chatWindow.offsetHeight;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);
      chatWindow.style.width = newWidth + "px";
      chatWindow.style.height = newHeight + "px";
    };

    const onMouseUp = () => {
      resizingRef.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
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
            <hr className="hero-divider" />

            <div className="interview-card1">
              <div className="interview-header">
                <div className="left">
                  <span className="interview-title">
                    자소서 기반 AI면접 진행 중
                  </span>
                  <span className="interview-timer">
                    {formatTime(timeElapsed)}
                  </span>
                </div>
                <div>
                  <button
                    className="exit-button"
                    onClick={() => setExitConfirmVisible(true)}
                  >
                    Exit
                  </button>
                </div>
              </div>

              <hr className="hero-divider" />

              <div
                className={`interview-grid ${isFullscreen ? "fullscreen" : ""}`}
              >
                <div className="webcam-section">
                  <span className="webcam-text">웹캠</span>
                  <Webcam
                    ref={webcamRef}
                    className="webcam-video"
                    audio={false}
                    screenshotFormat="image/jpeg"
                  />
                  <div className="live-transcript-box">
                    <strong>🗣 실시간 답변:</strong>
                    <p>
                      {transcript || "사용자의 답변을 기다리는 중입니다..."}
                    </p>
                  </div>
                </div>

                <div className="qa-section">
                  <div className="progress-box">
                    <p>질문 {currentQuestion + 1} / 5</p>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{
                          width: `${((currentQuestion + 1) / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {(((currentQuestion + 1) / 5) * 100).toFixed(0)}% 완료
                    </span>
                  </div>
                  <div className="question-box">
                    <h4>👨‍💼 면접관 질문</h4>
                    <hr className="hero-divider1" />
                    <p>{questionList[currentQuestion]}</p>
                    {currentQuestion < 4 && (
                      <button
                        className="next-question-btn"
                        onClick={handleNextQuestion}
                      >
                        다음 질문 →
                      </button>
                    )}
                  </div>
                  <div className="feedback-box">
                    <div className="feedback-header">
                      <span>실시간 피드백</span>
                    </div>
                    <p>🧍‍♂️ 표정 분석: {feedback.expression}</p>
                    <p>🗣 목소리 분석: {feedback.voice}</p>
                  </div>
                  <button
                    className="fullscreen-button"
                    onClick={() => setIsFullscreen((prev) => !prev)}
                  >
                    {isFullscreen ? "전체화면 종료" : "전체화면 보기"}
                  </button>
                  {!chatVisible && (
                    <button
                      className="chat-toggle-button"
                      onClick={() => setChatVisible(true)}
                    >
                      채팅창 열기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {chatVisible && (
          <div
            className="floating-chat-window"
            ref={chatWindowRef}
            onMouseDown={handleDragStart}
          >
            <div className="chat-header">
              <span>💬 면접 대화 기록</span>
              <button onClick={() => setChatVisible(false)}>✕</button>
            </div>
            <div className="chat-scroll">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`chat-bubble ${msg.type}`}>
                  <strong>{msg.type === "question" ? "👨‍💼" : "🙋‍♀️"}</strong>{" "}
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="resizer" onMouseDown={handleResizeStart}></div>
          </div>
        )}

        {exitConfirmVisible && (
          <div className="confirm-overlay">
            <div className="confirm-card">
              <h3>면접 종료 확인</h3>
              <p>
                정말로 면접을 종료하시겠습니까?
                <br />
                종료한다면 해당 면접의 기록은 더이상 평가되지 않고 저장되지
                않습니다.
              </p>
              <div className="confirm-buttons">
                <button onClick={() => setExitConfirmVisible(false)}>
                  취소
                </button>
                <button className="danger" onClick={handleStopInterview}>
                  종료하기
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="footer">
          © 2025 야 너도 할 수 있어_AI면접 프로그램 | Designed by Soonchunhyang
          Univ.
        </footer>
      </div>
    </>
  );
}

export default InterviewSession;
