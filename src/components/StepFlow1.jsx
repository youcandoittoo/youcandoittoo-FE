// ✅ StepCard 컴포넌트와 Intersection Observer 적용한 화살표 순차 흐름 섹션 통합 버전

import React, { useEffect, useRef, useState } from "react";
import "./StepFlow.css";

function StepCard({ children, index }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`step-card1 fade-item ${visible ? "show" : ""}`}
      style={{ transitionDelay: `${index * 0.3}s` }}
    >
      {children}
    </div>
  );
}

function Arrow({ children, index, className = "" }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`arrow fade-item ${visible ? "show" : ""} ${className}`}
      style={{ transitionDelay: `${index * 0.3 + 0.15}s` }}
    >
      {children}
    </div>
  );
}

function StepFlow() {
  return (
    <div className="card-flow">
      <StepCard index={0}>Upload job description</StepCard>
      <Arrow index={0}>→</Arrow>

      <StepCard index={1}>Receive role-specific questions</StepCard>
      <Arrow index={1} className="arrow-down-right">
        ↓
      </Arrow>

      <StepCard index={3}>Get AI-driven feedback</StepCard>
      <Arrow index={2} className="arrow-left">
        ←
      </Arrow>
      <StepCard index={2}>Practice on video</StepCard>
    </div>
  );
}

export default StepFlow;
