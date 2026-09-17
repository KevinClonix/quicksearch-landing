"use strict";
const scenarios = {
  natural: {query:"최근 한 달에 작성된 문서 찾아줘",filters:["문서","생성일 · 최근 1개월","C: 드라이브"],note:"자연어를 날짜와 파일 종류 조건으로 변환합니다.",rows:[['word','W','프로젝트_제안서.docx','C:\\업무\\프로젝트','248 KB'],['excel','X','월간_매출보고.xlsx','C:\\업무\\보고서','1.2 MB'],['pdf','P','서비스_소개서.pdf','C:\\업무\\자료','3.4 MB']]},
  content: {query:'본문에 "계약금"이 들어간 PDF',filters:['PDF','본문 포함 · 계약금','색인된 문서'],note:'문서 속 단어와 구절을 PC의 본문 색인에서 찾습니다.',rows:[['pdf','P','용역_계약서.pdf','… 계약금은 총 금액의 30%로 …','420 KB'],['pdf','P','거래_약정서.pdf','… 계약금 지급일은 협의하여 …','186 KB'],['pdf','P','계약_체크리스트.pdf','… 계약금과 잔금 조건 확인 …','92 KB']]},
  name: {query:'보고서',filters:['파일명 포함 · 보고서','모든 확장자','C: 드라이브'],note:'파일 이름을 검색하고, 결과를 우클릭해 바로 작업합니다.',rows:[['word','W','프로젝트_완료보고서.docx','C:\\업무\\프로젝트','536 KB'],['excel','X','월간_보고서.xlsx','C:\\업무\\보고서','1.2 MB'],['pdf','P','시장조사_보고서.pdf','C:\\업무\\자료','2.8 MB']]}
};
function showScenario(id){
  const scenario=scenarios[id];
  document.querySelectorAll('[data-demo]').forEach(button=>{const selected=button.dataset.demo===id;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;});
  document.getElementById('demo-panel').setAttribute('aria-labelledby','tab-'+id);
  document.getElementById('demo-query').textContent=scenario.query;
  document.getElementById('demo-explanation').textContent=scenario.note;
  const filters=document.getElementById('demo-filters');filters.replaceChildren();
  scenario.filters.forEach(text=>{const span=document.createElement('span');span.textContent=text;filters.append(span);});
  const results=document.getElementById('demo-results');results.replaceChildren();
  scenario.rows.forEach(([kind,letter,name,path,size],i)=>{
    const row=document.createElement('div');row.className='demo-row'+(i===0?' selected':'');
    const icon=document.createElement('span');icon.className='file-type '+kind;icon.textContent=letter;
    const description=document.createElement('div'),title=document.createElement('strong'),location=document.createElement('small');title.textContent=name;location.textContent=path;description.append(title,location);
    const bytes=document.createElement('span');bytes.className='file-size';bytes.textContent=size;row.append(icon,description,bytes);results.append(row);
  });
  document.getElementById('demo-count').textContent=scenario.rows.length;
}
const tabs=[...document.querySelectorAll('[data-demo]')];
tabs.forEach((button,index)=>{
  button.addEventListener('click',()=>showScenario(button.dataset.demo));
  button.addEventListener('keydown',event=>{
    let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();tabs[next].focus();showScenario(tabs[next].dataset.demo);}
  });
});
let toastTimer;
function toast(message){const element=document.getElementById('toast');element.textContent=message;element.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>{element.hidden=true;},3000);}
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(button.dataset.copy);toast('검색 예시를 복사했습니다. QuickSearch에 붙여 넣으세요.');}
  catch{toast('자동 복사를 사용할 수 없습니다. 아래 예시 문장을 선택해 복사해 주세요.');const range=document.createRange();range.selectNodeContents(button.firstElementChild);const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);}
}));
