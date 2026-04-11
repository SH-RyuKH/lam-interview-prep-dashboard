# 🐕‍🦺 VerbalEdge : English Interview Pro

> **VerbalEdge**는 소프트웨어 엔지니어 및 IT 직군 종사자들이 영어 면접을 완벽하게 대비할 수 있도록 제작된 모던하고 세련된 설치형 PWA(Progressive Web Application)입니다. 여러분만의 질의응답(Q&A) 데이터를 추가하고, 3D 플래시카드와 원어민 TTS 기능을 통해 실전처럼 연습해보세요!

![VerbalEdge Logo](src/assets/shiba_logo.png)

## 🌟 핵심 기능 (Core Features)

- 🃏 **3D 플래시카드**: 아름다운 애니메이션과 상호작용이 가능한 입체적인 3D 카드 시스템으로 면접 질문과 모범 답안을 쉽게 확인하고 외울 수 있습니다.
- 🗣️ **원어민 발음 듣기 (Native TTS)**: 브라우저에 내장된 고품질 Web Speech API를 활용합니다. 영미권 원어민과 거의 동일한 억양과 발음으로 나의 답변을 들려주며, 언제든 배속(속도 조절)을 바꾸거나 멈출 수 있는 정지 버튼을 지원합니다.
- 📱 **모바일 네이티브 앱 설치 (PWA 지원)**: Vercel이나 GitHub Pages로 배포한 뒤, 갤럭시나 아이폰에서 접속해 **"홈 화면에 추가"**를 눌러보세요. 주소창이 완전히 사라지고 오프라인 상태에서도 동작하는 **진짜 스마트폰 앱**처럼 작동합니다!
- 💾 **안정적인 로컬 데이터 저장소**: 브라우저의 LocalStorage를 활용하여 로딩 속도가 빠르고 데이터가 캐싱됩니다. 초기 설정 시 또는 브라우저 캐시가 지워지더라도 빌트인 `data.json` 파일에서 안전하게 데이터를 자동으로 복원하는 안전 장치가 마련되어 있습니다.
- 📄 **모의 면접용 PDF 추출**: 내가 저장한 면접 질문 리스트 전체와, 챗GPT(또는 Gemini Live)가 '모의 면접관' 역할을 완벽히 수행할 수 있도록 엔지니어링된 AI 시스템 프롬프트를 한데 묶어 고품질 PDF로 즉시 다운로드(Export)합니다.

## 🛠️ 기술 스택 (Tech Stack)

- **프레임워크**: Angular 17+ (Standalone Components)
- **스타일링**: Tailwind CSS, CSS 3D Transforms (가속 렌더링 최적화)
- **상태 관리**: Angular Signals ⚡
- **아이콘**: Lucide Angular
- **오프라인 및 캐싱 기능**: Angular PWA (`@angular/pwa`) Service Workers
- **PDF 생성 모듈**: jsPDF

## 🚀 설치 및 실행 방법

### 1. 로컬(PC) 환경에서 실행하기
```bash
# 저장소를 클론(복제)합니다.
git clone https://github.com/your-username/lam-interview-prep-dashboard.git

# 필요한 패키지를 설치합니다.
npm install

# 개발용 번들러 서버를 구동합니다.
ng serve
```
터미널 구동 완료 후 웹 브라우저를 열고 `http://localhost:4200/` 에 접속하여 확인합니다.

### 2. 질문/답변(Q&A) 추가하기
웹 화면 상단의 **'All List & Manage'** 탭에 들어가서 시각적으로 직접 질문을 관리하거나 개발 환경에서 `src/assets/data.json` 파일을 열고 텍스트를 직접 수정하시면 면접 질문 목록 전체가 즉시 반영됩니다.

### 3. 스마트폰에 '진짜 앱'으로 배포 및 설치하기 📱
가장 빠르고 쉽게 모바일에 배포하고 설치하는 방법은 **Vercel**을 사용하는 것입니다:
1. 웹 브라우저에서 [Vercel.com](https://vercel.com/) 에 접속해 GitHub 계정으로 로그인합니다.
2. 우측 상단 `[Add New...] -> Project`를 눌러 이 코드가 담긴 저장소(Repository)를 Import(가져오기) 합니다. Vercel이 자동으로 프로젝트가 Angular로 만들어졌다는 걸 찾아냅니다.
3. 아무런 복잡한 설정 없이 파란색 **Deploy(배포)** 버튼만 누릅니다. 약 1~2분이면 구축이 끝납니다!
4. 배포가 완료되어 화면에 나타난 최종 URL 주소를 **스마트폰(삼성 인터넷, 구글 크롬, 사파리 등)**으로 켭니다.
5. 브라우저 설정(⋮) 메뉴에서 **"홈 화면에 추가 (Add to Home Screen)"**을 찾아 누르세요.
6. 스마트폰 메인 바탕화면에 귀여운 시바견 로고 앱 아이콘이 생성됩니다. 클릭해서 실전 면접 준비를 시작하세요!

## 📜 라이선스 (License)
이 프로젝트는 오픈 소스이며, [MIT License](LICENSE) 규정을 따릅니다.
