// resumeService.js - Local Mock, API 호환 구조

// ✅ 더미 데이터
let dummyResumes = [
  {
    id: 1,
    title: "삼성전자 SW직무 자기소개서",
    company: "삼성전자",
    position: "소프트웨어 엔지니어",
    content:
      "안녕하세요. 저는 문제 해결을 즐기고 협업을 통해 더 큰 가치를 창출하는 것을 좋아하는 소프트웨어 개발자 지망생입니다. 대학 시절 컴퓨터공학을 전공하면서 다양한 프로젝트를 수행하였고, 이를 통해 팀워크, 소통 능력, 그리고 기술적 문제 해결 능력을 키워왔습니다.특히 3학년 2학기에는 'AI 기반 수요 예측 시스템'이라는 팀 프로젝트에서 프론트엔드 개발을 맡아 React와 TypeScript를 활용해 인터페이스를 구현하였습니다. 이 과정에서 사용자 경험(UX)을 고려한 컴포넌트 구성과 상태 관리의 중요성을 체감했으며, Redux와 Context API를 활용하여 상태를 일관되게 관리하였습니다. 또한 백엔드와의 협업 과정에서는 Swagger를 활용해 API 명세서를 바탕으로 RESTful 통신을 구현하였고, CORS 문제 해결, JWT 인증 처리 등을 실무처럼 경험할 수 있었습니다.저는 사용자의 입장에서 사고하고, 효율적인 코드를 작성하기 위해 노력합니다. 학과 수업 외에도 다양한 사이드 프로젝트에 참여하면서 GitHub를 통해 협업하는 문화를 익혔고, 코드 리뷰를 통해 상대방의 관점을 이해하는 법을 배웠습니다. 이를 통해 단순히 기능 구현에 그치지 않고, 코드의 유지 보수성과 확장성을 고려하는 습관을 갖게 되었습니다.또한 저는 새로운 기술에 대한 호기심이 많습니다. 최근에는 Next.js와 Tailwind CSS를 활용하여 포트폴리오 사이트를 개발하였고, Vercel에 배포하여 실시간 피드백을 받을 수 있도록 하였습니다. 이 과정에서 SSR, SSG, ISR의 차이를 직접 경험하고, SEO를 고려한 구조에 대한 이해를 넓힐 수 있었습니다.저는 기술적으로 성장함과 동시에 인간적으로 신뢰받는 개발자가 되고 싶습니다. 개발은 혼자가 아닌 함께하는 작업이며, 기술보다 중요한 것은 함께 일하는 사람에 대한 존중이라고 생각합니다. 그렇기에 저는 언제나 상대방을 배려하며, 팀의 목표를 우선시하는 태도로 임하고자 합니다.저는 기술적으로 성장함과 동시에 인간적으로 신뢰받는 개발자가 되고 싶습니다. 개발은 혼자가 아닌 함께하는 작업이며, 기술보다 중요한 것은 함께 일하는 사람에 대한 존중이라고 생각합니다. 그렇기에 저는 언제나 상대방을 배려하며, 팀의 목표를 우선시하는 태도로 임하고자 합니다.귀사에서 제공하는 인턴십 프로그램은 제가 개발자로서 성장하는 데 있어 중요한 전환점이 될 것이라 믿습니다. 실제 현장에서 경험을 쌓고, 우수한 동료들과 협업하며 실무 역량을 높이고 싶습니다. 부족한 부분은 빠르게 흡수하고, 맡은 일은 끝까지 책임지는 자세로 임하겠습니다.긴 글 읽어주셔서 감사합니다.",
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
