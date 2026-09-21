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

CLI를 사용하려면 이 폴더에서 `npx vercel`을 실행하여 미리보기 배포 후, 확인이 끝나면 `npx vercel --prod`로 배포할 수 있습니다. Git 연동 배포에서는 `main` 브랜치에 새 릴리스를 푸시한 뒤 배포 상태를 확인합니다.

Vercel Hobby는 개인 비상업적 용도에 한정되므로 회사 제품 소개·배포에는 Pro 등 적합한 요금제를 사용하세요.
- https://vercel.com/docs/plans/hobby
- https://vercel.com/docs/git

## 설치 파일 관리

현재 배포 파일은 `QuickSearch-Setup-0.1.0-20260921-r4-x64.exe`입니다. 내용 검색 캐시를 사용자별·드라이브당 최대 100MB로 제한합니다. 본문은 검색할 때 읽고 일부만 압축 저장하며, 캐시에 없는 문서도 원본을 읽어 검색합니다. 기존 대용량 본문 DB는 업데이트 후 해당 드라이브의 내용 검색 프로세스 시작 시 설정을 유지하며 교체합니다. 문서 수와 형식에 따라 검색 시간이 길어질 수 있으며, 진행 중 결과를 표시합니다. 파일명·촬영일 등 메타데이터 색인은 별도입니다. 재부팅 후 준비 안내와 설치 프로그램 조회 성능 개선 등 r3의 기능도 유지합니다.

설치 EXE의 SHA-256은 `b6bb9dc4f57055ad514cb25569763e31f3b3c4d7d3d33f7c9f0769c4c9e16925`입니다. 관련 테스트 34개와 패키징된 내용 검색 프로세스의 통신·검색 테스트를 통과했습니다. 약 1MB 본문 210개를 저장한 캐시 한도 테스트에서는 디스크 사용량이 최대 99,598,337바이트였으며, 캐시에서 제외된 문서의 원본 검색도 별도로 검증했습니다. 실제 검색 시간은 PC와 문서 구성에 따라 달라집니다.

`downloads`에 v0.1.0 설치 파일, SHA-256 체크섬, 설치 안내를 포함했습니다. 기본 배포 시 설치 파일도 인터넷에서 다운로드할 수 있습니다. 사내 한정 배포라면 배포 접근 제한을 설정하거나 다운로드 링크를 사내 인증 저장소 주소로 교체하세요.

같은 버전의 새 빌드를 준비할 때는 프로젝트 루트에서 다음을 실행합니다. 배포 이름은 매번 새 값으로 지정합니다.

```powershell
python build_installer.py
python tests/package_smoke.py
python scripts/prepare-landing-release.py --release 20260921-r4
```

준비 스크립트는 설치 파일의 SHA-256을 검증하고, 다운로드 파일·체크섬·페이지 링크·표시 용량을 갱신합니다. 이전 다운로드 파일은 정리하며, 로컬 링크를 검사한 뒤 `dist/QuickSearch-LandingPage-20260921-r4.zip`과 ZIP 체크섬을 만듭니다. ZIP에는 정적 사이트와 배포 파일만 포함됩니다. 압축을 풀어 사이트 루트로 사용할 수 있으며, Git 이력·개발 소스·개인 설정은 포함하지 않습니다. 이 단계는 외부 업로드나 실제 배포를 수행하지 않습니다.

현재 설치 파일은 약 56.0 MiB이며 서명되지 않은 시험판입니다. 별도 PC에서 설치·삭제·재부팅 확인 후 배포 범위를 확대하세요. OneDrive 검색은 아직 완전 지원하지 않으므로 FAQ의 제한 사항을 유지하세요.

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
