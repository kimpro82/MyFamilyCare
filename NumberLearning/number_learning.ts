// ...기본 타입스크립트 코드...
// 숫자 셀 생성, 이벤트 처리, Web Speech API 음성 출력, JSON 데이터 로딩

interface NumberSounds {
  [key: string]: string;
}

async function loadSounds(): Promise<NumberSounds> {
  const res = await fetch('number_sounds.json');
  return await res.json();
}

function speak(text: string) {
  // 기존 음성 즉시 중지
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ko-KR';
  utter.rate = 0.7;
  window.speechSynthesis.speak(utter);
}

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

window.addEventListener('DOMContentLoaded', async () => {
  const sounds = await loadSounds();
  createGrid(sounds);
});
