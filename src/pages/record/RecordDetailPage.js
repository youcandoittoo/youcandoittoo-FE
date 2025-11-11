import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RecordDetailPage.css';
import '../CommonStyles.css';

import Header from '../../components/Header';
import ParticleBackground from '../../components/ParticleBackground';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import Footer from '../../components/Footer';

//임시 데이터 사용
const mockRecords = [
    { id: 1, title: "LG면접 연습(1)", company: "LG화학", date: "25-06-28", time: "10:45" },
    { id: 2, title: "삼성전자 최종면접 대비", company: "삼성전자", date: "25-06-27", time: "15:20" },
    { id: 3, title: "카카오 신입 공채 대비", company: "카카오", date: "25-06-25", time: "18:00" },
];

function RecordDetailPage() {
    const { user, logout } = useAuth();
    const { recordId } = useParams(); 
    const [record, setRecord] = useState(null);

    useEffect(() => {
        const currentRecord = mockRecords.find(r => r.id === parseInt(recordId));
        setRecord(currentRecord);
    }, [recordId]);

    if (!record) {
        return <div>기록을 불러오는 중...</div>;
    }

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
                            <h2>면접 기록</h2>
                        </div>
                        
                        <div className="record-info-bar">
                            <span>{record.title}</span>
                            <span>{record.date} {record.time}</span>
                        </div>

                        <div className="detail-grid">
                            <div className="content-card">
                                <h3>질문&답변 내용</h3>
                                <div className="card-content">
                                    {/* 추후 질문 답변 내용 추가 */}
                                    답변 내용 예시 작성 부분
                                </div>
                            </div>
                            <div className="right-card-column">
                                <div className="answer analysis-card">
                                    <h3>답변 내용 분석</h3>
                                    <div className="card-content">
                                        {/* 추후 답변 분석 내용 추가 */}
                                        답변 내용 예시2
                                    </div>
                                </div>
                                <div className="nonlanguage analysis-card">
                                    <h3>비언어적 요소 분석</h3>
                                    <div className="card-content">
                                        {/* 추후 비언어적 요소 분석 내용 추가 */}
                                        답변 내용 예시3
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default RecordDetailPage;