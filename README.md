# QuickSearch 랜딩 페이지

제품 소개, 화면 예시, 설치 및 사용 가이드, FAQ를 담은 한국어 정적 사이트입니다. 별도 빌드나 서버 프로그램은 필요하지 않습니다. 화면 예시는 가상 데이터이며 실제 검색은 설치한 QuickSearch에서 수행합니다.

## 로컬 미리보기

프로젝트 루트에서 실행합니다.

```powershell
python -m http.server 8787 --bind 127.0.0.1 --directory LandingPage
```

브라우저에서 http://127.0.0.1:8787 에 접속합니다.

## Vercel 배포 (권장)

1. `LandingPage` 폴더를 Git 저장소에 올리고 Vercel에서 해당 저장소를 Import 합니다. 사내 소스가 포함되지 않도록 이 폴더만 별도 저장소에 올리는 방법을 권장합니다.
2. 이 폴더만 올렸다면 Root Directory는 기본값, 전체 프로젝트 저장소라면 `LandingPage`로 설정합니다.
3. Framework Preset은 **Other**, Build Command는 비워 두고, Output Directory는 **`.`** 로 설정합니다. 별도 의존성 설치는 필요 없습니다.
4. Deploy를 누르면 `프로젝트명.vercel.app` 주소가 생성됩니다.

CLI를 사용하려면 이 폴더에서 `npx vercel`을 실행하여 미리보기 배포 후, 확인이 끝나면 `npx vercel --prod`로 배포할 수 있습니다. 현재 작업에서는 실제 외부 배포를 수행하지 않았습니다.

Vercel Hobby는 개인 비상업적 용도에 한정되므로 회사 제품 소개·배포에는 Pro 등 적합한 요금제를 사용하세요.
- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/git

## 설치 파일 관리

`downloads`에 v0.1.0 설치 파일, SHA-256 체크섬, 설치 안내를 포함했습니다. 새 버전 배포 시 세 파일을 교체하고 `index.html`의 다운로드 경로·버전·용량을 함께 수정하세요. 기본 배포 시 설치 파일도 인터넷에서 다운로드할 수 있습니다. 사내 한정 배포라면 배포 접근 제한을 설정하거나 다운로드 링크를 사내 인증 저장소 주소로 교체하세요.

현재 설치 파일은 약 50 MiB이며 서명되지 않은 시험판입니다. 별도 PC에서 설치·삭제·재부팅 확인 후 배포 범위를 확대하세요. OneDrive 검색은 아직 완전 지원하지 않으므로 FAQ의 제한 사항을 유지하세요.

## 다른 호스팅

Cloudflare Pages도 정적 파일을 직접 업로드할 수 있습니다. 단일 파일 제한이 25 MiB이므로 현재 설치 EXE는 R2 또는 다른 다운로드 저장소에 올리고 링크를 바꿔야 합니다. Vercel 사용 경험이 있다면 이 페이지 역시 Vercel로 운영하는 편이 간단합니다.
- https://developers.cloudflare.com/pages/get-started/direct-upload/
- https://developers.cloudflare.com/pages/platform/limits/

## 구성

- `index.html`: 소개·매뉴얼·FAQ 및 다운로드 링크
- `styles.css`: PC/모바일 반응형 디자인
- `app.js`: 예시 화면 전환 및 검색 문구 복사 (외부 API 호출 없음)
- `vercel.json`: 정적 호스팅 및 보안/다운로드 헤더
- `downloads/`: 배포용 설치 파일

외부 분석 도구, 외부 폰트, API 키를 포함하지 않습니다. 랜딩 페이지는 QuickSearch 로컬 서비스와 연결하지 않으며, 제품 검색 화면은 설치 후 PC에서 `http://127.0.0.1:8765`로 이용합니다.
