Visit **[shear-lab.github.io](https://shear-lab.github.io)** 🚀

# SHEAR Lab 홈페이지

`main` 브랜치에 파일을 올리면 몇 분 뒤 사이트에 자동으로 반영됩니다. 사진은 원본 그대로 올려도 사이트를 만들 때 자동으로 축소됩니다.

## 뉴스 올리기

1. 사진을 `images/news/` 폴더에 올립니다. (GitHub에서 폴더를 열고 **Add file → Upload files**)
2. `news/` 폴더에 새 파일을 만듭니다. 파일 이름은 `날짜-짧은영문이름.md` 형식입니다. 예: `2026-11-20-kssc-conference.md`
3. 아래처럼 적고 저장(Commit)합니다.

```
---
title: "Dr. Park presented his research work at the 2026 KSSC conference"
images:
  - KSSC_1120_1.jpg
  - KSSC_1120_2.jpg
---

**Dr. Park** shared his research progress at the conference.
```

- 날짜는 파일 이름에서 읽습니다. 따로 적지 않아도 됩니다.
- `images`에는 사진 파일 이름만 적습니다. 첫 번째 사진이 목록의 대표 사진이 되고, 장수에 맞춰 자동으로 배치됩니다.
- 사진이 없으면 `images` 부분을 지우면 됩니다.
- 본문은 비워 두어도 됩니다. `**굵게**`, `*기울임*`, `- 목록`을 쓸 수 있습니다.

기존 뉴스를 고치려면 `news/` 폴더에서 해당 파일을 열어 연필 아이콘을 누르면 됩니다.

## 다른 내용 고치기

| 고칠 내용 | 파일 |
|---|---|
| 구성원 (추가, 졸업생 이동, 교수 경력) | `_data/team.yaml` (사진은 `images/`) |
| 과제 목록 | `_data/projects.yaml` |
| 모집 현황 | `_data/hiring.yaml` |
| 연구 분야 4개 | `_data/research.yaml` |
| 홈 화면 문구, 연락처, 메뉴 | `_data/site.yaml` |
| 심사 중인 논문 | `_data/inprogress.yaml` |

논문 목록(`_data/citations.yaml`)은 ORCID에서 자동으로 가져오므로 직접 고치지 않습니다.

## 구조

- `_includes/`, `*.njk`: 페이지 틀
- `assets/css/main.css`: 디자인(색, 글꼴, 여백)
- `eleventy.config.js`: 빌드 설정과 사진 자동 축소
- `_cite/`: 논문 자동 수집 스크립트 (Lab Website Template에서 가져옴, `LICENSE.md` 참고)

내 컴퓨터에서 미리 보려면 Node.js를 설치한 뒤 `npm install`, `npm start`를 실행합니다.
