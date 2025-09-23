import React from 'react';
import { useParams } from 'react-router-dom';
import '../CommonStyles.css';
import './InterviewResultPage.css';

import Header from '../../components/Header';
import ParticleBackground from '../../components/ParticleBackground';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Footer';

function ResultCard({ title, className, children }) {
    return (
        <div className={`result-card ${className || ''}`}>
            <h3>{title}</h3>
            <div className="card-content">
                {/* 추후 분석 내용 추가 */}
                {children}
            </div>
        </div>
    );
}

function InterviewResultPage() {
    const { user, logout } = useAuth();
    const { sessionId } = useParams();

    return (
        <>
            <ProtectedRoute />
            <ParticleBackground />
            <div className="interview-page-wrapper">
                <div className="bar-background"></div>
                <div className="content-wrapper">
                    <div className="custom-card">
                        <Header user={user} logout={logout} />
                        <div className="record-title-bar">
                            <h2>AI 면접 평가 (Session ID: {sessionId})</h2>
                        </div>

                        <div className="result-grid">
                            <ResultCard title="답변 내용 분석" className="large-card" >
                                <p>추후 답변 내용 분석에 대한 설명 추가</p>
                            </ResultCard>
                            <ResultCard title="비언어적 요소 분석" className="large-card" >
                                <p>추후 행동 분석에 대한 설명 추가</p>
                            </ResultCard>
                            <ResultCard title="강점 및 개선요소" className="small-card" >
                                <p>추후 답변 내용 중 강점과 개선요소에 대한 설명 추가</p>
                            </ResultCard>
                            <ResultCard title="그래프 분석" className="small-card" >
                                <p>추후 답변 내용에 대한 그래프 분석 내용 추가</p>
                            </ResultCard>
                            <ResultCard title="성장 기록" className="small-card" >
                                <p>추후 성장 과정에 대한 그래프? 분석 내용 추가</p>
                            </ResultCard>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default InterviewResultPage;