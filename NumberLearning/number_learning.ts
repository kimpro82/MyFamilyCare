
// Basic TypeScript code for number learning web app
// Generates number cells, handles events, outputs speech using Web Speech API, loads sound data from JSON


/**
 * Interface for number sound mapping
 * key: number as string, value: Korean pronunciation
 */
interface NumberSounds {
  [key: string]: string;
}


/**
 * Loads number sound data from JSON file
 * @returns Promise resolving to NumberSounds object
 */
async function loadSounds(): Promise<NumberSounds> {
  const res = await fetch('number_sounds.json');
  return await res.json();
}


/**
 * Speaks the given text using Web Speech API (Korean)
 * Stops any previous speech immediately
 * @param text - Korean pronunciation to speak
 */
function speak(text: string) {
  window.speechSynthesis.cancel(); // Stop previous speech immediately
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.rate = 0.7;
  window.speechSynthesis.speak(utter);
}


/**
 * Creates the number grid and attaches event listeners for speech output
 * @param sounds - NumberSounds mapping for pronunciation
 */
function createGrid(sounds: NumberSounds) {
  const grid = document.getElementById('grid');
  if (!grid) return;
  grid.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const cell = document.createElement('div');
    cell.className = 'number-cell';
    cell.textContent = i.toString();
    cell.addEventListener('click', () => speak(sounds[i.toString()]));
    cell.addEventListener('touchstart', () => speak(sounds[i.toString()]));
    grid.appendChild(cell);
  }
}


// Initialize app after DOM is loaded
window.addEventListener('DOMContentLoaded', async () => {
  const sounds = await loadSounds();
  createGrid(sounds);
});
