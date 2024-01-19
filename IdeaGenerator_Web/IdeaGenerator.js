document.addEventListener('DOMContentLoaded', function () {
    var generatorElement = document.getElementById('generator');
    var outputElement = document.getElementById('output');
    var shuffleBtn = document.getElementById('shuffleBtn');
    var ideas = [];
    // Load data from JSON file
    fetch('IdeaGenerator.json')
        .then(function (response) { return response.json(); })
        .then(function (data) {
        ideas = data;
    })
        .catch(function (error) { return console.error('Error loading data:', error); });
    shuffleBtn.addEventListener('click', generateIdea);
    function generateIdea() {
        clearGenerator();
        outputElement.textContent = '';
        ideas.forEach(function (category, index) {
            var randomIndex = Math.floor(Math.random() * category.length);
            var card = document.createElement('div');
            card.className = 'card';
            card.textContent = category[randomIndex];
            generatorElement.appendChild(card);
            if (index === 5) {
                outputElement.textContent += " ".concat(category[randomIndex], ".");
            }
            else {
                outputElement.textContent += " ".concat(category[randomIndex], " -");
            }
        });
    }
    function clearGenerator() {
        while (generatorElement.firstChild) {
            generatorElement.firstChild.remove();
        }
    }
});
