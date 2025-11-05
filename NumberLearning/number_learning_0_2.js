// Basic TypeScript code for number learning web app
// Version 0.2 — numbers 1..20, pointer events, reserves footer space when sizing
// 2025.11.05
// Generates number cells, handles pointer events, outputs speech using Web Speech API,
// loads sound data from `number_sounds_0_2.json` and computes responsive cell sizes
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/**
 * Loads number sound data from JSON file (0_2 variant)
 * @returns Promise resolving to NumberSounds object
 */
function loadSounds() {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('number_sounds_0_2.json')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
/**
 * Speaks the given text using Web Speech API (Korean).
 * Cancels any previous speech immediately.
 * @param text - Korean pronunciation to speak
 */
function speak(text) {
    try {
        window.speechSynthesis.cancel(); // Stop previous speech immediately
    }
    catch (e) {
        // ignore
    }
    var utter = new SpeechSynthesisUtterance(text);
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
function createGrid(sounds) {
    var grid = document.getElementById('grid');
    if (!grid)
        return;
    var gridEl = grid;
    grid.innerHTML = '';
    var _loop_1 = function (i) {
        var cell = document.createElement('div');
        cell.className = 'number-cell';
        cell.textContent = i.toString();
        // pointerdown handles touch and mouse without duplicate events.
        cell.addEventListener('pointerdown', function (ev) {
            var _a;
            // prevent the later click event on some platforms
            if (ev && ev.preventDefault)
                ev.preventDefault();
            var key = i.toString();
            var text = (_a = sounds[key]) !== null && _a !== void 0 ? _a : key; // fallback to the number itself
            speak(text);
        }, { passive: false });
        grid.appendChild(cell);
    };
    for (var i = 1; i <= 20; i++) {
        _loop_1(i);
    }
    // After grid is populated, compute cell size so all rows fit the viewport
    /**
     * Convert a CSS length string to pixels. Supports px, vw, vh, rem and %.
     * @param val - CSS length string (e.g. '14vh', '2rem', '10%')
     * @param relativeToWidth - when '%' is used, compute percentage relative to grid width (true)
     * @returns pixel equivalent as number
     */
    function toPx(val, relativeToWidth) {
        if (relativeToWidth === void 0) { relativeToWidth = true; }
        if (!val)
            return 0;
        val = val.trim();
        if (val.endsWith('px'))
            return parseFloat(val);
        if (val.endsWith('vw'))
            return parseFloat(val) * window.innerWidth / 100;
        if (val.endsWith('vh'))
            return parseFloat(val) * window.innerHeight / 100;
        if (val.endsWith('rem'))
            return parseFloat(val) * parseFloat(getComputedStyle(document.documentElement).fontSize || '16');
        if (val.endsWith('%')) {
            // percentage relative to grid width if requested
            var pct = parseFloat(val) / 100;
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
        var items = gridEl.children.length;
        var columns = 5;
        var rows = Math.max(1, Math.ceil(items / columns));
        var style = getComputedStyle(gridEl);
        var gapVal = style.columnGap || style.gap || '0px';
        var gapPx = toPx(gapVal);
        // Available width for grid content
        var gridWidth = gridEl.clientWidth;
        // Reserve a portion of the initial viewport for the footer (no scrolling needed)
        var rootStyle = getComputedStyle(document.documentElement);
        var footerSpaceVal = rootStyle.getPropertyValue('--footer-space') || '14vh';
        var reservedFooterPx = toPx(footerSpaceVal, false);
        var gridTop = gridEl.getBoundingClientRect().top;
        var availableHeight = Math.max(0, window.innerHeight - gridTop - reservedFooterPx - 12); // small padding
        var columnWidth = (gridWidth - gapPx * (columns - 1)) / columns;
        var cellHeightLimit = (availableHeight - gapPx * (rows - 1)) / rows;
        // Make cells horizontally rectangular by using a height ratio.
        // heightRatio is the fraction of width that determines height (e.g. 0.6)
        var heightRatio = 0.6;
        // To ensure the height does not exceed available vertical space,
        // the column width must satisfy: width * heightRatio <= cellHeightLimit
        var maxAllowedWidthFromHeight = cellHeightLimit / heightRatio;
        var finalWidth = Math.max(24, Math.floor(Math.min(columnWidth, maxAllowedWidthFromHeight)));
        // Set the CSS variable for cell height; width is 100% of column.
        var cellHeightPx = Math.max(20, Math.floor(finalWidth * heightRatio));
        // Only update the CSS variable if it changed to avoid layout thrash
        var prev = gridEl.style.getPropertyValue('--cell-height');
        var prevPx = prev ? parseInt(prev, 10) : NaN;
        if (Number.isNaN(prevPx) || Math.abs(prevPx - cellHeightPx) > 1) {
            gridEl.style.setProperty('--cell-height', "".concat(cellHeightPx, "px"));
        }
    }
    // initial adjust + recompute on resize/orientation
    adjustCellSize();
    var resizeTimer;
    window.addEventListener('resize', function () {
        if (resizeTimer)
            window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(adjustCellSize, 100);
    });
    window.addEventListener('orientationchange', function () { return setTimeout(adjustCellSize, 120); });
}
// init
window.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    var sounds;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadSounds()];
            case 1:
                sounds = _a.sent();
                createGrid(sounds);
                return [2 /*return*/];
        }
    });
}); });
