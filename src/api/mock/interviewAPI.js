// src/api/mock/interviewAPI.js

const dummyQuestions = [
  "자기소개 부탁드립니다.",
  "본인의 장점과 단점을 말씀해주세요.",
  "지원한 직무에 왜 적합하다고 생각하나요?",
  "협업 시 갈등이 생겼을 때 어떻게 대처했나요?",
  "해당 회사에 지원하게 된 동기는 무엇인가요?",
];

export async function fetchAIQuestion(index, transcript = "") {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyQuestions[index] || "면접이 완료되었습니다.";
}

export async function fetchAIFeedback(transcript = "") {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    expression: "무표정으로 보입니다. 가벼운 미소를 지어보세요.",
    voice: "목소리가 떨리고 있습니다. 천천히 또박또박 말해보세요.",
  };
}
