# Cat Counter 🐱

> You guys know this huge problem that people face daily but no one takes the time to address it.
> About how to keep track of how many kitties you saw on ur way home or on ur way to anywhere.
> Like u tell ur friends... yeah dude I totally meowed to like 28 cats...
> AND YOUR FRIENDS NEVER BELIEVE YOU???
> Well worry no more.. cuz i made a Cat Counter website for your everyday cat counting needs ;)

A tiny Chrome extension: click a button every time you spot a cat, save your tally, and it keeps
a running history + total across browser sessions.

## Project structure

```
Cat_Counter/
├── manifest.json      # Chrome extension manifest (v3)
├── assets/
│   ├── cat.jpg         # popup background
│   └── caticon.png     # toolbar / extension icon
└── src/
    ├── popup.html      # the popup UI
    ├── popup.js        # counter logic + persistence
    └── styles.css
```

## Install (load unpacked)

1. Go to `chrome://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
4. Click the Cat Counter icon in your toolbar to open the popup.

## How it works

- **INCREMENT** — add one to the current tally.
- **SAVE** — file the current tally away as an entry, add it to your total, and reset the tally to 0.
- **CLEAR HISTORY** — wipe all saved entries and the total.

Your tally, history, and total are saved via `chrome.storage.local`, so closing the popup (or
Chrome) doesn't lose your count.

## What was fixed from the original version

- The old version reset the count to 0 every time the popup closed — there was no persistence.
  Now everything is saved via `chrome.storage.local`.
- "Total cats" used to count every increment click (including cats never saved), so it drifted
  from the actual saved total. It now only sums saved entries.
- Buttons used inline `onclick="..."` attributes, which Manifest V3's default content security
  policy blocks on extension pages — swapped for `addEventListener`.
- History used to be one endlessly-appended string; it's now a proper list.
- Files were flattened at the repo root; split into `assets/` (images) and `src/` (code) with
  `manifest.json` at the root, which is the conventional layout for a small extension.
