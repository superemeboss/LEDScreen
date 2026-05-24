const BASE_COLS = 21;
const BASE_ROWS = 13;
const MAX_UNDO = 30;
const AUTO_OFF_STANDARD = 180000;
const AUTO_OFF_FREE = 300000;
const MIN_GRID = 3;
const MAX_GRID = 40;

const grid = document.querySelector("#ledGrid");
const easel = document.querySelector(".easel");
const menuBtn = document.querySelector("#menuBtn");
const menuScrim = document.querySelector("#menuScrim");
const statusText = document.querySelector("#statusText");
const modeLabel = document.querySelector("#modeLabel");
const selectionLabel = document.querySelector("#selectionLabel");
const volumeMeter = document.querySelector("#volumeMeter");
const brightnessMeter = document.querySelector("#brightnessMeter");
const colsInput = document.querySelector("#colsInput");
const rowsInput = document.querySelector("#rowsInput");
const letterBank = document.querySelector(".letter-bank");
const activityButtons = [...document.querySelectorAll("[data-mode]")];

const patterns = {
  letters: {
    A: [[10,1],[7,2],[13,2],[6,3],[14,3],[5,4],[15,4],[5,5],[15,5],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[15,6],[5,7],[15,7],[5,8],[15,8],[5,9],[15,9],[5,10],[15,10],[5,11],[15,11]],
    B: [[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,2],[13,3],[13,4],[12,5],[11,6],[12,7],[13,8],[13,9],[12,10],[11,11],[6,11],[7,11],[8,11],[9,11],[10,11],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[7,6],[8,6],[9,6],[10,6]],
    C: [[14,2],[13,1],[12,1],[11,1],[10,1],[9,1],[8,2],[7,3],[6,4],[6,5],[6,6],[6,7],[6,8],[7,9],[8,10],[9,11],[10,11],[11,11],[12,11],[13,11],[14,10]],
    D: [[6,1],[7,1],[8,1],[9,1],[10,1],[11,2],[12,3],[13,4],[13,5],[13,6],[13,7],[13,8],[12,9],[11,10],[10,11],[9,11],[8,11],[7,11],[6,11],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10]],
    E: [[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[6,2],[6,3],[6,4],[6,5],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[6,7],[6,8],[6,9],[6,10],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11]],
    F: [[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[6,2],[6,3],[6,4],[6,5],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[6,7],[6,8],[6,9],[6,10],[6,11]],
    G: [[14,2],[13,1],[12,1],[11,1],[10,1],[9,1],[8,2],[7,3],[6,4],[6,5],[6,6],[6,7],[6,8],[7,9],[8,10],[9,11],[10,11],[11,11],[12,11],[13,10],[14,9],[14,8],[14,7],[13,7],[12,7],[11,7]],
    H: [[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[15,1],[15,2],[15,3],[15,4],[15,5],[15,6],[15,7],[15,8],[15,9],[15,10],[15,11],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6]],
    I: [[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[10,2],[10,3],[10,4],[10,5],[10,6],[10,7],[10,8],[10,9],[10,10],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11]],
    J: [[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[11,2],[11,3],[11,4],[11,5],[11,6],[11,7],[11,8],[10,9],[9,10],[8,11],[7,11],[6,10],[6,9]],
    K: [[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,11],[14,1],[13,2],[12,3],[11,4],[10,5],[9,6],[10,7],[11,8],[12,9],[13,10],[14,11]],
    L: [[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11]],
    M: [[4,11],[4,10],[4,9],[4,8],[4,7],[4,6],[4,5],[4,4],[4,3],[4,2],[4,1],[5,2],[6,3],[7,4],[8,5],[9,6],[10,5],[11,4],[12,3],[13,2],[14,1],[14,2],[14,3],[14,4],[14,5],[14,6],[14,7],[14,8],[14,9],[14,10],[14,11]],
    N: [[5,11],[5,10],[5,9],[5,8],[5,7],[5,6],[5,5],[5,4],[5,3],[5,2],[5,1],[6,2],[7,3],[8,4],[9,5],[10,6],[11,7],[12,8],[13,9],[14,10],[15,11],[15,10],[15,9],[15,8],[15,7],[15,6],[15,5],[15,4],[15,3],[15,2],[15,1]],
    O: [[10,1],[9,1],[8,2],[7,3],[6,4],[6,5],[6,6],[6,7],[6,8],[7,9],[8,10],[9,11],[10,11],[11,11],[12,10],[13,9],[14,8],[14,7],[14,6],[14,5],[14,4],[13,3],[12,2],[11,1]],
    P: [[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,2],[13,3],[13,4],[12,5],[11,6],[10,6],[9,6],[8,6],[7,6],[6,6],[6,2],[6,3],[6,4],[6,5],[6,7],[6,8],[6,9],[6,10],[6,11]],
    Q: [[10,1],[9,1],[8,2],[7,3],[6,4],[6,5],[6,6],[6,7],[6,8],[7,9],[8,10],[9,11],[10,11],[11,11],[12,10],[13,9],[14,8],[14,7],[14,6],[14,5],[14,4],[13,3],[12,2],[11,1],[12,9],[13,10],[14,11]],
    R: [[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,2],[13,3],[13,4],[12,5],[11,6],[10,6],[9,6],[8,6],[7,6],[6,6],[6,2],[6,3],[6,4],[6,5],[6,7],[6,8],[6,9],[6,10],[6,11],[10,7],[11,8],[12,9],[13,10],[14,11]],
    S: [[14,2],[13,1],[12,1],[11,1],[10,1],[9,1],[8,2],[7,3],[7,4],[8,5],[9,6],[10,6],[11,6],[12,7],[13,8],[14,9],[13,10],[12,11],[11,11],[10,11],[9,11],[8,10],[7,9]],
    T: [[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],[9,10],[9,11]],
    U: [[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[6,9],[7,10],[8,11],[9,11],[10,11],[11,10],[12,9],[13,8],[13,7],[13,6],[13,5],[13,4],[13,3],[13,2],[13,1]],
    V: [[4,1],[5,2],[5,3],[6,4],[6,5],[7,6],[7,7],[8,8],[8,9],[9,10],[10,11],[11,10],[12,9],[12,8],[13,7],[13,6],[14,5],[14,4],[15,3],[15,2],[16,1]],
    W: [[3,1],[4,2],[4,3],[5,4],[5,5],[6,6],[6,7],[7,8],[7,9],[8,10],[9,11],[10,10],[11,9],[12,10],[13,11],[14,10],[14,9],[15,8],[15,7],[16,6],[16,5],[17,4],[17,3],[18,2],[18,1]],
    X: [[5,1],[6,2],[7,3],[8,4],[9,5],[10,6],[11,7],[12,8],[13,9],[14,10],[15,11],[15,1],[14,2],[13,3],[12,4],[11,5],[9,7],[8,8],[7,9],[6,10],[5,11]],
    Y: [[5,1],[6,2],[7,3],[8,4],[9,5],[10,6],[11,5],[12,4],[13,3],[14,2],[15,1],[10,7],[10,8],[10,9],[10,10],[10,11]],
    Z: [[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[13,2],[12,3],[11,4],[10,5],[9,6],[8,7],[7,8],[6,9],[5,10],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11],[14,11]]
  },
  numbers: {
    "0": [[10,1],[9,1],[8,2],[7,3],[6,4],[6,5],[6,6],[6,7],[6,8],[7,9],[8,10],[9,11],[10,11],[11,11],[12,10],[13,9],[14,8],[14,7],[14,6],[14,5],[14,4],[13,3],[12,2],[11,1]],
    "1": [[9,3],[10,2],[11,1],[11,2],[11,3],[11,4],[11,5],[11,6],[11,7],[11,8],[11,9],[11,10],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11]],
    "2": [[7,3],[8,2],[9,1],[10,1],[11,1],[12,2],[13,3],[13,4],[12,5],[11,6],[10,7],[9,8],[8,9],[7,10],[7,11],[8,11],[9,11],[10,11],[11,11],[12,11],[13,11]],
    "3": [[7,2],[8,1],[9,1],[10,1],[11,1],[12,2],[13,3],[12,4],[11,5],[10,6],[11,6],[12,7],[13,8],[13,9],[12,10],[11,11],[10,11],[9,11],[8,10],[7,9]],
    "4": [[13,11],[13,10],[13,9],[13,8],[13,7],[13,6],[13,5],[13,4],[13,3],[13,2],[13,1],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[6,5],[7,4],[8,3],[9,2],[10,1]],
    "5": [[13,1],[12,1],[11,1],[10,1],[9,1],[8,1],[7,1],[7,2],[7,3],[7,4],[7,5],[8,5],[9,5],[10,5],[11,5],[12,6],[13,7],[13,8],[13,9],[12,10],[11,11],[10,11],[9,11],[8,10],[7,9]],
    "6": [[13,2],[12,1],[11,1],[10,1],[9,2],[8,3],[7,4],[7,5],[7,6],[7,7],[7,8],[8,9],[9,10],[10,11],[11,11],[12,10],[13,9],[13,8],[12,7],[11,6],[10,6],[9,6],[8,7]],
    "7": [[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[13,2],[12,3],[11,4],[10,5],[9,6],[9,7],[8,8],[8,9],[7,10],[7,11]],
    "8": [[10,1],[9,1],[8,2],[7,3],[7,4],[8,5],[9,6],[10,6],[11,6],[12,5],[13,4],[13,3],[12,2],[11,1],[8,7],[7,8],[7,9],[8,10],[9,11],[10,11],[11,11],[12,10],[13,9],[13,8],[12,7]],
    "9": [[13,6],[12,7],[11,7],[10,7],[9,7],[8,6],[7,5],[7,4],[8,3],[9,2],[10,1],[11,1],[12,2],[13,3],[13,4],[13,5],[13,8],[12,9],[11,10],[10,11],[9,11],[8,10]]
  },
  shapes: {
    Circle: [[10,1],[9,1],[8,2],[7,3],[6,4],[6,5],[6,6],[6,7],[6,8],[7,9],[8,10],[9,11],[10,11],[11,11],[12,10],[13,9],[14,8],[14,7],[14,6],[14,5],[14,4],[13,3],[12,2],[11,1]],
    Square: [[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],[12,2],[13,2],[14,2],[14,3],[14,4],[14,5],[14,6],[14,7],[14,8],[14,9],[14,10],[13,10],[12,10],[11,10],[10,10],[9,10],[8,10],[7,10],[6,10],[6,9],[6,8],[6,7],[6,6],[6,5],[6,4],[6,3]],
    Triangle: [[10,1],[9,2],[11,2],[8,3],[12,3],[7,4],[13,4],[6,5],[14,5],[5,6],[15,6],[4,7],[16,7],[3,8],[17,8],[2,9],[18,9],[1,10],[2,10],[3,10],[4,10],[5,10],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[15,10],[16,10],[17,10],[18,10],[19,10]],
    Star: [[10,1],[11,4],[15,4],[12,6],[14,10],[10,7],[6,10],[8,6],[5,4],[9,4],[10,1],[9,4],[5,4],[8,6],[6,10],[10,7],[14,10],[12,6],[15,4],[11,4]],
    Heart: [[10,11],[8,9],[6,7],[5,5],[5,3],[6,2],[7,2],[8,3],[9,4],[10,5],[11,4],[12,3],[13,2],[14,2],[15,3],[15,5],[14,7],[12,9]]
  },
  objects: {
    House: [[5,6],[6,5],[7,4],[8,3],[9,2],[10,1],[11,2],[12,3],[13,4],[14,5],[15,6],[6,6],[6,7],[6,8],[6,9],[6,10],[7,10],[8,10],[9,10],[10,10],[11,10],[12,10],[13,10],[14,10],[14,9],[14,8],[14,7],[14,6],[9,10],[9,9],[9,8],[10,8],[11,8],[11,9],[11,10]],
    Tree: [[10,1],[8,2],[9,2],[10,2],[11,2],[12,2],[7,4],[8,4],[9,4],[10,4],[11,4],[12,4],[13,4],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[12,6],[13,6],[14,6],[10,7],[10,8],[10,9],[10,10],[9,10],[11,10],[8,11],[9,11],[10,11],[11,11],[12,11]],
    Fish: [[5,6],[6,5],[7,4],[8,3],[10,3],[12,4],[14,5],[15,6],[14,7],[12,8],[10,9],[8,9],[7,8],[6,7],[5,6],[16,5],[18,4],[18,8],[16,7],[13,5],[13,6],[13,7],[9,5]],
    Rocket: [[10,1],[9,2],[11,2],[8,3],[12,3],[8,4],[12,4],[8,5],[12,5],[8,6],[12,6],[8,7],[12,7],[7,8],[13,8],[6,9],[8,9],[12,9],[14,9],[9,10],[10,10],[11,10],[8,11],[10,11],[12,11],[10,6]],
    Umbrella: [[3,6],[4,5],[5,4],[6,3],[7,2],[8,2],[9,1],[10,1],[11,1],[12,2],[13,2],[14,3],[15,4],[16,5],[17,6],[3,6],[5,6],[7,6],[9,6],[11,6],[13,6],[15,6],[17,6],[10,7],[10,8],[10,9],[10,10],[11,11],[12,11],[13,10]]
  }
};

const songs = ["March", "Bounce", "Twinkle", "Steps", "Sparkle", "Drift", "Hop", "Glow", "Loop", "Finale"];
const state = {
  powered: true,
  mode: "free",
  cols: BASE_COLS,
  rows: BASE_ROWS,
  selectionIndex: 0,
  activeCategory: "objects",
  lit: new Set(),
  guide: [],
  guideIndex: 0,
  history: [],
  brightness: 3,
  volume: 3,
  music: true,
  songIndex: 0,
  holdTimer: null,
  autoOffTimer: null,
  audio: null,
  drawing: false,
  lastDragKey: null,
  lightBackground: false
};

function key(x, y) {
  return `${x},${y}`;
}

function templateEntries(category) {
  return Object.entries(patterns[category]);
}

function currentTemplate() {
  if (state.mode === "letters") return templateWithScaledPoints(state.activeCategory, patterns.letters[state.activeCategory]);
  if (state.mode === "numbers") return entryAsTemplate(templateEntries("numbers")[state.selectionIndex]);
  if (state.mode === "shapes") return entryAsTemplate(templateEntries("shapes")[state.selectionIndex]);
  if (state.mode === "objects" || state.mode === "guess") return entryAsTemplate(templateEntries("objects")[state.selectionIndex]);
  return null;
}

function entryAsTemplate(entry) {
  return templateWithScaledPoints(entry[0], entry[1]);
}

function templateWithScaledPoints(name, points) {
  return { name, points: scalePoints(points) };
}

function scalePoints(points) {
  const seen = new Set();
  const scaled = [];
  points.forEach(([x, y]) => {
    const scaledX = Math.max(0, Math.min(state.cols - 1, Math.round((x / (BASE_COLS - 1)) * (state.cols - 1))));
    const scaledY = Math.max(0, Math.min(state.rows - 1, Math.round((y / (BASE_ROWS - 1)) * (state.rows - 1))));
    const dotKey = key(scaledX, scaledY);
    if (!seen.has(dotKey)) {
      seen.add(dotKey);
      scaled.push([scaledX, scaledY]);
    }
  });
  return scaled;
}

function makeDots() {
  grid.replaceChildren();
  grid.style.setProperty("--cols", state.cols);
  grid.style.setProperty("--rows", state.rows);
  for (let y = 0; y < state.rows; y += 1) {
    for (let x = 0; x < state.cols; x += 1) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.dataset.x = x;
      dot.dataset.y = y;
      dot.setAttribute("aria-label", `LED ${x + 1}, ${y + 1}`);
      dot.addEventListener("pointerdown", handleDotDown);
      dot.addEventListener("mousedown", handleMouseDotDown);
      dot.addEventListener("contextmenu", (event) => event.preventDefault());
      grid.appendChild(dot);
    }
  }
}

function makeLetters() {
  Object.keys(patterns.letters).forEach((letter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = letter;
    button.dataset.letter = letter;
    button.addEventListener("click", () => selectLetter(letter));
    letterBank.appendChild(button);
  });
}

function handleDotDown(event) {
  if (!state.powered) return;
  if (state.drawing) return;
  event.preventDefault();
  state.drawing = true;
  state.lastDragKey = null;
  resetAutoOff();
  paintDot(event.currentTarget, true);
}

function handleMouseDotDown(event) {
  if (event.button !== 0) return;
  handleDotDown(event);
}

function handleGridDrag(event) {
  if (!state.powered || !state.drawing) return;
  event.preventDefault();
  const target = document.elementFromPoint(event.clientX, event.clientY);
  const dot = target?.closest?.(".dot");
  if (!dot || !grid.contains(dot)) return;
  paintDot(dot, false);
}

function handleMouseGridDrag(event) {
  if (event.buttons !== 1) return;
  handleGridDrag(event);
}

function stopDrawing() {
  state.drawing = false;
  state.lastDragKey = null;
  stopHold();
}

function paintDot(dot, allowHoldClear) {
  const x = Number(dot.dataset.x);
  const y = Number(dot.dataset.y);
  const dotKey = key(x, y);
  if (dotKey === state.lastDragKey) return;
  state.lastDragKey = dotKey;

  if (state.mode === "free") {
    if (state.drawing && !allowHoldClear) stopHold();
    if (!state.lit.has(dotKey) || !allowHoldClear) {
      setDot(dotKey, true, true);
      if (allowHoldClear) chirp(340);
      return;
    }
    state.holdTimer = window.setTimeout(() => {
      setDot(dotKey, false, true);
      chirp(160);
      state.holdTimer = null;
    }, 650);
    return;
  }

  const expected = state.guide[state.guideIndex];
  if (expected && key(expected[0], expected[1]) === dotKey) {
    if (!state.lit.has(dotKey)) vibrateLed();
    state.lit.add(dotKey);
    state.guideIndex += 1;
    chirp(520);
    if (state.guideIndex >= state.guide.length) completeGuide();
    update();
  } else {
    chirp(120);
    statusText.textContent = "Try the blinking light.";
  }
}

function stopHold() {
  if (state.holdTimer) {
    clearTimeout(state.holdTimer);
    state.holdTimer = null;
  }
}

function setDot(dotKey, on, track) {
  const had = state.lit.has(dotKey);
  if (on) state.lit.add(dotKey);
  else state.lit.delete(dotKey);
  if (on && !had) vibrateLed();
  if (track && had !== on) {
    state.history.push({ dotKey, wasOn: had });
    state.history = state.history.slice(-MAX_UNDO);
  }
  update();
}

function vibrateLed() {
  if (!state.powered || !navigator.vibrate) return;
  navigator.vibrate(12);
}

function clampGridSize(value, fallback) {
  const number = Number.parseInt(value, 10);
  if (Number.isNaN(number)) return fallback;
  return Math.max(MIN_GRID, Math.min(MAX_GRID, number));
}

function applyGridSize() {
  state.cols = clampGridSize(colsInput.value, BASE_COLS);
  state.rows = clampGridSize(rowsInput.value, BASE_ROWS);
  colsInput.value = state.cols;
  rowsInput.value = state.rows;
  state.lit.clear();
  state.history = [];
  state.guideIndex = 0;
  makeDots();
  if (state.mode !== "free") beginGuide();
  else update();
}

function toggleMenu(forceOpen) {
  const open = typeof forceOpen === "boolean" ? forceOpen : !document.body.classList.contains("menu-open");
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
}

function fitLedDots() {
  const rect = grid.getBoundingClientRect();
  const style = window.getComputedStyle(grid);
  const columnGap = Number.parseFloat(style.columnGap) || 0;
  const rowGap = Number.parseFloat(style.rowGap) || 0;
  const dotWidth = (rect.width - columnGap * (state.cols - 1)) / state.cols;
  const dotHeight = (rect.height - rowGap * (state.rows - 1)) / state.rows;
  const dotSize = Math.max(3, Math.floor(Math.min(dotWidth, dotHeight)));
  grid.style.setProperty("--dot-size", `${dotSize}px`);
}

function selectLetter(letter) {
  state.mode = "letters";
  state.activeCategory = letter;
  beginGuide();
}

function setMode(mode) {
  state.mode = mode;
  if (mode === "free") {
    state.guide = [];
    state.guideIndex = 0;
    statusText.textContent = "Free Draw is ready.";
    maybePlaySong(true);
  } else {
    state.selectionIndex = 0;
    beginGuide();
  }
  resetAutoOff();
  update();
}

function beginGuide() {
  const template = currentTemplate();
  if (!template) return;
  state.lit.clear();
  state.guide = [...template.points];
  state.guideIndex = 0;
  state.history = [];
  const article = /^[AEIOU8]/.test(template.name) ? "an" : "a";
  statusText.textContent = state.mode === "guess" ? "Trace the lights and guess the picture." : `Trace ${article} ${template.name}.`;
  speak(statusText.textContent);
  update();
}

function completeGuide() {
  const template = currentTemplate();
  statusText.textContent = state.mode === "guess" ? `It was ${template.name}!` : `${template.name} complete.`;
  speak(statusText.textContent);
  sparkle();
}

function sparkle() {
  const saved = new Set(state.lit);
  let flashes = 0;
  const interval = window.setInterval(() => {
    state.lit = flashes % 2 ? new Set(saved) : new Set(currentTemplate()?.points.map(([x, y]) => key(x, y)) || saved);
    update();
    flashes += 1;
    if (flashes > 5) {
      window.clearInterval(interval);
      state.lit = saved;
      update();
    }
  }, 160);
}

function navigateSelection(direction) {
  if (state.mode === "free") {
    state.songIndex = (state.songIndex + direction + songs.length) % songs.length;
    maybePlaySong(true);
    update();
    return;
  }
  const category = state.mode === "numbers" ? "numbers" : state.mode === "shapes" ? "shapes" : "objects";
  const count = templateEntries(category).length;
  state.selectionIndex = (state.selectionIndex + direction + count) % count;
  beginGuide();
}

function undo() {
  if (state.mode !== "free") return;
  const last = state.history.pop();
  if (!last) return;
  if (last.wasOn) state.lit.add(last.dotKey);
  else state.lit.delete(last.dotKey);
  chirp(260);
  update();
}

function clearScreen() {
  state.lit.clear();
  state.history = [];
  if (state.mode !== "free") state.guideIndex = 0;
  statusText.textContent = state.mode === "free" ? "Screen cleared." : "Start again at the blinking light.";
  chirp(220);
  update();
}

function togglePower() {
  state.powered = !state.powered;
  if (state.powered) {
    easel.classList.remove("powered-off");
    statusText.textContent = "Choose an activity.";
    resetAutoOff();
  } else {
    easel.classList.add("powered-off");
    statusText.textContent = "Powered off.";
    clearTimeout(state.autoOffTimer);
    stopMusic();
  }
  document.querySelector("#powerBtn").setAttribute("aria-pressed", String(state.powered));
  update();
}

function adjustVolume(amount) {
  state.volume = Math.max(0, Math.min(5, state.volume + amount));
  if (state.volume === 0) stopMusic();
  else maybePlaySong(false);
  update();
}

function adjustBrightness() {
  state.brightness = state.brightness >= 5 ? 1 : state.brightness + 1;
  update();
}

function toggleBackground() {
  state.lightBackground = !state.lightBackground;
  document.body.classList.toggle("white-bg", state.lightBackground);
  document.querySelector("#bgBtn").setAttribute("aria-pressed", String(state.lightBackground));
}

function maybePlaySong(force) {
  if (!state.music || !state.powered || state.volume === 0) return;
  if (!force && state.audio) return;
  stopMusic();
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const audio = new AudioContext();
  const gain = audio.createGain();
  gain.gain.value = 0.02 * state.volume;
  gain.connect(audio.destination);
  const notes = [262, 330, 392, 523, 392, 330, 294, 349, 440, 392];
  notes.forEach((note, index) => {
    const osc = audio.createOscillator();
    osc.type = index % 2 ? "triangle" : "sine";
    osc.frequency.value = note + state.songIndex * 9;
    osc.connect(gain);
    osc.start(audio.currentTime + index * 0.18);
    osc.stop(audio.currentTime + index * 0.18 + 0.13);
  });
  state.audio = audio;
  window.setTimeout(stopMusic, notes.length * 180 + 260);
}

function stopMusic() {
  if (state.audio) {
    state.audio.close();
    state.audio = null;
  }
}

function chirp(frequency) {
  if (!state.powered || state.volume === 0) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const audio = new AudioContext();
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.frequency.value = frequency;
  osc.type = "square";
  gain.gain.value = 0.015 * state.volume;
  osc.connect(gain);
  gain.connect(audio.destination);
  osc.start();
  osc.stop(audio.currentTime + 0.07);
  window.setTimeout(() => audio.close(), 100);
}

function speak(text) {
  if (!("speechSynthesis" in window) || state.volume === 0 || !state.powered) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.15;
  utterance.volume = Math.min(1, state.volume / 5);
  window.speechSynthesis.speak(utterance);
}

function resetAutoOff() {
  clearTimeout(state.autoOffTimer);
  state.autoOffTimer = window.setTimeout(() => {
    if (state.powered) togglePower();
  }, state.mode === "free" ? AUTO_OFF_FREE : AUTO_OFF_STANDARD);
}

function update() {
  grid.style.setProperty("--cols", state.cols);
  grid.style.setProperty("--rows", state.rows);
  grid.style.setProperty("--brightness", String(0.45 + state.brightness * 0.22));
  fitLedDots();
  brightnessMeter.textContent = `Bright ${state.brightness}`;
  volumeMeter.textContent = `Vol ${state.volume}`;
  colsInput.value = state.cols;
  rowsInput.value = state.rows;

  const guideKey = state.guide[state.guideIndex] ? key(state.guide[state.guideIndex][0], state.guide[state.guideIndex][1]) : null;
  const preview = new Set();
  if (state.mode === "guess") {
    state.guide.slice(0, state.guideIndex).forEach(([x, y]) => preview.add(key(x, y)));
  }

  [...grid.children].forEach((dot) => {
    const dotKey = key(Number(dot.dataset.x), Number(dot.dataset.y));
    dot.classList.toggle("on", state.powered && state.lit.has(dotKey));
    dot.classList.toggle("guide", state.powered && dotKey === guideKey);
    dot.classList.toggle("preview", state.powered && preview.has(dotKey) && !state.lit.has(dotKey));
  });

  activityButtons.forEach((button) => button.classList.toggle("active", button.dataset.mode === state.mode));
  [...letterBank.children].forEach((button) => button.classList.toggle("active", state.mode === "letters" && button.dataset.letter === state.activeCategory));

  const template = currentTemplate();
  const modeNames = { letters: "Write Letters", numbers: "Write Numbers", objects: "Draw Objects", shapes: "Draw Shapes", guess: "Guess the Picture", free: "Free Draw" };
  modeLabel.textContent = modeNames[state.mode];
  selectionLabel.textContent = state.mode === "free" ? `${songs[state.songIndex]} song` : template?.name || "";
}

document.querySelector("#powerBtn").addEventListener("click", togglePower);
document.querySelector("#leftBtn").addEventListener("click", () => navigateSelection(-1));
document.querySelector("#rightBtn").addEventListener("click", () => navigateSelection(1));
document.querySelector("#okBtn").addEventListener("click", () => (state.mode === "free" ? clearScreen() : beginGuide()));
document.querySelector("#undoBtn").addEventListener("click", undo);
document.querySelector("#clearBtn").addEventListener("click", clearScreen);
document.querySelector("#volDownBtn").addEventListener("click", () => adjustVolume(-1));
document.querySelector("#volUpBtn").addEventListener("click", () => adjustVolume(1));
document.querySelector("#brightBtn").addEventListener("click", adjustBrightness);
document.querySelector("#bgBtn").addEventListener("click", toggleBackground);
document.querySelector("#applyGridBtn").addEventListener("click", applyGridSize);
document.querySelector("#musicBtn").addEventListener("click", (event) => {
  state.music = !state.music;
  event.currentTarget.setAttribute("aria-pressed", String(state.music));
  if (state.music) maybePlaySong(true);
  else stopMusic();
});
menuBtn.addEventListener("click", () => toggleMenu());
menuScrim.addEventListener("click", () => toggleMenu(false));
activityButtons.forEach((button) => button.addEventListener("click", () => setMode(button.dataset.mode)));
grid.addEventListener("pointermove", handleGridDrag);
grid.addEventListener("mousemove", handleMouseGridDrag);
window.addEventListener("pointerup", stopDrawing);
window.addEventListener("pointercancel", stopDrawing);
window.addEventListener("mouseup", stopDrawing);
window.addEventListener("pointerdown", resetAutoOff);
window.addEventListener("mousedown", resetAutoOff);
window.addEventListener("keydown", resetAutoOff);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") toggleMenu(false);
});
window.addEventListener("resize", fitLedDots);

makeDots();
makeLetters();
resetAutoOff();
update();
