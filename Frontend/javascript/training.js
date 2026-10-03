const DATA_PATH = "../data/training/";
const STORE_KEY = "prepforge_training_v3";

const state = {tracks:[], data:{}, currentTrack:null, currentTopic:null, questions:[], index:0, score:0, selected:null, challenges:[]};

document.addEventListener("DOMContentLoaded", init);

async function init(){
  try{
    state.tracks=await loadJSON("tracks.json");
    for(const t of state.tracks) state.data[t.id]=await loadJSON(`${t.id}.json`);
    state.challenges=await loadJSON("daily-challenges.json");
    renderHome();
  }catch(e){console.error(e); document.querySelector("#trainingApp").innerHTML="<section class='dashboard-section'><h2>Training</h2><p>Open this page with Live Server and try again.</p></section>";}
}
async function loadJSON(file){const r=await fetch(DATA_PATH+file); if(!r.ok) throw Error(file); return r.json();}
function store(){return JSON.parse(localStorage.getItem(STORE_KEY)||'{"topics":{},"attempts":0,"correct":0,"streak":0,"lastDay":null,"daily":{}}');}
function save(s){localStorage.setItem(STORE_KEY,JSON.stringify(s));}
function topics(){return state.tracks.flatMap(t=>(state.data[t.id]?.topics||[]).map(x=>({...x,trackId:t.id,trackName:t.name})));}

function touch(){
  const s=store(), today=new Date().toISOString().slice(0,10);
  if(s.lastDay!==today){const y=new Date(Date.now()-86400000).toISOString().slice(0,10); s.streak=s.lastDay===y?(s.streak||0)+1:1; s.lastDay=today;}
  save(s);
}
function progress(id){return store().topics[id]?.progress||0;}
function progressBar(p){
  return `
    <div class="progress-bar">
      <div class="progress-fill" style="width:${p}%"></div>
    </div>

    <div class="progress-details">
      <span>${p}% complete</span>
      <span>${p === 100 ? "✓ Completed" : "In progress"}</span>
    </div>
  `;
}
function esc(s){return String(s).replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;");}

function summary(){
  const s=store(), ts=topics(), vals=ts.map(t=>progress(t.id));
  return {overall:Math.round(vals.reduce((a,b)=>a+b,0)/vals.length),completed:ts.filter(t=>s.topics[t.id]?.completed).length,attempts:s.attempts,accuracy:s.attempts?Math.round(s.correct/s.attempts*100):0,streak:s.streak||0};
}

function renderHome(){
  state.currentTrack = null;

  const st = summary();
  const totalTopics = topics().length;

  document.querySelector("#trainingApp").innerHTML = `
    
    <!-- TRAINING HEADER -->
    <section class="dashboard-section">
      <div class="section-header">
        <div>
          <h1>Build Your Skills</h1>
          <p>Learn concepts, practice questions and improve your placement readiness.</p>
        </div>

        <button class="training-btn" id="daily">
          🔥 Daily Challenge
        </button>
      </div>
    </section>

    <!-- PROGRESS OVERVIEW -->
    <section class="dashboard-section">
      <div class="training-progress-overview">

        <div class="overall-progress-card">
          <div class="progress-card-top">
            <div>
              <span class="progress-label">📈 OVERALL PROGRESS</span>
              <h2>${st.overall}%</h2>
              <p>
                ${st.completed} of ${totalTopics} topics completed
              </p>
            </div>

            <div class="progress-circle">
              <span>${st.overall}%</span>
            </div>
          </div>

          <div class="large-progress-bar">
            <div style="width:${st.overall}%"></div>
          </div>

          <p class="progress-message">
            ${st.overall === 0
              ? "Start your learning journey today."
              : st.overall < 50
              ? "Good start! Keep building your skills."
              : st.overall < 80
              ? "You're making great progress!"
              : "Excellent progress! Keep going!"}
          </p>
        </div>

        <!-- STAT CARDS -->
        <div class="training-mini-stats">

          <div class="training-stat-card">
            <div class="stat-icon">📚</div>
            <div>
              <strong>${st.completed}/${totalTopics}</strong>
              <span>Topics Completed</span>
              <small>
                ${totalTopics - st.completed} remaining
              </small>
            </div>
          </div>

          <div class="training-stat-card">
            <div class="stat-icon">🎯</div>
            <div>
              <strong>${st.attempts}</strong>
              <span>Questions Attempted</span>
              <small>
                Keep practicing
              </small>
            </div>
          </div>

          <div class="training-stat-card">
            <div class="stat-icon">✓</div>
            <div>
              <strong>${st.accuracy}%</strong>
              <span>Accuracy</span>
              <small>
                ${st.accuracy >= 80
                  ? "Excellent!"
                  : st.accuracy >= 60
                  ? "Good work!"
                  : "Keep practicing"}
              </small>
            </div>
          </div>

          <div class="training-stat-card streak-card">
            <div class="stat-icon">🔥</div>
            <div>
              <strong>${st.streak} ${st.streak === 1 ? "Day" : "Days"}</strong>
              <span>Learning Streak</span>
              <small>
                ${st.streak > 0 ? "Keep it going!" : "Start today!"}
              </small>
            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- LEARNING TRACKS -->
    <section class="dashboard-section">
      <div class="section-header">
        <div>
          <h2>Learning Tracks</h2>
          <p>Choose a complete skill path and build your knowledge step by step.</p>
        </div>
      </div>

      <div class="learning-cards" id="tracks"></div>
    </section>

    <!-- CONTINUE LEARNING -->
    <section class="dashboard-section">
      <div class="section-header">
        <div>
          <h2>Continue Learning</h2>
          <p>Pick up where you left off.</p>
        </div>
      </div>

      <div id="continue"></div>
    </section>

    <!-- SKILL PROGRESS -->
    <section class="dashboard-section">
      <div class="section-header">
        <div>
          <h2>Skill Progress</h2>
          <p>Track your progress across every learning area.</p>
        </div>
      </div>

      <div id="skills"></div>
    </section>
  `;

  document.querySelector("#daily").onclick = renderDaily;

  renderTracks();
  renderContinue();
  renderSkills();
}

function renderTracks(){
  const box=document.querySelector("#tracks"), s=store();
  box.innerHTML=state.tracks.map(t=>{
    const ts = state.data[t.id]?.topics || [];
    const p = ts.length 
        ? Math.round(ts.reduce((a, x) => a + progress(x.id), 0) / ts.length) 
        : 0;
    return `<article class="learning-card"><div class="card-icon">${t.icon}</div><h3>${t.name}</h3><p>${t.description}</p><p><b>${ts.length} topics</b> · ${p}%</p>${progressBar(p)}<button class="training-btn" data-track="${t.id}">${p?"Continue Learning":"Start Learning"}</button></article>`;
  }).join("");
  box.querySelectorAll("[data-track]").forEach(b=>b.onclick=()=>renderTrack(b.dataset.track));
}

function renderTrack(id){
  state.currentTrack=id; const t=state.tracks.find(x=>x.id===id), s=store(), box=document.querySelector("#trainingApp");
  box.innerHTML=`<section class="dashboard-section"><div class="section-header"><div><h1>${t.icon} ${t.name}</h1><p>${t.description}</p></div><button class="training-btn" id="back">← Back</button></div><div class="learning-cards">${state.data[id].topics.map(x=>{const p=progress(x.id);return `<article class="learning-card"><h3>${x.title}</h3><p>${x.description}</p><p><b>${x.difficulty}</b> · ${x.estimatedTime} · ${x.practice.length} questions</p>${progressBar(p)}<button class="training-btn" data-topic="${x.id}">${p?"Continue":"Learn Topic"}</button></article>`}).join("")}</div></section>`;
  document.querySelector("#back").onclick=renderHome;
  box.querySelectorAll("[data-topic]").forEach(b=>b.onclick=()=>renderTopic(id,b.dataset.topic));
}

function renderTopic(trackId,topicId){
  const topic=state.data[trackId].topics.find(x=>x.id===topicId); state.currentTopic=topic;
  document.querySelector("#trainingApp").innerHTML=`<section class="dashboard-section"><div class="section-header"><div><h1>${topic.title}</h1><p>${topic.description}</p></div><button class="training-btn" id="back">← Back to Topics</button></div>
  <div class="training-tabs"><button class="tab-btn active" data-tab="learn">Learn</button><button class="tab-btn" data-tab="examples">Examples</button><button class="tab-btn" data-tab="practice">Practice (${topic.practice.length})</button></div><div id="panel"></div></section>`;
  document.querySelector("#back").onclick=()=>renderTrack(trackId);
  document.querySelectorAll(".tab-btn").forEach(b=>b.onclick=()=>tab(b.dataset.tab,b));
  tab("learn",document.querySelector("[data-tab=learn]"));
}
function tab(name,btn){
  document.querySelectorAll(".tab-btn").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  const p=document.querySelector("#panel"), t=state.currentTopic;
  if(name==="learn") p.innerHTML=`<div class="learning-section">${t.learn.sections.map(x=>`<div class="content-block"><h3>${x.heading}</h3><p>${x.content}</p></div>`).join("")}</div><div class="learning-section"><h3>Current Progress</h3>${progressBar(progress(t.id))}</div><button class="training-btn" id="practiceNow">Start Practice</button>`;
  if(name==="examples") p.innerHTML=t.examples.map(x=>`<div class="learning-section"><h3>${x.title}</h3><p>${x.explanation}</p></div>`).join("");
  if(name==="practice"){state.questions=[...t.practice];state.index=0;state.score=0;state.selected=null;question();}
  document.querySelector("#practiceNow")?.addEventListener("click",()=>{document.querySelector("[data-tab=practice]").click();});
}

function question(){
  const p=document.querySelector("#panel"), q=state.questions[state.index];
  if(!q)return result();
  p.innerHTML=`<div class="quiz-header"><span>Question ${state.index+1} of ${state.questions.length}</span><span>${q.difficulty}</span></div><div class="learning-section"><h2>${q.question}</h2><div class="option-list">${q.options.map((o,i)=>`<button class="option-btn" data-o="${esc(o)}">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}</div><p id="feedback"></p><button class="training-btn" id="submit" disabled>Submit Answer</button><button class="training-btn" id="next" style="display:none">Next Question →</button></div>`;
  p.querySelectorAll(".option-btn").forEach(b=>b.onclick=()=>{p.querySelectorAll(".option-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");state.selected=b.dataset.o;document.querySelector("#submit").disabled=false;});
  document.querySelector("#submit").onclick=submit;
}
function submit(){
  const q=state.questions[state.index], s=store(), correct=state.selected===q.answer; s.attempts++; if(correct){s.correct++;state.score++;} save(s);
  document.querySelector("#feedback").innerHTML=correct?`<b>✓ Correct!</b> ${q.explanation}`:`<b>✗ Incorrect.</b> Correct answer: <b>${q.answer}</b><br>${q.explanation}`;
  document.querySelectorAll(".option-btn").forEach(x=>x.disabled=true);
  document.querySelector("#submit").style.display="none"; document.querySelector("#next").style.display="inline-block";
  const done=state.index+1, p=Math.round(done/state.questions.length*100), old=progress(state.currentTopic.id), ss=store();
  ss.topics[state.currentTopic.id]={...(ss.topics[state.currentTopic.id]||{}),progress:Math.max(old,p),completed:p===100,updatedAt:new Date().toISOString()}; save(ss); touch();
  if (p === 100) {
  setTimeout(() => {
    renderTrack(state.currentTrack);
  }, 800);
}
  document.querySelector("#next").onclick=()=>{state.index++;state.selected=null;question();};
}
function result(){
  const p=Math.round(state.score/state.questions.length*100), ss=store();
  ss.topics[state.currentTopic.id]={...(ss.topics[state.currentTopic.id]||{}),progress:100,completed:true,updatedAt:new Date().toISOString()};save(ss);
  document.querySelector("#panel").innerHTML=`<div class="learning-section"><h2>Practice Complete 🎉</h2><p>Score: <b>${state.score}/${state.questions.length}</b> (${p}%)</p>${progressBar(100)}<button class="training-btn" id="retry">Retry</button><button class="training-btn" id="topics">Back to Topics</button></div>`;
  document.querySelector("#retry").onclick=()=>{state.index=0;state.score=0;question();};
  document.querySelector("#topics").onclick=()=>renderTrack(state.currentTrack);
}
function renderContinue(){
  const box=document.querySelector("#continue"), s=store(), recent=topics().filter(x=>s.topics[x.id]?.progress>0).sort((a,b)=>new Date(s.topics[b.id].updatedAt)-new Date(s.topics[a.id].updatedAt))[0];
  box.innerHTML=recent?`<div class="activity-card"><h3>${recent.title}</h3><p>${recent.trackName}</p>${progressBar(progress(recent.id))}<button class="training-btn" id="go">Continue</button></div>`:`<div class="activity-card"><h3>Start your learning journey</h3><p>Choose a track above to begin.</p></div>`;
  document.querySelector("#go")?.addEventListener("click",()=>renderTopic(recent.trackId,recent.id));
}
function renderSkills(){
  const box = document.querySelector("#skills");

  box.innerHTML = state.tracks.map(t => {
    const ts = state.data[t.id]?.topics || [];

    const p = ts.length
      ? Math.round(
          ts.reduce((a, x) => a + progress(x.id), 0) / ts.length
        )
      : 0;

    return `
      <div class="skill-row">
        <div>
          <b>${t.icon} ${t.name}</b>
          <span>${p}%</span>
        </div>
        ${progressBar(p)}
      </div>
    `;
  }).join("");
}
function renderDaily(){
  const q=state.challenges[Math.floor(Date.now()/86400000)%state.challenges.length], root=document.querySelector("#trainingApp");
  root.innerHTML=`<section class="dashboard-section"><div class="section-header"><div><h1>🔥 Daily Challenge</h1><p>${q.topicTitle} · ${q.difficulty}</p></div><button class="training-btn" id="back">← Back</button></div><div class="learning-section"><h2>${q.question}</h2><div class="option-list">${q.options.map((o,i)=>`<button class="option-btn" data-o="${esc(o)}">${String.fromCharCode(65+i)}. ${o}</button>`).join("")}</div><p id="feedback"></p><button class="training-btn" id="submit" disabled>Submit</button></div></section>`;
  document.querySelector("#back").onclick=renderHome; let selected=null;
  root.querySelectorAll(".option-btn").forEach(b=>b.onclick=()=>{root.querySelectorAll(".option-btn").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selected=b.dataset.o;document.querySelector("#submit").disabled=false;});
  document.querySelector("#submit").onclick=()=>{const s=store(),ok=selected===q.answer;s.attempts++;if(ok)s.correct++;s.daily[new Date().toISOString().slice(0,10)]={id:q.question,correct:ok};save(s);document.querySelector("#feedback").innerHTML=ok?`<b>✓ Correct!</b> ${q.explanation}`:`<b>✗ Incorrect.</b> Correct answer: <b>${q.answer}</b><br>${q.explanation}`;};
}
