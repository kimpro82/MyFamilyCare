document.addEventListener('DOMContentLoaded', () => {
  const generatorElement = document.getElementById('generator')!;
  const outputElement = document.getElementById('output')!;
  const shuffleBtn = document.getElementById('shuffleBtn') as HTMLButtonElement;

  let ideas: string[][] = [];

  // Load data from JSON file
  fetch('./IdeaGenerator.json')
    .then(response => response.json())
    .then(data => {
      ideas = data;
    })
    .catch(error => console.error('Error loading data:', error));

  shuffleBtn.addEventListener('click', generateIdea);

  function generateIdea() {
    clearGenerator();
    outputElement.textContent = '';
    ideas.forEach((category, index) => {
      const randomIndex = Math.floor(Math.random() * category.length);
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = category[randomIndex];
      generatorElement.appendChild(card);

      if (index === 5) {
        outputElement.textContent += ` ${category[randomIndex]}.`;
      } else {
        outputElement.textContent += ` ${category[randomIndex]} -`;
      }
    });
  }

  function clearGenerator() {
    while (generatorElement.firstChild) {
      generatorElement.firstChild.remove();
    }
  }
});
