export type PortfolioProject = {
  slug: string;
  title: string;
  summary: string;
  period: string;
  role: string;
  status: "운영중" | "개발중" | "실험";
  stack: string[];
  highlights: string[];
  contribution: string;
  learnings: string;
  links: {
    live?: string;
    github?: string;
  };
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "neon-dodge",
    title: "Neon Dodge",
    summary: "탭/키보드 기반 아케이드 회피 게임 MVP",
    period: "2026.04 ~ 진행중",
    role: "기획 · 프론트엔드 · 게임 루프 구현",
    status: "개발중",
    stack: ["React Native", "Expo", "TypeScript", "AsyncStorage"],
    highlights: [
      "웹/모바일 동시 개발 가능한 구조로 MVP 구성",
      "좌/우 탭 조작 + 키보드 입력 + 일시정지 시스템 구현",
      "점수 기반 난이도 스케일링과 최고 점수 저장 적용",
    ],
    contribution:
      "단일 App.tsx MVP에서 시작해 핵심 재미 루프(생존-점수-재도전)를 빠르게 검증하고, 리팩터링 가능한 구조로 확장 방향을 설계했습니다.",
    learnings:
      "초기엔 기능을 빠르게 붙이고, 이후 구조를 분리하는 접근이 1인 개발에서 가장 효율적이라는 점을 확인했습니다.",
    links: {
      github: "https://github.com/syeonjae",
    },
  },
  {
    slug: "drink-app-server",
    title: "Drink App + Server",
    summary: "칵테일 추천/리뷰를 위한 앱-서버 통합 프로젝트",
    period: "2026.03 ~ 진행중",
    role: "풀스택 개발 (앱/서버/DB)",
    status: "개발중",
    stack: ["React Native", "Expo Router", "NestJS", "Prisma", "PostgreSQL"],
    highlights: [
      "서버 검증 기반 인증/세션 플로우 정리",
      "온보딩 드래프트 저장/복구 API 및 앱 연동",
      "추천-상세-리뷰를 실제 데이터 흐름으로 연결",
    ],
    contribution:
      "앱 UX와 백엔드 데이터 모델을 동시에 조율해, 데모 수준이 아닌 실서비스형 흐름으로 정비했습니다.",
    learnings:
      "상태 저장의 경계(영속 상태 vs 런타임 상태)를 분리해야 인증 관련 버그를 크게 줄일 수 있었습니다.",
    links: {
      github: "https://github.com/syeonjae",
    },
  },
  {
    slug: "yeonjae-log",
    title: "연재로그 (MyBlog)",
    summary: "MDX 기반 개인 블로그 + 방문자 통계 + SEO 최적화",
    period: "2026.03 ~ 진행중",
    role: "프론트엔드 · 콘텐츠 아키텍처 · 배포",
    status: "운영중",
    stack: ["Next.js", "TypeScript", "MDX", "Tailwind", "Upstash", "Vercel"],
    highlights: [
      "카테고리/태그 기반 탐색 구조 구성",
      "robots/sitemap/OG 포함 SEO 기본기 정비",
      "Three.js 배경과 사이드바 중심 레이아웃으로 브랜딩",
    ],
    contribution:
      "글 작성 경험과 독자 탐색 경험을 동시에 개선해, 운영 가능한 블로그 플랫폼 형태로 고도화했습니다.",
    learnings:
      "콘텐츠 프로젝트는 디자인보다 정보 구조가 먼저이며, 이후 인터랙션을 더하는 게 유지보수에 유리했습니다.",
    links: {
      github: "https://github.com/syeonjae",
    },
  },
  {
    slug: "photo-timestamp-lab",
    title: "Photo Timestamp Lab",
    summary: "사진 촬영 시각 추출 + 워터마크 재생성 실험 프로젝트",
    period: "2026.04 아이데이션",
    role: "아이디어 설계 · 데이터 처리 플로우 설계",
    status: "실험",
    stack: ["Next.js", "Image Processing", "EXIF", "Node.js"],
    highlights: [
      "EXIF DateTimeOriginal 우선 파싱 설계",
      "EXIF 부재 시 fallback(파일시각/업로드시각) 규칙 정의",
      "워터마크 이미지 다운로드 + TXT 메타 출력 요구사항 도출",
    ],
    contribution:
      "사용자 관점에서 필요한 핵심 기능을 먼저 고정하고(촬영시각 가시화), 개인정보 이슈(EXIF/GPS 제거)까지 포함한 요구사항을 정리했습니다.",
    learnings:
      "단순 유틸리티라도 개인정보 처리 정책을 기능 설계 초기에 넣어야 나중 비용이 줄어듭니다.",
    links: {},
  },
  {
    slug: "dev-productivity-kit",
    title: "Dev Productivity Kit",
    summary: "개발 루틴 자동화를 위한 개인 생산성 도구 모음",
    period: "2025.12 ~ 2026.02",
    role: "기획 · 자동화 스크립트 개발",
    status: "운영중",
    stack: ["Node.js", "TypeScript", "CLI", "GitHub Actions"],
    highlights: [
      "반복 명령 템플릿화로 작업 시작 시간 단축",
      "프로젝트 체크리스트 자동 출력 스크립트 제작",
      "개인 규칙 기반 문서 갱신 루틴 자동화",
    ],
    contribution:
      "작은 자동화를 누적해 체감 생산성을 올리는 데 집중했고, 반복 작업 피로를 줄이는 데 효과를 봤습니다.",
    learnings:
      "대형 툴보다 매일 쓰는 작은 자동화가 실제 효용이 크다는 점을 확인했습니다.",
    links: {
      github: "https://github.com/syeonjae",
    },
  },
];
