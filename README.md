# 🦷 Beauty Dental

A simple web platform to help users find dental clinics and view details using Naver Map.  
Includes user tracking, admin dashboard, login authentication, and Excel export.

사용자가 치과 정보를 검색하고 클릭 기록을 남길 수 있는 웹 플랫폼입니다.  
관리자는 클릭 기록을 분석하고 즐겨찾기 및 엑셀 다운로드 기능을 사용할 수 있습니다.

---

## 🌐 Features | 기능

### For Users (사용자)
- 입력폼으로 이름/연락처/개인정보 동의 수집
- 치과 리스트 + Naver 지도 마커 표시
- 치과 클릭 시 상세페이지 이동
- 클릭 기록 저장

### For Admin (관리자)
- 🔐 로그인 후 관리자 전용 페이지 접근
- 🧭 사용자별 활동 로그 보기
- ⭐ 즐겨찾기 사용자 관리
- 🗑 사용자 삭제 기능
- 📥 Excel 다운로드 (.xlsx)
- 🏥 치과 기준 클릭 기록도 확인 가능

---

## 📁 Folder Structure | 폴더 구조

```bash

src/
├── pages/           # 화면 컴포넌트 (HomePage, MapPage, AdminPage 등)
├── data/            # mock 데이터 (mockUsers.js, mockClinics.js)
├── components/      # AdminRoute 등 공통 컴포넌트
├── App.jsx          # 라우팅 설정
└── main.jsx

```
---

## ⚙️ Tech Stack | 기술 스택
React + Vite

React Router

Naver Maps API (optional)

Firebase-ready structure

XLSX for Excel export

LocalStorage for mock session management

---