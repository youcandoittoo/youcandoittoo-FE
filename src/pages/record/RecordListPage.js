import React from "react";
import { useNavigate } from "react-router-dom";
import "../CommonStyles.css";
import "./RecordListPage.css";

import Header from "../../components/Header";
import ParticleBackground from "../../components/ParticleBackground";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/Footer";

// 임시 데이터
const mockRecords = [
  {
    id: 1,
    title: "LG면접 연습(1)",
    company: "LG화학",
    position: "데이터 엔지니어",
    resume: "LG화학_신입지원서.pdf",
    date: "25-06-28",
    time: "10:45",
  },
  {
    id: 2,
    title: "삼성전자 최종면접 대비",
    company: "삼성전자",
    position: "AI 연구원",
    resume: "삼성전자_포트폴리오_최종.pdf",
    date: "25-06-27",
    time: "15:20",
  },
  {
    id: 3,
    title: "카카오 신입 공채 대비",
    company: "카카오",
    position: "프론트엔드 개발자",
    resume: "카카오_개발자_이력서.pdf",
    date: "25-06-25",
    time: "18:00",
  },
];

function RecordListPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleRecordClick = (recordId) => {
    navigate(`/record/${recordId}`);
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

            {/* 페이지 타이틀 */}
            <div className="record-title-bar">
              <h1>면접 기록</h1>
            </div>

            <div className="record-list-container">
              {/* 필터 및 정렬 바 */}
              <div className="record-list-header">
                <span className="col-title">제목</span>
                <span className="col-company">지원 기업명</span>
                <span className="col-position">지원 직무/직무명</span>
                <span className="col-resume">자소서 제목</span>
                <span className="col-date">날짜/시간</span>
                <span className="col-arrow"></span>
              </div>

              {/* 면접 기록 리스트 */}
              <div className="record-list">
                {mockRecords.map((record) => (
                  <div
                    className="record-item"
                    key={record.id}
                    onClick={() => handleRecordClick(record.id)}
                  >
                    <div className="col-title">{record.title}</div>
                    <div className="col-company">{record.company}</div>
                    <div className="col-position">{record.position}</div>
                    <div className="col-resume">{record.resume}</div>
                    <div className="col-date">
                      {record.date} {record.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default RecordListPage;
