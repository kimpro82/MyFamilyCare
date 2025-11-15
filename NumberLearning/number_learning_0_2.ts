// Basic TypeScript code for number learning web app
// Version 0.2 — numbers 1..20, pointer events, reserves footer space when sizing
// 2025.11.05
// Generates number cells, handles pointer events, outputs speech using Web Speech API,
// loads sound data from `number_sounds_0_2.json` and computes responsive cell sizes

/**
 * Interface for number sound mapping
 * key: number as string, value: Korean pronunciation
 */
interface NumberSounds {
  [key: string]: string;
}


/**
 * Loads number sound data from JSON file (0_2 variant)
 * @returns Promise resolving to NumberSounds object
 */
async function loadSounds(): Promise<NumberSounds> {
  const res = await fetch('number_sounds_0_2.json');
  return await res.json();
}


/**
 * Speaks the given text using Web Speech API (Korean).
 * Cancels any previous speech immediately.
 * @param text - Korean pronunciation to speak
 */
function speak(text: string) {
  try {
    window.speechSynthesis.cancel(); // Stop previous speech immediately
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
 * Creates the number grid (1..20) and attaches a unified pointer event to avoid duplicate
 * audio playback on touch devices. Also computes responsive cell height so the grid fits
 * into the viewport while reserving footer space.
 * @param sounds - Mapping of number string -> Korean pronunciation
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
  /**
   * Convert a CSS length string to pixels. Supports px, vw, vh, rem and %.
   * @param val - CSS length string (e.g. '14vh', '2rem', '10%')
   * @param relativeToWidth - when '%' is used, compute percentage relative to grid width (true)
   * @returns pixel equivalent as number
   */
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


  /**
   * Adjusts the CSS variable --cell-height so the grid with `columns` columns
   * fills the available viewport height while reserving space for the footer.
   * It enforces a rectangular shape using `heightRatio` and guards updates
   * against tiny changes to avoid layout thrash.
   */
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
