// resumeService.js - Local Mock, API 호환 구조

// ✅ 더미 데이터
let dummyResumes = [
  {
    id: 1,
    title: "삼성전자 SW직무 자기소개서",
    company: "삼성전자",
    position: "소프트웨어 엔지니어",
    content:
      "학부 시절 다양한 협업 프로젝트를 통해 문제 해결 능력을 키웠으며, 알고리즘과 시스템 구조에 대한 깊은 이해를 바탕으로 실무 역량을 쌓아왔습니다. 또한 교내 알고리즘 동아리 활동을 통해 실전 문제 해결 경험을 쌓았고, 백준 온라인 저지에서 300문제 이상을 해결하며 알고리즘 설계 능력을 향상시켰습니다. 3학년 여름방학에는 삼성 SW역량테스트 대비 스터디를 운영하며 후배들을 가르쳤고, 이를 통해 문제 해결 능력뿐만 아니라 소통 능력도 키울 수 있었습니다. 캡스톤 디자인 프로젝트에서는 IoT 기반 스마트 헬멧 시스템을 설계하고, 실시간 센서 데이터를 처리하기 위해 Node.js와 MongoDB를 활용한 서버를 구현하였습니다. 이 경험을 통해 백엔드 시스템 설계 및 데이터 흐름에 대한 깊은 이해를 갖추게 되었고, 협업 환경에서의 버전 관리(Git), 이슈 트래킹(Jira), 문서화(Confluence) 등 실무 도구 사용 능력도 배양할 수 있었습니다.학부 시절 다양한 협업 프로젝트를 통해 문제 해결 능력을 키웠으며, 알고리즘과 시스템 구조에 대한 깊은 이해를 바탕으로 실무 역량을 쌓아왔습니다. 또한 교내 알고리즘 동아리 활동을 통해 실전 문제 해결 경험을 쌓았고, 백준 온라인 저지에서 300문제 이상을 해결하며 알고리즘 설계 능력을 향상시켰습니다. 3학년 여름방학에는 삼성 SW역량테스트 대비 스터디를 운영하며 후배들을 가르쳤고, 이를 통해 문제 해결 능력뿐만 아니라 소통 능력도 키울 수 있었습니다. 캡스톤 디자인 프로젝트에서는 IoT 기반 스마트 헬멧 시스템을 설계하고, 실시간 센서 데이터를 처리하기 위해 Node.js와 MongoDB를 활용한 서버를 구현하였습니다. 이 경험을 통해 백엔드 시스템 설계 및 데이터 흐름에 대한 깊은 이해를 갖추게 되었고, 협업 환경에서의 버전 관리(Git), 이슈 트래킹(Jira), 문서화(Confluence) 등 실무 도구 사용 능력도 배양할 수 있었습니다.",
    createdAt: "2025-06-25",
  },
  {
    id: 2,
    title: "네이버 백엔드 개발 자기소개서",
    company: "NAVER",
    position: "백엔드 개발자",
    content:
      "사용자 데이터를 안전하고 효율적으로 처리하는 백엔드 시스템 설계를 목표로, Node.js와 Spring Boot 기반 프로젝트를 수행하였습니다. 특히 RESTful API 설계, JWT 기반 인증 처리, MongoDB와 MySQL을 이용한 데이터 설계 경험을 통해 실전에서 필요한 백엔드 역량을 다질 수 있었습니다. 또한 DevOps 측면에서도 Docker를 이용한 컨테이너 환경 구성 및 Jenkins를 통한 CI/CD 구축 경험이 있어, 개발부터 배포까지 전 과정을 고려한 개발 역량을 갖추고 있습니다. 협업 프로젝트에서는 Git Flow 전략을 도입하여 팀원들과의 충돌을 줄이고, 매주 스프린트 리뷰를 통해 피드백 기반 개발을 실현하였습니다. 이외에도 Elasticsearch를 활용한 검색 기능 구현, Redis 기반 캐시 서버 구성 경험 등도 갖추고 있습니다.",
    createdAt: "2025-06-30",
  },
];

let nextId = 3;

// ✅ 전체 목록 가져오기 (GET)
export const getResumes = async () => {
  return dummyResumes;
};

// ✅ 특정 자소서 ID로 가져오기
export const getResumeById = async (id) => {
  return dummyResumes.find((resume) => resume.id === id) || null;
};

// ✅ 생성 (POST)
export const createResume = async (newData) => {
  const newResume = {
    id: nextId++,
    createdAt: new Date().toISOString().split("T")[0],
    ...newData,
  };
  dummyResumes.push(newResume);
  return newResume;
};

// ✅ 수정 (PATCH)
export const updateResume = async (id, updatedData) => {
  const index = dummyResumes.findIndex((r) => r.id === id);
  if (index === -1) throw new Error("Resume not found");
  dummyResumes[index] = { ...dummyResumes[index], ...updatedData };
  return dummyResumes[index];
};

// ✅ 삭제 (DELETE)
export const deleteResume = async (id) => {
  dummyResumes = dummyResumes.filter((r) => r.id !== id);
  return true;
};
