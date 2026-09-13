// Cat Counter popup logic
// Fixes vs the old script.js:
//   1. Counts and history now persist across popup open/close (chrome.storage.local),
//      instead of resetting every time the popup closes.
//   2. "Total cats" now actually sums saved entries, instead of counting every
//      increment click (which double-counted cats you hadn't saved yet).
//   3. Previous entries render as a real list instead of one endlessly growing
//      string of numbers.
//   4. Falls back to localStorage automatically if opened as a plain webpage
//      (e.g. double-clicking popup.html) rather than as an installed extension.

const countEl = document.getElementById("count-el");
const totalEl = document.getElementById("total");
const historyEl = document.getElementById("history-el");
const incrementBtn = document.getElementById("increment-btn");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");

const STORAGE_KEY = "catCounterState";
const hasChromeStorage = typeof chrome !== "undefined" && chrome.storage && chrome.storage.local;

let state = {
    count: 0,      // cats counted since the last save
    total: 0,      // sum of all saved entries
    entries: []    // history of saved entries, e.g. [4, 12, 3]
};

function loadState(callback) {
    if (hasChromeStorage) {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
            if (result[STORAGE_KEY]) state = result[STORAGE_KEY];
            callback();
        });
    } else {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) state = JSON.parse(raw);
        callback();
    }
}

function saveState() {
    if (hasChromeStorage) {
        chrome.storage.local.set({ [STORAGE_KEY]: state });
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
}

function render() {
    countEl.textContent = state.count;
    totalEl.textContent = `Total cats: ${state.total}`;
    historyEl.innerHTML = state.entries
        .map((entry, i) => `<li>Entry ${i + 1}: ${entry} cats</li>`)
        .join("");
}

function increment() {
    state.count++;
    render();
    saveState();
}

function save() {
    if (state.count === 0) return; // nothing to save
    state.entries.push(state.count);
    state.total += state.count;
    state.count = 0;
    render();
    saveState();
}

function clearHistory() {
    state = { count: 0, total: 0, entries: [] };
    render();
    saveState();
}

incrementBtn.addEventListener("click", increment);
saveBtn.addEventListener("click", save);
clearBtn.addEventListener("click", clearHistory);

loadState(render);
