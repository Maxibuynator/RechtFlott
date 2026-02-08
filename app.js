/* ──────────────────────────────────────────── */
/*  RechtFlott — 10-Finger Typing for Lawyers  */
/* ──────────────────────────────────────────── */

// ── Modes & lesson data ──────────────────────
const modes = {
  learning: {
    id: "learning",
    name: "Lernmodus",
    chip: "Lernmodus",
    lessons: [
      { id: "ch-1", chapter: "Kapitel 1", title: "Grundstellung", description: "ASDF JKLÖ im Gleichgewicht.", text: "asdf jklö asdf jklö fff jjj ddd kkk sss lll ööö asdf jklö" },
      { id: "ch-2", chapter: "Kapitel 2", title: "Obere Reihe", description: "QWER UIOP mit ruhiger Hand.", text: "qwer uiop qwer uiop we ri op qu pw er io qwer uiop" },
      { id: "ch-3", chapter: "Kapitel 3", title: "Untere Reihe", description: "ZXCV NM sauber tippen.", text: "zxcv nm zxcv nm cv nm zx cv nm zxcv nm" },
      { id: "ch-4", chapter: "Kapitel 4", title: "Zahlen", description: "Reihe 1–0 ohne Stress.", text: "1 2 3 4 5 6 7 8 9 0 123 456 789 10" },
      { id: "ch-5", chapter: "Kapitel 5", title: "Wort Mix", description: "Kurze Wörter, gute Taktung.", text: "fokus ruhe tempo tastatur finger tipp ziel genau" },
    ],
  },
  legal: {
    id: "legal",
    name: "Juristische Begriffe",
    chip: "Jura",
    variants: {
      terms:       { name: "Begriffe",      lessons: [] },
      abbrev:      { name: "Abkürzungen",   lessons: [] },
      definitions: { name: "Definitionen",  lessons: [] },
      mix:         { name: "Examens-Mix",   lessons: [] },
      daily:       { name: "Daily Drill",   lessons: [] },
    },
  },
};

// ── DOM references ───────────────────────────
const $ = (id) => document.getElementById(id);
const lessonList     = $("lessonList");
const typingArea     = $("typingArea");
const typingInput    = $("typingInput");
const progressBar    = $("progressBar");
const wpmEl          = $("wpm");
const accuracyEl     = $("accuracy");
const errorsEl       = $("errors");
const timeEl         = $("time");
const bestWpmEl      = $("bestWpm");
const bestStat       = $("bestStat");
const modeScreen     = $("modeScreen");
const app            = $("app");
const modeChip       = $("modeChip");
const legalToggle    = $("legalToggle");
const chapterSelect  = $("chapterSelect");
const lessonSearch   = $("lessonSearch");
const loadMoreBtn    = $("loadMore");
const keyboard       = $("keyboard");
const fingerLegend   = $("fingerLegend");
const keyboardWrap   = $("keyboardWrap");
const completion     = $("completion");
const completionIcon = $("completionIcon");
const completionTitle= $("completionTitle");
const completionSub  = $("completionSub");
const cWpm           = $("cWpm");
const cAcc           = $("cAcc");
const cTime          = $("cTime");
const completionBadge= $("completionBadge");
const defPanel       = $("definitionPanel");
const defTerm        = $("definitionTerm");
const defText        = $("definitionText");
const sidebar        = $("sidebar");
const streakText     = $("streakText");
const streakGoal     = $("streakGoal");
const confettiCanvas = $("confetti");

// ── State ────────────────────────────────────
let activeMode       = modes.learning;
let activeVariantId  = "mix";
let allLessons       = [];
let filteredLessons  = [];
let currentLessons   = [];
let activeLesson     = null;
let startTime        = null;
let errors           = 0;
let completed        = false;
let defVisible       = false;
let visibleCount     = 40;
const PAGE_SIZE      = 40;
let datasets         = { terms: null, abbrev: null, definitions: null };
let keyboardVisible  = true;
let sidebarOpen      = true;

// ── Pools (no-repeat, auto-generating) ───────
let pools    = { terms: [], abbrevs: [], defs: [] };
let rechtsgebietFilter = "all";
let counters = { terms: 0, abbrevs: 0, defs: 0, mix: 0 };

// ── LocalStorage helpers ─────────────────────
const STORE_KEY = "rechtflott";

function loadStore() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
  } catch { return {}; }
}

function saveStore(data) {
  const store = loadStore();
  Object.assign(store, data);
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function getHistory() {
  const store = loadStore();
  return store.history || {};
}

function recordCompletion(wpm, acc) {
  const store = loadStore();
  const key = todayKey();
  if (!store.history) store.history = {};
  if (!store.history[key]) store.history[key] = { count: 0, bestWpm: 0 };
  store.history[key].count += 1;
  store.history[key].bestWpm = Math.max(store.history[key].bestWpm, wpm);
  if (!store.bestWpm || wpm > store.bestWpm) store.bestWpm = wpm;
  saveStore(store);
}

function getStreak() {
  const history = getHistory();
  let streak = 0;
  const d = new Date();
  // Start from yesterday (today might not be done yet, but if today has activity, count it)
  const todayStr = todayKey();
  if (history[todayStr]) streak = 1;
  let checkDate = new Date(d);
  checkDate.setDate(checkDate.getDate() - 1);
  while (true) {
    const key = `${checkDate.getFullYear()}-${String(checkDate.getMonth()+1).padStart(2,"0")}-${String(checkDate.getDate()).padStart(2,"0")}`;
    if (history[key]) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else break;
  }
  return streak;
}

function getTodayCount() {
  const history = getHistory();
  const entry = history[todayKey()];
  return entry ? entry.count : 0;
}

function updateStreakUI() {
  const streak = getStreak();
  const today = getTodayCount();
  const goal = 5;
  streakText.textContent = streak > 0 ? `🔥 ${streak} Tag${streak > 1 ? "e" : ""} Streak` : "🔥 Starte deinen Streak!";
  streakGoal.textContent = `Ziel: ${goal} Lektionen heute (${Math.min(today, goal)}/${goal})`;
  if (today >= goal) streakGoal.textContent = `✅ Tagesziel erreicht! (${today} Lektionen)`;
}

function updateBestWpmUI() {
  const store = loadStore();
  if (store.bestWpm) {
    bestStat.classList.remove("hidden");
    bestWpmEl.textContent = store.bestWpm;
  }
}

// ── Dark Mode ────────────────────────────────
function initDarkMode() {
  const store = loadStore();
  if (store.dark) document.body.classList.add("dark");
  updateDarkIcon();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  saveStore({ dark: document.body.classList.contains("dark") });
  updateDarkIcon();
  try { if (typingInput) typingInput.focus(); } catch (e) { console.warn('focus error', e); }
}

function updateDarkIcon() {
  $("toggleDark").textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// ── Keyboard layout ──────────────────────────
const keyboardRows = [
  ["1","2","3","4","5","6","7","8","9","0","ß"],
  ["q","w","e","r","t","y","u","i","o","p","ü"],
  ["a","s","d","f","g","h","j","k","l","ö","ä"],
  ["z","x","c","v","b","n","m",",","."],
  ["space"],
];

const fingerMap = {
  "1":"lp","2":"lr","3":"lm","4":"li","5":"li","6":"ri","7":"ri","8":"rm","9":"rr","0":"rp",
  q:"lp",w:"lr",e:"lm",r:"li",t:"li",y:"ri",u:"ri",i:"rm",o:"rr",p:"rp",
  a:"lp",s:"lr",d:"lm",f:"li",g:"li",h:"ri",j:"ri",k:"rm",l:"rr",
  z:"lp",x:"lr",c:"lm",v:"li",b:"li",n:"ri",m:"ri",",":"rm",".":"rr",
  "ß":"rp","ü":"rp","ö":"rp","ä":"rp",space:"thumb",
};

const fingers = [
  { id: "lp", label: "Li. klein" },
  { id: "lr", label: "Li. ring" },
  { id: "lm", label: "Li. mittel" },
  { id: "li", label: "Li. zeige" },
  { id: "ri", label: "Re. zeige" },
  { id: "rm", label: "Re. mittel" },
  { id: "rr", label: "Re. ring" },
  { id: "rp", label: "Re. klein" },
  { id: "thumb", label: "Daumen" },
];

function renderKeyboard() {
  keyboard.innerHTML = "";
  const homeKeys = new Set(["a","s","d","f","j","k","l","ö"]);
  keyboardRows.forEach((row) => {
    row.forEach((key) => {
      const el = document.createElement("div");
      el.className = "key";
      el.dataset.key = key;
      const f = fingerMap[key];
      if (f) {
        el.classList.add(`finger-${f}`);
        el.dataset.finger = f;
      }
      if (key === "space") { el.textContent = "Leertaste"; el.classList.add("wide"); }
      else if (key === "ß") { el.textContent = "\u00df"; el.style.textTransform = "none"; }
      else { el.textContent = key; }
      if (homeKeys.has(key)) el.classList.add("home");
      if (key === "f" || key === "j") el.classList.add("bump");
      keyboard.appendChild(el);
    });
  });
}

function renderLegend() {
  fingerLegend.innerHTML = "";
  fingers.forEach((f) => {
    const pill = document.createElement("div");
    pill.className = `finger-pill finger-${f.id}`;
    pill.dataset.finger = f.id;
    pill.textContent = f.label;
    fingerLegend.appendChild(pill);
  });
}

function highlightKey(key) {
  keyboard.querySelectorAll(".key").forEach((el) => el.classList.remove("active"));
  if (!key) { highlightFinger(""); updateFingerHint(""); return; }
  const norm = key === " " ? "space" : key.toLowerCase();
  const target = keyboard.querySelector(`[data-key="${norm}"]`);
  if (target) target.classList.add("active");
  const fid = fingerMap[norm] || "";
  highlightFinger(fid);
  updateFingerHint(fid, key);
}

function updateFingerHint(fingerId, key) {
  const hint = $("fingerHint");
  if (!hint) return;
  if (!fingerId) { hint.textContent = ""; return; }
  const f = fingers.find((x) => x.id === fingerId);
  const k = key === " " ? "Leertaste" : key;
  hint.innerHTML = f ? `<span class="hint-finger">${f.label}</span> <span class="hint-key">${k}</span>` : "";
}

function highlightFinger(id) {
  fingerLegend.querySelectorAll(".finger-pill").forEach((p) => p.classList.remove("active"));
  if (!id) return;
  const t = fingerLegend.querySelector(`[data-finger="${id}"]`);
  if (t) t.classList.add("active");
}

// ── Lesson rendering ─────────────────────────
function renderLessons() {
  lessonList.innerHTML = "";
  const slice = filteredLessons.slice(0, visibleCount);
  slice.forEach((lesson) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "lesson-card";
    card.dataset.lesson = lesson.id;
    if (activeLesson && lesson.id === activeLesson.id) card.classList.add("active");
    const meta = lesson.chapter ? `<div class="lesson-meta">${lesson.chapter}</div>` : "";
    card.innerHTML = `${meta}<div class="lesson-title">${lesson.title}</div><div class="lesson-desc">${lesson.description || ""}</div>`;
    card.addEventListener("click", () => selectLesson(lesson));
    lessonList.appendChild(card);
  });
  loadMoreBtn.classList.toggle("hidden", visibleCount >= filteredLessons.length);
}

function selectLesson(lesson) {
  activeLesson = lesson;
  lessonList.querySelectorAll(".lesson-card").forEach((c) =>
    c.classList.toggle("active", c.dataset.lesson === lesson.id)
  );
  resetSession();
  updateDefPanel();
  typingInput.focus();
}

// ── Mode / Variant switching ─────────────────
function setMode(modeId) {
  activeMode = modes[modeId];
  modeChip.textContent = activeMode.chip || activeMode.name;

  if (activeMode.variants) {
    activeVariantId = "mix";
    rechtsgebietFilter = "all";
    legalToggle.classList.remove("hidden");
    setVariant(activeVariantId);
  } else {
    legalToggle.classList.add("hidden");
    const rgToggle = $("rechtsgebietToggle");
    if (rgToggle) rgToggle.classList.add("hidden");
    defPanel.classList.add("hidden");
    lessonSearch.closest(".sidebar-filters").classList.remove("hidden");
    loadMoreBtn.parentElement.classList.remove("hidden");
    allLessons = [...activeMode.lessons];
    currentLessons = [...activeMode.lessons];
    buildChapterOptions();
    applyFilters();
  }
}

function setVariant(id) {
  activeVariantId = id;
  const v = activeMode.variants[id];
  allLessons = [...v.lessons];
  currentLessons = [...v.lessons];
  defPanel.classList.toggle("hidden", id !== "definitions");
  document.querySelectorAll("[data-variant]").forEach((b) =>
    b.classList.toggle("active", b.dataset.variant === id)
  );
  // Show/hide Rechtsgebiet sub-filter
  const rgToggle = $("rechtsgebietToggle");
  if (rgToggle) rgToggle.classList.toggle("hidden", id !== "definitions" && id !== "mix");
  // Hide search/filters — legal modes are all auto-generated
  lessonSearch.closest(".sidebar-filters").classList.add("hidden");
  loadMoreBtn.parentElement.classList.add("hidden");
  buildChapterOptions();
  applyFilters();
}

function setRechtsgebiet(area) {
  rechtsgebietFilter = area;
  document.querySelectorAll("[data-rg]").forEach((b) =>
    b.classList.toggle("active", b.dataset.rg === area)
  );
  // Refill defs pool with new filter
  refillPool("defs");
  // Re-generate current lesson
  if (activeVariantId === "definitions") {
    const v = activeMode.variants.definitions;
    v.lessons = [generateSingleDef()];
    allLessons = [...v.lessons];
    currentLessons = [...v.lessons];
    applyFilters();
  } else if (activeVariantId === "mix") {
    const v = activeMode.variants.mix;
    v.lessons = [generateSingleMix()];
    allLessons = [...v.lessons];
    currentLessons = [...v.lessons];
    applyFilters();
  }
}

// ── Definition panel ─────────────────────────
function updateDefPanel() {
  if (activeVariantId !== "definitions" || !activeLesson) return;
  defVisible = false;
  defTerm.textContent = activeLesson.term || activeLesson.title;
  defText.textContent = activeLesson.definition || activeLesson.text;
  defText.classList.add("hidden");
  $("toggleDefinition").textContent = "Anzeigen";
  const badge = $("rgBadge");
  if (badge) badge.textContent = activeLesson.rechtsgebiet || "";
}

// ── Typing logic ─────────────────────────────
function renderText() {
  typingArea.innerHTML = "";
  if (!activeLesson) return;
  // Prepare renderable text (normalize ellipsis etc.) and group characters into word wrappers
  const text = normalizeText(activeLesson.text || "");
  // store current render text length for progress/completion calculations
  currentRenderText = text;
  let wordWrapper = null;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isSpace = /\s/.test(char);
    if (!isSpace) {
      if (!wordWrapper) {
        wordWrapper = document.createElement('span');
        wordWrapper.className = 'word';
        typingArea.appendChild(wordWrapper);
      }
      const cspan = document.createElement('span');
      cspan.textContent = char;
      cspan.dataset.char = char;
      if (typingArea.childElementCount === 0 || (typingArea.firstChild === wordWrapper && wordWrapper.childElementCount === 0 && i === 0)) cspan.classList.add('active');
      wordWrapper.appendChild(cspan);
    } else {
      // close current word wrapper
      wordWrapper = null;
      const sspan = document.createElement('span');
      sspan.className = 'space';
      sspan.dataset.char = ' ';
      // Use a non-breaking space so the span always produces visible width
      sspan.textContent = '\u00A0';
      typingArea.appendChild(sspan);
    }
  }
}

// Hold the normalized text currently rendered (used for progress/completion)
let currentRenderText = "";

function normalizeText(t) {
  if (!t) return "";
  // Replace single unicode ellipsis with three dots to match typing behavior
  return t.replace(/\u2026/g, "...");
}

function resetSession() {
  typingInput.value = "";
  startTime = null;
  errors = 0;
  completed = false;
  completion.classList.remove("show");
  updateStats();
  renderText();
  updateProgress();
  if (activeLesson) highlightKey(getNextChar());
}

function getNextChar() {
  if (!activeLesson) return "";
  return (currentRenderText[typingInput.value.length] || "");
}

function updateProgress() {
  if (!activeLesson) return;
  const total = currentRenderText.length || (activeLesson.text || "").length;
  const pct = (typingInput.value.length / total) * 100;
  progressBar.style.width = `${Math.min(pct, 100)}%`;
}

function updateStats() {
  const typed = typingInput.value.length;
  const correct = typed - errors;
  const acc = typed === 0 ? 100 : Math.max(0, Math.round((correct / typed) * 100));
  const elapsed = startTime ? (Date.now() - startTime) / 60000 : 0;
  const wpm = elapsed > 0 ? Math.round((correct / 5) / elapsed) : 0;

  wpmEl.textContent = wpm;
  accuracyEl.textContent = `${acc}%`;
  errorsEl.textContent = errors;

  const sec = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
  const m = Math.floor(sec / 60);
  const s = String(sec % 60).padStart(2, "0");
  timeEl.textContent = `${m}:${s}`;

  return { wpm, acc, time: `${m}:${s}` };
}

function updateTypingFeedback() {
  const typed = typingInput.value.split("");
  const spans = typingArea.querySelectorAll("[data-char]");
  errors = 0;
  let hadError = false;

  spans.forEach((span, i) => {
    const ch = typed[i];
    span.classList.remove("correct", "incorrect", "active");
    if (ch == null) {
      if (i === typed.length) span.classList.add("active");
      return;
    }
    if (ch === span.dataset.char) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
      errors += 1;
      hadError = true;
    }
  });

  // Shake on error
  if (hadError && typed.length > 0) {
    const lastIdx = typed.length - 1;
    const lastSpan = spans[lastIdx];
    if (lastSpan && lastSpan.classList.contains("incorrect")) {
      typingArea.classList.add("shake");
      setTimeout(() => typingArea.classList.remove("shake"), 400);
    }
  }

  updateProgress();
  const stats = updateStats();

  if (typed.length >= currentRenderText.length) {
    completed = true;
    highlightKey("");
    showCompletion(stats);
  } else {
    highlightKey(getNextChar());
  }
}

function handleInput(e) {
  if (completed) {
    e.target.value = e.target.value.slice(0, currentRenderText.length || activeLesson.text.length);
    return;
  }
  if (!startTime) startTime = Date.now();
  if (e.target.value.length > (currentRenderText.length || activeLesson.text.length)) {
    e.target.value = e.target.value.slice(0, currentRenderText.length || activeLesson.text.length);
  }
  updateTypingFeedback();
}

// ── Completion & Rewards ─────────────────────
function showCompletion(stats) {
  cWpm.textContent = stats.wpm;
  cAcc.textContent = `${stats.acc}%`;
  cTime.textContent = stats.time;

  const store = loadStore();
  const isNewRecord = stats.wpm > (store.bestWpm || 0);

  if (isNewRecord && stats.wpm > 10) {
    completionIcon.textContent = "🏆";
    completionTitle.textContent = "Neuer Rekord!";
    completionSub.textContent = `${stats.wpm} WPM — deine neue Bestleistung.`;
    completionBadge.classList.remove("hidden");
    triggerConfetti();
  } else if (stats.acc >= 95 && stats.wpm > 20) {
    completionIcon.textContent = "🔥";
    completionTitle.textContent = "Stark!";
    completionSub.textContent = `${stats.acc}% Genauigkeit bei ${stats.wpm} WPM.`;
    completionBadge.classList.add("hidden");
  } else {
    completionIcon.textContent = "✅";
    completionTitle.textContent = "Geschafft!";
    completionSub.textContent = "Weiter so. Jede Lektion zählt.";
    completionBadge.classList.add("hidden");
  }

  recordCompletion(stats.wpm, stats.acc);
  updateStreakUI();
  updateBestWpmUI();
  completion.classList.add("show");
}

// ── Confetti 🎉 ─────────────────────────────
function triggerConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  const colors = ["#f59e0b", "#ef4444", "#3b82f6", "#22c55e", "#8b5cf6", "#ec4899"];
  const particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rv: (Math.random() - 0.5) * 8,
      life: 1,
    });
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let alive = false;
    particles.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.rot += p.rv;
      p.life -= 0.006;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (alive && frame < 300) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
  requestAnimationFrame(draw);
}

// ── Navigation ───────────────────────────────
function selectNextLesson() {
  // All legal variants: auto-generate next random lesson
  if (activeMode.id === "legal") {
    const gen = { mix: generateSingleMix, terms: generateSingleTerms, abbrev: generateSingleAbbrevs, definitions: generateSingleDef }[activeVariantId];
    if (gen) {
      const lesson = gen();
      const v = activeMode.variants[activeVariantId];
      v.lessons = [lesson];
      allLessons = [lesson];
      currentLessons = [lesson];
      filteredLessons = [lesson];
      renderLessons();
      selectLesson(lesson);
      return;
    }
  }
  // Learning / Daily: cycle through list
  const idx = currentLessons.findIndex((l) => l.id === activeLesson?.id);
  const next = (idx >= 0 ? idx + 1 : 0) % currentLessons.length;
  selectLesson(currentLessons[next]);
}

function shuffleLessons() {
  // In legal mode: generate fresh random session
  if (activeMode.id === "legal") { selectNextLesson(); return; }
  filteredLessons = shuffleArray(filteredLessons);
  visibleCount = PAGE_SIZE;
  renderLessons();
  if (filteredLessons.length) selectLesson(filteredLessons[0]);
}

// ── Filters ──────────────────────────────────
function buildChapterOptions() {
  const chapters = new Set();
  allLessons.forEach((l) => chapters.add(l.chapter || "Alle"));

  if (chapters.size <= 1) {
    chapterSelect.classList.add("hidden");
    return;
  }
  chapterSelect.classList.remove("hidden");
  chapterSelect.innerHTML = "";
  const allOpt = document.createElement("option");
  allOpt.value = "Alle"; allOpt.textContent = "Alle";
  chapterSelect.appendChild(allOpt);
  Array.from(chapters).filter((c) => c !== "Alle").sort().forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    chapterSelect.appendChild(opt);
  });
}

function applyFilters() {
  const chapter = chapterSelect.value || "Alle";
  const q = lessonSearch.value.trim().toLowerCase();

  filteredLessons = allLessons.filter((l) => {
    const matchCh = chapter === "Alle" || l.chapter === chapter;
    const hay = `${l.title} ${l.description} ${l.term || ""}`.toLowerCase();
    const matchQ = !q || hay.includes(q);
    return matchCh && matchQ;
  });

  if (!filteredLessons.length) {
    lessonList.innerHTML = `<p style="color:var(--muted);font-size:13px;padding:12px">Keine Treffer.</p>`;
    loadMoreBtn.classList.add("hidden");
    return;
  }
  renderLessons();
  selectLesson(filteredLessons[0]);
}

// ── Sidebar toggle ───────────────────────────
function openSidebar() {
  sidebar.classList.remove("closed");
  sidebarOpen = true;
}

function closeSidebar() {
  sidebar.classList.add("closed");
  sidebarOpen = false;
}

// ── Keyboard toggle ──────────────────────────
function toggleKeyboardPanel() {
  keyboardVisible = !keyboardVisible;
  keyboardWrap.classList.toggle("collapsed", !keyboardVisible);
  document.body.classList.toggle("keyboard-open", keyboardVisible);
  $("toggleKeyboard").textContent = keyboardVisible ? "⌨" : "⌨";
}

// ── Utility ──────────────────────────────────
function shuffleArray(list) {
  const c = [...list];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function seededRandom(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed(list, seed) {
  const rand = seededRandom(seed);
  const c = [...list];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function getDateSeed() {
  const n = new Date();
  const key = `${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) { h = (h << 5) - h + key.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function pickRandom(list, count) {
  const picks = [];
  for (let i = 0; i < count; i++) {
    const item = list[Math.floor(Math.random() * list.length)];
    if (item) picks.push(item);
  }
  return picks;
}

function shortenDef(text) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const s = cleaned.split(/[.!?]/)[0].trim();
  if (!s) return cleaned.slice(0, 120);
  return s.length > 140 ? `${s.slice(0, 140).trim()}…` : `${s}.`;
}

// ── CSV Parsing (robust, RFC4180) ───────────
function parseCSV(text, delim = ";") {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i+1] === '"') { field += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === delim && !inQuotes) {
      row.push(field); field = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i+1] === '\n') i++; // handle \r\n
      row.push(field); rows.push(row); row = []; field = '';
    } else {
      field += ch;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function toTermData(rows) {
  return rows.slice(1).map((r) => ({ term: (r[1] || r[0] || "").trim() })).filter((d) => d.term);
}

function toAbbrevData(rows) {
  return rows.slice(1).map((r) => ({ term: (r[0] || "").trim(), abbr: (r[1] || "").trim() })).filter((d) => d.abbr);
}

function toDefData(rows) {
  return rows.slice(1).map((r) => ({ rechtsgebiet: (r[0] || "").trim(), term: (r[1] || "").trim(), definition: (r[2] || "").trim() })).filter((d) => d.term && d.definition);
}

async function loadCSV(path) {
  const resp = await fetch(path);
  if (!resp.ok) throw new Error(`CSV load failed: ${path}`);
  const text = await resp.text();
  return parseCSV(text.replace(/^\uFEFF/, ""), ";");
}

// ── Lesson builders (all auto-generating) ────
function refillPool(key) {
  const dsMap = { terms: "terms", abbrevs: "abbrev", defs: "definitions" };
  if (!datasets[dsMap[key]]) return;
  let data = [...datasets[dsMap[key]]];
  if (key === "defs" && rechtsgebietFilter !== "all") {
    data = data.filter((d) => d.rechtsgebiet === rechtsgebietFilter);
    if (data.length === 0) data = [...datasets[dsMap[key]]]; // fallback
  }
  pools[key] = shuffleArray(data);
}

function generateSingleTerms() {
  counters.terms++;
  if (pools.terms.length < 24) refillPool("terms");
  const chunk = pools.terms.splice(0, 24);
  return {
    id: `terms-${counters.terms}`,
    title: "Begriffe",
    description: `${chunk.length} zufällige juristische Begriffe`,
    text: chunk.map((t) => t.term).join(" "),
  };
}

function generateSingleAbbrevs() {
  counters.abbrevs++;
  if (pools.abbrevs.length < 20) refillPool("abbrevs");
  const chunk = pools.abbrevs.splice(0, 20);
  return {
    id: `abbr-${counters.abbrevs}`,
    title: "Abkürzungen",
    description: `${chunk.length} zufällige Abkürzungen`,
    text: chunk.map((a) => a.abbr).join(" "),
  };
}

function generateSingleDef() {
  counters.defs++;
  if (pools.defs.length < 1) refillPool("defs");
  const d = pools.defs.splice(0, 1)[0];
  return {
    id: `def-${counters.defs}`,
    title: d.term,
    description: d.rechtsgebiet || "Definition tippen",
    term: d.term, definition: d.definition, rechtsgebiet: d.rechtsgebiet, text: d.definition,
  };
}

function generateSingleMix() {
  counters.mix++;
  if (pools.terms.length < 14) refillPool("terms");
  if (pools.abbrevs.length < 8) refillPool("abbrevs");
  if (pools.defs.length < 2) refillPool("defs");
  const t = pools.terms.splice(0, 14).map((x) => x.term);
  const a = pools.abbrevs.splice(0, 8).map((x) => x.abbr);
  const d = pools.defs.splice(0, 2).map((x) => shortenDef(x.definition));
  return {
    id: `mix-${counters.mix}`,
    title: "Examens-Mix",
    description: "Begriffe · Abkürzungen · Definitionen",
    text: shuffleArray([...t, ...a, ...d]).join(" "),
  };
}

function buildTermLessons() { return [generateSingleTerms()]; }
function buildAbbrevLessons() { return [generateSingleAbbrevs()]; }
function buildDefLessons() { return [generateSingleDef()]; }
function buildMixLessons() { return [generateSingleMix()]; }

function buildDailyLessons(terms, abbrevs, defs) {
  const seed = getDateSeed();
  const t = shuffleWithSeed(terms, seed + 11).slice(0, 20).map((x) => x.term);
  const a = shuffleWithSeed(abbrevs, seed + 29).slice(0, 12).map((x) => x.abbr);
  const d = shuffleWithSeed(defs, seed + 47).slice(0, 3).map((x) => shortenDef(x.definition));
  const dateLabel = new Date().toLocaleDateString("de-DE");
  return [{
    id: "daily-1", chapter: "Daily Drill",
    title: `Daily Drill ${dateLabel}`, description: "Tages-Mix für deine Routine",
    text: [...t, ...a, ...d].join(" "),
  }];
}

// ── Data loading ─────────────────────────────
async function loadDatasets() {
  try {
    const [tRows, aRows, dRows] = await Promise.all([
      loadCSV("./alle_begriffe.csv"),
      loadCSV("./jur_abkuerzungen_final.csv"),
      loadCSV("./alle_begriffe_mit_definitionen.csv"),
    ]);

    datasets.terms = toTermData(tRows);
    datasets.abbrev = toAbbrevData(aRows);
    datasets.definitions = toDefData(dRows);

    modes.legal.variants.terms.lessons = buildTermLessons();
    modes.legal.variants.abbrev.lessons = buildAbbrevLessons();
    modes.legal.variants.definitions.lessons = buildDefLessons();
    modes.legal.variants.mix.lessons = buildMixLessons();
    modes.legal.variants.daily.lessons = buildDailyLessons(datasets.terms, datasets.abbrev, datasets.definitions);
  } catch (err) {
    console.error("CSV load error:", err);
  }
}

// ── Init ─────────────────────────────────────
function init() {
  initDarkMode();
  renderKeyboard();
  renderLegend();
  updateStreakUI();
  updateBestWpmUI();

  // Default: show keyboard in learning mode, hide in legal
  // (will toggle per mode later)

  // Events
  typingArea.addEventListener("click", () => typingInput.focus());
  typingInput.addEventListener("input", handleInput);

  // Ensure typing input receives focus when user starts typing (helps if focus is lost, e.g., after theme toggle)
  document.addEventListener('keydown', (e) => {
    try {
      const pwGate = document.getElementById('pwGate');
      if (pwGate && !pwGate.classList.contains('hidden')) return; // gate visible
      if (!typingInput) return;
      const active = document.activeElement;
      if (active === typingInput) return;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
      // Ignore modifier-only keys
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      typingInput.focus();
    } catch (err) { /* ignore */ }
  });

  $("restart").addEventListener("click", () => { resetSession(); typingInput.focus(); });
  $("skipLesson").addEventListener("click", () => { selectNextLesson(); typingInput.focus(); });
  $("shuffle").addEventListener("click", shuffleLessons);

  $("openSidebar").addEventListener("click", openSidebar);
  $("closeSidebar").addEventListener("click", closeSidebar);

  $("toggleDark").addEventListener("click", toggleDarkMode);
  $("toggleKeyboard").addEventListener("click", toggleKeyboardPanel);

  $("changeMode").addEventListener("click", () => {
    app.classList.add("hidden");
    modeScreen.classList.remove("hidden");
  });

  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.mode);
      modeScreen.classList.add("hidden");
      app.classList.remove("hidden");
      // Hide keyboard by default in legal mode
      if (btn.dataset.mode === "legal") {
        keyboardVisible = false;
        keyboardWrap.classList.add("collapsed");
        document.body.classList.remove("keyboard-open");
      } else {
        keyboardVisible = true;
        keyboardWrap.classList.remove("collapsed");
        document.body.classList.add("keyboard-open");
      }
      typingInput.focus();
    });
  });

  document.querySelectorAll("[data-variant]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setVariant(btn.dataset.variant);
      typingInput.focus();
    });
  });

  document.querySelectorAll("[data-rg]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setRechtsgebiet(btn.dataset.rg);
      typingInput.focus();
    });
  });

  $("nextLesson").addEventListener("click", selectNextLesson);
  $("repeatLesson").addEventListener("click", () => { resetSession(); typingInput.focus(); });

  $("toggleDefinition").addEventListener("click", () => {
    if (activeVariantId !== "definitions") return;
    defVisible = !defVisible;
    defText.classList.toggle("hidden", !defVisible);
    $("toggleDefinition").textContent = defVisible ? "Verbergen" : "Anzeigen";
  });

  lessonSearch.addEventListener("input", () => { visibleCount = PAGE_SIZE; applyFilters(); });
  chapterSelect.addEventListener("change", () => { visibleCount = PAGE_SIZE; applyFilters(); });
  loadMoreBtn.addEventListener("click", () => { visibleCount += PAGE_SIZE; renderLessons(); });

  // Stats timer
  setInterval(() => { if (startTime && !completed) updateStats(); }, 1000);

  // Load data and start
  loadDatasets().then(() => setMode("learning"));
}

init();
