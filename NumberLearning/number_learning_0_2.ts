// number_learning_0_2.ts
// Version: 0.2 — Use number_sounds_0_2.json and pointer events; numbers 1..20
// 2025-11-05

interface NumberSounds {
  [key: string]: string;
}

/**
 * Loads number sound data from JSON file (the 0_2 variant)
 */
async function loadSounds(): Promise<NumberSounds> {
  const res = await fetch('number_sounds_0_2.json');
  return await res.json();
}

/**
 * Speak text using Web Speech API (Korean). Cancels any previous speech.
 */
function speak(text: string) {
  try {
    window.speechSynthesis.cancel();
  }
  catch (e) {
    // ignore
  }
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.rate = 0.7;
  window.speechSynthesis.speak(utter);
}

/**
 * Create grid 1..20 and attach unified pointer event to avoid double play
 */
function createGrid(sounds: NumberSounds) {
  const grid = document.getElementById('grid');
  if (!grid) return;
  const gridEl = grid as HTMLElement;
  grid.innerHTML = '';

  for (let i = 1; i <= 20; i++) {
    const cell = document.createElement('div');
    cell.className = 'number-cell';
    cell.textContent = i.toString();

    // pointerdown handles touch and mouse without duplicate events.
    cell.addEventListener('pointerdown', (ev: PointerEvent) => {
      // prevent the later click event on some platforms
      if (ev && ev.preventDefault) ev.preventDefault();
      const key = i.toString();
      const text = sounds[key] ?? key; // fallback to the number itself
      speak(text);
    }, { passive: false });

    grid.appendChild(cell);
  }
  // After grid is populated, compute cell size so all rows fit the viewport
  function toPx(val: string, relativeToWidth = true) {
  if (!val) return 0;
    val = val.trim();
    if (val.endsWith('px')) return parseFloat(val);
    if (val.endsWith('vw')) return parseFloat(val) * window.innerWidth / 100;
    if (val.endsWith('vh')) return parseFloat(val) * window.innerHeight / 100;
    if (val.endsWith('rem')) return parseFloat(val) * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
    if (val.endsWith('%')) {
      // percentage relative to grid width if requested
      const pct = parseFloat(val) / 100;
  return pct * (relativeToWidth ? gridEl.clientWidth : window.innerHeight);
    }
    return parseFloat(val) || 0;
  }

  function adjustCellSize() {
  const items = gridEl.children.length;
    const columns = 5;
    const rows = Math.max(1, Math.ceil(items / columns));

  const style = getComputedStyle(gridEl);
  const gapVal = style.columnGap || style.gap || '0px';
    const gapPx = toPx(gapVal);

    // Available width for grid content
    const gridWidth = gridEl.clientWidth;
    // Reserve a portion of the initial viewport for the footer (no scrolling needed)
    const rootStyle = getComputedStyle(document.documentElement);
    const footerSpaceVal = rootStyle.getPropertyValue('--footer-space') || '14vh';
    const reservedFooterPx = toPx(footerSpaceVal, false);
    const gridTop = gridEl.getBoundingClientRect().top;
    const availableHeight = Math.max(0, window.innerHeight - gridTop - reservedFooterPx - 12); // small padding

  const columnWidth = (gridWidth - gapPx * (columns - 1)) / columns;
  const cellHeightLimit = (availableHeight - gapPx * (rows - 1)) / rows;

  // Make cells horizontally rectangular by using a height ratio.
  // heightRatio is the fraction of width that determines height (e.g. 0.6)
  const heightRatio = 0.6;
  // To ensure the height does not exceed available vertical space,
  // the column width must satisfy: width * heightRatio <= cellHeightLimit
  const maxAllowedWidthFromHeight = cellHeightLimit / heightRatio;
  const finalWidth = Math.max(24, Math.floor(Math.min(columnWidth, maxAllowedWidthFromHeight)));

  // Set the CSS variable for cell height; width is 100% of column.
    const cellHeightPx = Math.max(20, Math.floor(finalWidth * heightRatio));
    // Only update the CSS variable if it changed to avoid layout thrash
    const prev = gridEl.style.getPropertyValue('--cell-height');
    const prevPx = prev ? parseInt(prev, 10) : NaN;
    if (Number.isNaN(prevPx) || Math.abs(prevPx - cellHeightPx) > 1) {
      gridEl.style.setProperty('--cell-height', `${cellHeightPx}px`);
    }
  }

  // initial adjust + recompute on resize/orientation
  adjustCellSize();
  let resizeTimer: number | undefined;
  window.addEventListener('resize', () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(adjustCellSize, 100);
  });
  window.addEventListener('orientationchange', () => setTimeout(adjustCellSize, 120));
}

// init
window.addEventListener('DOMContentLoaded', async () => {
  const sounds = await loadSounds();
  createGrid(sounds);
});
