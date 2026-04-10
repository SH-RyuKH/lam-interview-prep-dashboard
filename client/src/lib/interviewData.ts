// Interview preparation data structure for Lam Research KTC

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Question {
  id: string;
  number: number;
  category: string;
  title: string;
  keyPoints: string[];
  englishAnswer: string;
  koreanAnswer: string;
  keywords: string[];
}

export interface Week {
  weekNumber: number;
  title: string;
  goal: string;
  tasks: Task[];
  questions: Question[];
}

export const interviewData: Week[] = [
  {
    weekNumber: 1,
    title: "기초 공사: 100% 출제 질문 마스터",
    goal: "자기소개, 지원동기, 성격의 장단점을 '툭 치면 나올 정도'로 암기",
    tasks: [
      {
        id: "w1-t1",
        title: "자기소개 암기",
        description: "거울 보고 하루 10번씩 자기소개 영문 스크립트 암기",
        completed: false,
      },
      {
        id: "w1-t2",
        title: "지원동기 숙지",
        description: "'Senior(책임)' 타이틀과 '10km 통근' 키워드 자연스럽게 강조",
        completed: false,
      },
      {
        id: "w1-t3",
        title: "연봉 협상 논리 준비",
        description: "현재 연봉 및 희망 연봉(Base 80M+ / Total 98M) 영어 논리 숙지",
        completed: false,
      },
    ],
    questions: [
      {
        id: "q1",
        number: 1,
        category: "기본 질문",
        title: "자기소개 (Self-Introduction)",
        keyPoints: [
          "4년+ 경력",
          "2026년 '책임' 승진",
          "제조 지능화 전문가",
        ],
        englishAnswer:
          "I am KunHwi Ryu, a Senior MES Developer at DB HiTek with over 4 years of experience. I specialize in C# (Client), C (Server), and Oracle DB. Recently, I was promoted to Senior Engineer in recognition of my contributions to workflow automation and system reliability. I am a self-starter who bridges the gap between semiconductor hardware and software systems.",
        koreanAnswer:
          "저는 DB하이텍의 시니어 MES 개발자 류건휘입니다. 4년 이상의 경력을 보유하고 있으며, 2026년에 기술적 기여를 인정받아 책임으로 승진했습니다. 저는 반도체 하드웨어와 소프트웨어 시스템 사이의 간극을 메우는 자기주도적 인재입니다.",
        keywords: ["Senior Engineer", "4 years experience", "MES Developer"],
      },
      {
        id: "q2",
        number: 2,
        category: "기본 질문",
        title: "지원 동기 (Why Lam Research?)",
        keyPoints: [
          "아시아 유일 R&D 센터(KTC)",
          "글로벌 CM 플랫폼 구축 미션",
          "지리적 이점(10km)",
        ],
        englishAnswer:
          "First, Lam KTC is Asia's only R&D center, and I want to contribute to building a global MES platform from scratch. Second, my expertise in site-level MES aligns perfectly with R&D lab automation needs. Finally, living only 10km away from Giheung ensures my commute stability and high focus on work.",
        koreanAnswer:
          "첫째, 아시아 유일의 R&D 센터인 KTC에서 글로벌 MES 플랫폼을 구축하는 데 기여하고 싶습니다. 둘째, 현장 수준의 MES 전문성이 R&D 랩 자동화 요구와 완벽히 일치합니다. 마지막으로, 기흥에서 10km 거리에 거주하여 업무에 대한 높은 몰입도를 보장할 수 있습니다.",
        keywords: ["KTC", "Global platform", "R&D center"],
      },
    ],
  },
  {
    weekNumber: 2,
    title: "기술 심층: STAR 기법으로 프로젝트 설명",
    goal: "MOCVD, Wireless Printer, AI OCR 프로젝트를 영어로 유창하게 설명",
    tasks: [
      {
        id: "w2-t1",
        title: "MOCVD 프로젝트 STAR 재정리",
        description:
          "Situation - Task - Action - Result 구조로 MOCVD 프로젝트 설명 재구성",
        completed: false,
      },
      {
        id: "w2-t2",
        title: "핵심 키워드 입에 익히기",
        description:
          "Traceability, Throughput, Interlock, Real-time conversion, AI-driven automation 키워드 숙달",
        completed: false,
      },
      {
        id: "w2-t3",
        title: "CM 플랫폼 80% 유사성 강조",
        description:
          "Critical Manufacturing(CM) MES와의 80% 유사성을 강조하며 학습 의지 어필",
        completed: false,
      },
    ],
    questions: [
      {
        id: "q3",
        number: 3,
        category: "기술 심층",
        title: "가장 도전적이었던 프로젝트 (MOCVD Batch Processing)",
        keyPoints: [
          "25-Wafer 표준을 벗어난 15-Wafer 분할 로직",
          "17매 기준 EPI Lot 자동 생성",
          "100% 추적성 확보",
        ],
        englishAnswer:
          "My most challenging project was integrating the MOCVD process, which required splitting 15 wafers into 5-wafer batches. I developed custom logic to classify wafers by grade and monitor their counts. Once 17 wafers of the same grade were gathered, the system automatically created a new 'EPI Lot.' This ensured 100% wafer-level traceability and significantly improved production efficiency.",
        koreanAnswer:
          "가장 도전적이었던 프로젝트는 15매의 웨이퍼를 5매씩 배치 처리해야 했던 MOCVD 공정 통합이었습니다. 등급별 분류 및 카운트 모니터링 로직을 개발했고, 동일 등급 17매가 모이면 자동으로 'EPI Lot'을 생성하게 하여 100% 추적성을 확보했습니다.",
        keywords: ["MOCVD", "Batch processing", "Traceability"],
      },
      {
        id: "q4",
        number: 4,
        category: "기술 심층",
        title: "문제 해결 사례 (Wireless Printer ZPL to TSPL)",
        keyPoints: [
          "인프라 한계(LAN 포트 부족/고정 IP) 극복",
          "실시간 언어 변환 프로그램 개발",
          "인프라 비용 절감",
        ],
        englishAnswer:
          "We faced a shortage of LAN ports, so I implemented wireless printers. However, the fab security only allowed 'Static IPs,' and our MES used ZPL while the new printers used TSPL. I wrote a real-time conversion program to translate ZPL into TSPL, which saved significant infrastructure costs and allowed operators to print labels anywhere in the line.",
        koreanAnswer:
          "LAN 포트 부족 문제를 해결하기 위해 무선 프린터를 도입했습니다. 팹 보안상 고정 IP만 허용되는 환경에서, MES의 ZPL 언어를 프린터의 TSPL로 실시간 변환하는 프로그램을 개발하여 인프라 비용을 절감하고 공정 효율을 높였습니다.",
        keywords: ["Wireless printer", "Real-time conversion", "Infrastructure"],
      },
      {
        id: "q5",
        number: 5,
        category: "기술 심층",
        title: "AI 및 데이터 분석 역량 (CD-SEM Image Recognition)",
        keyPoints: [
          "Python 활용 데이터 자동화",
          "AI 모델(CD-SEM 수치 인식) 도입",
          "수동 업무 획기적 감소",
        ],
        englishAnswer:
          "I developed a Python program to automate messy Excel data handling, which improved data accuracy. Currently, I am developing an automated sample confirmation system using AI models to recognize numeric values from CD-SEM images via FTP. This will significantly reduce manual work for our engineers.",
        koreanAnswer:
          "파이썬을 활용해 수동 엑셀 작업을 자동화하여 데이터 정확도를 높였습니다. 현재는 FTP를 통해 전송된 CD-SEM 이미지에서 AI 모델로 수치를 인식해 MES에 자동 전송하는 시스템을 개발 중이며, 이는 엔지니어들의 수동 업무를 획기적으로 줄여줄 것입니다.",
        keywords: ["AI", "Python", "Data automation"],
      },
    ],
  },
  {
    weekNumber: 3,
    title: "실전 대응: 꼬리 질문 및 돌발 질문 대비",
    goal: "싱가포르/미국 매니저의 악센트와 꼬리 질문에 당황하지 않기",
    tasks: [
      {
        id: "w3-t1",
        title: "싱가포르 영어 악센트 적응",
        description:
          "유튜브에서 'Singapore English Accent' 또는 'Indian English Accent' 영상 시청",
        completed: false,
      },
      {
        id: "w3-t2",
        title: "갈등 해결 및 기술 습득 계획 강화",
        description: "Q7(갈등 해결) 및 Q6(새로운 기술 습득) 답변 강화",
        completed: false,
      },
      {
        id: "w3-t3",
        title: "역질문 3가지 상황별 준비",
        description: "Q9 역질문 3가지를 상황에 맞게 던지는 연습",
        completed: false,
      },
    ],
    questions: [
      {
        id: "q6",
        number: 6,
        category: "플랫폼 전환",
        title: "새로운 플랫폼(CM) 학습 계획",
        keyPoints: [
          "미라콤과의 80% 공통점",
          "Angular/TS 빠른 습득 자신감",
          "한 달 내 CM 인증 완료",
        ],
        englishAnswer:
          "Miracom and CM share about 80% common foundation in C#, Oracle, and core MES concepts. I am confident in mastering Angular and TypeScript within two weeks by leveraging my existing C# logic. My plan is to complete the CM Front-end and Back-end certification within the first month.",
        koreanAnswer:
          "미라콤과 CM은 핵심 개념에서 80% 이상 유사합니다. 기존 C# 로직을 바탕으로 2주 안에 Angular와 TypeScript를 마스터할 수 있으며, 입사 후 한 달 내에 CM 인증을 완료할 계획입니다.",
        keywords: ["CM platform", "Angular", "TypeScript"],
      },
      {
        id: "q7",
        number: 7,
        category: "소프트 스킬",
        title: "갈등 해결 및 협업 (Conflict Resolution)",
        keyPoints: [
          "Batch 정렬 시스템 도입 시 팀 간 이견",
          "권한 기반 솔루션 설계",
          "안전성과 유연성 동시 만족",
        ],
        englishAnswer:
          "When developing an auto-sort system, there was a disagreement between teams about skipping measurements. I created a special group within the Production team where only authorized members could skip the process. This satisfied both safety and flexibility requirements.",
        koreanAnswer:
          "자동 정렬 시스템 개발 시 공정 스킵 여부로 팀 간 이견이 있었으나, 권한이 부여된 특정 멤버만 스킵 가능하도록 시스템을 설계하여 안전성과 유연성을 모두 만족시켰습니다.",
        keywords: ["Conflict resolution", "Collaboration", "Problem-solving"],
      },
    ],
  },
  {
    weekNumber: 4,
    title: "최종 리허설: 모의 면접 및 마인드셋",
    goal: "비대면(Zoom/Teams) 환경에 적응하고 자신감 있는 태도 장착",
    tasks: [
      {
        id: "w4-t1",
        title: "웹캠 녹화 및 피드백",
        description:
          "웹캠을 켜고 자신의 답변 모습 녹화 후 피드백 (아이컨택, 미소, 목소리 톤)",
        completed: false,
      },
      {
        id: "w4-t2",
        title: "최종 면접 팁 숙지",
        description:
          "'나는 단순 개발자가 아닌 시스템의 안정성을 책임지는 시니어다'라는 마인드셋 장착",
        completed: false,
      },
      {
        id: "w4-t3",
        title: "시간 벌기용 문구 익히기",
        description:
          "영어 답변이 막힐 때 쓸 수 있는 '시간 벌기용 문구' 익히기",
        completed: false,
      },
    ],
    questions: [
      {
        id: "q8",
        number: 8,
        category: "연봉 협상",
        title: "연봉 협상 논리 (Target: 98M KRW)",
        keyPoints: [
          "비포괄임금제 전환",
          "CM 전문가 희소성 강조",
          "Base 75-78M + Total 98M",
        ],
        englishAnswer:
          "Currently, my total compensation is around 81 million KRW. Considering the transition to a non-inclusive wage system (비포괄) and the expertise required for the CM platform, I am targeting a Base Salary of 75 to 78 million KRW, with a total package around 98 million KRW.",
        koreanAnswer:
          "현재 총보상은 약 8,100만 원입니다. 비포괄임금제 전환과 CM 플랫폼에 대한 전문성 희소성을 고려하여, 기본급 7,500~7,800만 원 및 총액 9,800만 원 수준을 희망합니다.",
        keywords: ["Salary negotiation", "Total compensation", "CM platform"],
      },
      {
        id: "q9",
        number: 9,
        category: "역질문",
        title: "면접자 역질문 (Reverse Questions)",
        keyPoints: [
          "CM 롤아웃 기술적 과제",
          "CM 인증 프로그램 지원",
          "싱가포르-기흥 협업 구조",
        ],
        englishAnswer:
          "1. What are the biggest technical challenges the E-team is currently facing regarding the CM rollout? 2. Does Lam Research provide specific training or support for the CM certification program? 3. How does the team balance collaboration between Singapore managers and the local engineering team in Giheung?",
        koreanAnswer:
          "1. CM 롤아웃과 관련하여 E-팀이 현재 직면한 가장 큰 기술적 과제는 무엇인가요? 2. 램리서치에서 CM 인증 프로그램을 위한 구체적인 교육이나 지원을 제공하나요? 3. 싱가포르 매니저와 기흥 현지 엔지니어 팀 간의 협업은 어떻게 이루어지나요?",
        keywords: ["Reverse questions", "CM rollout", "Team collaboration"],
      },
    ],
  },
];
