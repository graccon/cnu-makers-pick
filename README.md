# 골라쥬유

아이디어 검증용 모바일 웹 MVP의 기본 개발 환경입니다. 현재 단계에는 React + Vite와 Firebase Anonymous Authentication, Cloud Firestore, Firebase Hosting 연결만 포함합니다.

## 로컬 실행

```bash
npm install
cp .env.example .env
npm run dev
```

`.env`에는 Firebase Console의 프로젝트 설정 → 내 앱 → SDK 설정 및 구성에서 확인한 웹 앱 설정값을 입력합니다. 실제 `.env` 파일은 Git에 포함되지 않습니다.

## 주요 명령

```bash
npm run dev
npm run lint
npm run build
firebase deploy
```

## Firebase 구조

- `src/firebase/config.js`: Firebase 앱, Auth, Firestore 초기화
- `src/firebase/authService.js`: 기존 사용자 확인 및 익명 로그인
- `src/firebase/sessionService.js`: 개발용 `sessions` 테스트 문서 생성
- `firestore.rules`: 인증된 사용자가 자신의 데이터만 다루도록 제한
- `firebase.json`: Anonymous Auth, Firestore Rules, Hosting 배포 설정

Firebase 프로젝트: `project-eed03c5a-84a4-4b0e-9f6`

배포 URL: <https://project-eed03c5a-84a4-4b0e-9f6.web.app>
