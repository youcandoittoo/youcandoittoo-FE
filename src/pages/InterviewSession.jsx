import React, { useEffect, useRef, useState } from "react";
import "./InterviewSession.css";
import "./CommonStyles.css";
import Webcam from "react-webcam";
import Header from "./components/Header";

// 시간 포맷팅 함수
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function InterviewSession({ questions = [] }) {
  const defaultQuestions = [
    "자기소개 부탁드립니다.",
    "본인의 장점과 단점을 말씀해주세요.",
    "지원한 직무에 왜 적합하다고 생각하나요?",
  ];
  const questionList = questions.length > 0 ? questions : defaultQuestions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [feedbackVisible, setFeedbackVisible] = useState(true);
  const [transcript, setTranscript] = useState(""); // 👈 음성 텍스트
  const webcamRef = useRef(null);
  const recognitionRef = useRef(null);

  // 🔽 기존 코드 중간에 추가: 다음 질문 핸들러
const handleNextQuestion = () => {
  if (currentQuestion < questionList.length - 1) {
    setCurrentQuestion((prev) => prev + 1);
    setTranscript("");  // 음성 기록 초기화
    window.speechSynthesis.cancel(); // 현재 읽는 음성 중지
  } else {
    alert("모든 질문이 완료되었습니다!");
  }
};

  // ⏱ 타이머
  useEffect(() => {
    const timer = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🔈 질문 TTS 출력
  useEffect(() => {
    const utterance = new SpeechSynthesisUtterance(questionList[currentQuestion]);
    utterance.lang = "ko-KR";
    window.speechSynthesis.speak(utterance);
  }, [currentQuestion]);

  // 🎙️ 음성 인식 시작
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("이 브라우저는 음성 인식을 지원하지 않습니다.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let newTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        newTranscript += event.results[i][0].transcript;
      }
      setTranscript(newTranscript);
    };

    recognition.onerror = (event) => {
      console.error("음성 인식 오류:", event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, []);

  const handleStopInterview = () => {
    alert("면접을 종료합니다.");
    recognitionRef.current?.stop();
  };

  return (
    <div className="interview-container">
      <div className="bar"></div>
      <div className="select-page-card">
        <Header />
        <hr className="hero-divider" />
        <div className="interview-card">
          <div className="interview-header">
            <div className="left">
              <span className="interview-title">자소서 기반 AI면접 진행 중</span>
              <span className="interview-timer">{formatTime(timeElapsed)}</span>
            </div>
            <button className="exit-button" onClick={handleStopInterview}>
              Exit
            </button>
          </div>
          <hr className="hero-divider" />

          <div className="interview-grid">
            {/* 웹캠 */}
            <div className="webcam-section">
              <h3>웹캠</h3>
              <Webcam
                ref={webcamRef}
                className="webcam-video"
                audio={false}
                screenshotFormat="image/jpeg"
              />
               <div className="live-transcript-box">
                  <strong>🗣 실시간 답변:</strong>
                  <p>{transcript || "사용자의 답변을 기다리는 중입니다..."}</p>
                </div>
            </div>

{/* 질문 + 실시간 음성 텍스트 + 피드백 */}
<div className="qa-section">
  {/* 진행률 표시 */}
  <div className="progress-box">
    <p>질문 {currentQuestion + 1} / {questionList.length}</p>
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${((currentQuestion + 1) / questionList.length) * 100}%` }}
      ></div>
    </div>
    <span>{((currentQuestion + 1) / questionList.length * 100).toFixed(0)}% 완료</span>
  </div>

  {/* 질문 박스 */}
  <div className="question-box">
    <h4>👨‍💼 면접관 질문</h4>
    <hr className="hero-divider1" />
    <p>{questionList[currentQuestion]}</p>
    
    {/* ✅ 다음 질문 버튼 */}
    {currentQuestion < questionList.length - 1 && (
      <button className="next-question-btn" onClick={handleNextQuestion}>
        다음 질문 →
      </button>
    )}
  </div>
  {feedbackVisible && (
                <div className="feedback-box">
                  <div className="feedback-header">
                    <span>표정 피드백</span>
                    <button onClick={() => setFeedbackVisible(false)}>X</button>
                  </div>
                  <p>표정이 무표정하거나 긴장돼 보입니다. 자연스럽게 미소를 유지해보세요.</p>
                </div>
              )}
  </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSession;
