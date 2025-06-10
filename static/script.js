const homeScreen = document.getElementById('home-screen');
const difficultyScreen = document.getElementById('difficulty-screen');
const generalSettingsScreen = document.getElementById('general-settings-screen');
const customSettingsScreen = document.getElementById('custom-settings-screen');
const gameScreen = document.getElementById('game-screen');
const grid = document.getElementById('grid');
const movesLeft = document.getElementById('moves-left');
const currentMove = document.getElementById('current-move');
const resultMessage = document.getElementById('result-message');
const playButton = document.getElementById('play-button');
const settingsButton = document.getElementById('settings-button');
const exitButton = document.getElementById('exit-button');
const easyButton = document.getElementById('easy-button');
const normalButton = document.getElementById('normal-button');
const hardButton = document.getElementById('hard-button');
const difficultySettingsButton = document.getElementById('difficulty-settings-button');
const startSettingsButton = document.getElementById('start-settings-button');
const startGameButton = document.getElementById('start-game-button');
const restartButton = document.getElementById('restart-button');
const soundButton = document.getElementById('sound-button');
const languageRu = document.getElementById('language-ru');
const languageEn = document.getElementById('language-en');
const speedValue = document.getElementById('speed-value');
const speedDisplay = document.getElementById('speed-display');
const stepsValue = document.getElementById('steps-value');
const gridSizeValue = document.getElementById('grid-size-value');
const volumeValue = document.getElementById('volume-value');
const volumeDisplay = document.getElementById('volume-display');
const voiceValue = document.getElementById('voice-value');
const characterValue = document.getElementById('character-value');
const menuButton = document.getElementById('menu-button');
const menuButtonStandalone = document.getElementById('menu-button-standalone');
const rulesButton = document.getElementById('rules-button');
const rulesModal = document.getElementById('rules-modal');
const closeRules = document.getElementById('close-rules');
const rulesTitle = document.getElementById('rules-title');
const rulesText1 = document.getElementById('rules-text-1');
const rulesText2 = document.getElementById('rules-text-2');
const rulesText3 = document.getElementById('rules-text-3');
const rulesPrev = document.getElementById('rules-prev');
const rulesNext = document.getElementById('rules-next');
const menuToggle = document.querySelector('.menu-toggle');
const standaloneMenu = document.querySelector('.standalone-menu');
// const helpButton = document.getElementById('help-button');
const instructionsScreen = document.getElementById('instructions-screen');
//  const page1 = document.getElementById('page-1');
//  const page2 = document.getElementById('page-2');
//  const page3 = document.getElementById('page-3');

let dots = [];
let flyPosition = { row: 0, col: 0 };
let targetPosition = { row: 0, col: 0 };
let expectedFinalPosition = null; // For backend
let flyRoute = null; // Optional: raw positions from backend
let flyAudio = null; // Optional: audio URLs from backend
let gameState = 'start';
let totalMoves = 8;
let currentMoveCount = 0;
let currentScore = 0; // For backend score tracking
let moveDelay = 1000;
let soundOn = true;
let gridSize = 3;
let autoMoveInterval = null;
let isMoving = false;
let currentLanguage = 'ru';
let moveQueue = [];
let flyVisible = true;
let flySpeed = 1;
let volumeLevel = 50;
let voiceGender = 'Мужчина';
let character = 'Муха';
let voiceOptions = ['Мужчина', 'Женщина'];
let characterOptions = ['Муха', 'Fly'];
let gridSizes = ['3×3', '4×4', '5×5'];
let rulesLanguage = 'ru';

const translations = {
    en: {
        title: "Fly 2.0",
        play: "Play",
        settings: "Settings",
        exit: "Exit",
        chooseDifficulty: "Choose Difficulty",
        easy: "Easy",
        normal: "Normal",
        hard: "Hard",
        difficultySettings: "Difficulty",
        settingsTitle: "Settings",
        speed: "Fly Speed:",
        steps: "Number of Steps:",
        gridSize: "Grid Size:",
        volume: "Volume:",
        voice: "Voice:",
        character: "Character:",
        start: "Start",
        back: "Back",
        movesLeft: "Moves Left: ",
        currentMove: "Current Turn: ",
        startGame: "Start",
        restart: "Restart",
        soundOn: "🔊",
        soundOff: "🔇",
        correct: "Correct!",
        incorrect: "Incorrect!",
        flyWaiting: "Fly is waiting",
        whereIsFly: "Where is the fly?",
        rulesTitle: "Rules",
        rulesText1: "In front of you is a virtual field where a fly moves. Your task is to carefully follow its movements and accurately indicate its final position after all moves.",
        rulesText2: "At the beginning of the game, you will see the fly's starting position, but as soon as the moves start, the field will become empty. You will hear voice commands indicating the direction of the fly's movement.",
        rulesText3: "Your goal is to mentally track its path and, after the moves are completed, click on the cell where you think it stopped. Can you keep the fly in your focus? Good luck!",
        voiceOptions: ['Male', 'Female'],
        characterOptions: ['Fly', 'Fly']
    },
    ru: {
        title: "Муха 2.0",
        play: "Играть",
        settings: "Настройки",
        exit: "Выход",
        chooseDifficulty: "Выберите сложность",
        easy: "Легко",
        normal: "Нормально",
        hard: "Сложно",
        difficultySettings: "Сложность",
        settingsTitle: "Настройки",
        speed: "Скорость мухи:",
        steps: "Кол-во шагов:",
        gridSize: "Размер поля:",
        volume: "Громкость:",
        voice: "Голос:",
        character: "Персонаж:",
        start: "Начать",
        back: "Назад",
        movesLeft: "Осталось ходов: ",
        currentMove: "Текущий ход: ",
        startGame: "Начать",
        restart: "Рестарт",
        soundOn: "🔊",
        soundOff: "🔇",
        correct: "Верно!",
        incorrect: "Неверно!",
        flyWaiting: "Муха ждет",
        whereIsFly: "Где муха?",
        rulesTitle: "Правила",
        rulesText1: "Перед вами — виртуальное поле, по которому перемещается муха. Ваша задача — внимательно следить за её передвижениями и точно указать её конечную позицию после всех ходов.",
        rulesText2: "В начале игры вы увидите стартовое положение мухи, но как только ходы начнутся, поле станет пустым. Вы будете слышать голосовые команды, указывающие направление движения мухи.",
        rulesText3: "Ваша цель — мысленно отслеживать её путь и после завершения ходов кликнуть на ту клетку, где, по вашему мнению, она остановилась. Сможете ли вы удержать муху в поле внимания? Удачи!",
        voiceOptions: ['Мужчина', 'Женщина'],
        characterOptions: ['Муха', 'Муха']
    }
};

document.getElementById('scorm-welcome-screen').style.display = 'block';
document.getElementById('home-screen').style.display = 'none';
document.getElementById('difficulty-screen').style.display = 'none';
document.getElementById('general-settings-screen').style.display = 'none';
document.getElementById('custom-settings-screen').style.display = 'none';
document.getElementById('game-screen').style.display = 'none';
menuToggle.style.display = 'none';
standaloneMenu.style.display = 'none';

document.getElementById('start-game').addEventListener('click', function() {
    document.getElementById('scorm-welcome-screen').style.display = 'none';
    document.getElementById('home-screen').style.display = 'block';
    menuToggle.style.display = 'none';
    standaloneMenu.style.display = 'none';
});

function setLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    localStorage.setItem('flyGameLanguage', currentLanguage);
    languageRu.classList.toggle('active', lang === 'ru');
    languageEn.classList.toggle('active', lang === 'en');
}

function updateLanguage() {
    const t = translations[currentLanguage];
    document.getElementById('title').textContent = t.title;
    playButton.textContent = t.play;
    settingsButton.textContent = t.settings;
    exitButton.textContent = t.exit;
    document.getElementById('choose-difficulty').textContent = t.chooseDifficulty;
    easyButton.textContent = t.easy;
    normalButton.textContent = t.normal;
    hardButton.textContent = t.hard;
    difficultySettingsButton.textContent = t.difficultySettings;
    document.getElementById('general-settings-title').textContent = t.settingsTitle;
    document.getElementById('volume-label').textContent = t.volume;
    document.getElementById('voice-label').textContent = t.voice;
    document.getElementById('character-label').textContent = t.character;
    document.getElementById('speed-label').textContent = t.speed;
    document.getElementById('steps-label').textContent = t.steps;
    document.getElementById('grid-size-label').textContent = t.gridSize;
    startSettingsButton.textContent = t.start;
    movesLeft.textContent = `${t.movesLeft}${totalMoves - currentMoveCount}`;
    currentMove.textContent = t.flyWaiting;
    startGameButton.textContent = t.startGame;
    restartButton.textContent = t.restart;
    soundButton.textContent = soundOn ? t.soundOn : t.soundOff;
    resultMessage.textContent = '';

    // Update voice and character options based on current language
    voiceOptions = t.voiceOptions;
    characterOptions = t.characterOptions;
    voiceValue.textContent = voiceOptions[voiceOptions.indexOf(voiceGender) !== -1 ? voiceOptions.indexOf(voiceGender) : 0];
    characterValue.textContent = characterOptions[characterOptions.indexOf(character) !== -1 ? characterOptions.indexOf(character) : 0];
    voiceGender = voiceValue.textContent;
    character = characterValue.textContent;

    updateRulesLanguage(rulesLanguage);
}

function setRandomTargetPosition() {
    let newRow, newCol;
    do {
        newRow = Math.floor(Math.random() * gridSize);
        newCol = Math.floor(Math.random() * gridSize);
    } while (newRow === flyPosition.row && newCol === flyPosition.col);
    targetPosition = { row: newRow, col: newCol };
}

function createGrid(size, difficultyLevel) {
    grid.innerHTML = '';
    dots = [];
    grid.className = 'grid';
    grid.classList.add(`grid-${difficultyLevel}`);
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            grid.appendChild(cell);
            dots.push(cell);
        }
    }

    const centerRow = Math.floor(size / 2);
    const centerCol = Math.floor(size / 2);
    flyPosition = { row: centerRow, col: centerCol };
    setRandomTargetPosition();
    flyVisible = true;
    updateTarget();
    updateFly();
}

function updateTarget() {
    dots.forEach(cell => {
        const isTargetCell = cell.dataset.row == targetPosition.row && cell.dataset.col == targetPosition.col;
        if (!isTargetCell) {
            cell.innerHTML = cell.innerHTML.includes('fly-game') ? cell.innerHTML : '';
        }
    });

    const targetCell = dots[targetPosition.row * gridSize + targetPosition.col];
    const existingContent = targetCell.innerHTML.includes('fly-game') ? targetCell.innerHTML : '';
    targetCell.innerHTML = '<div class="target"></div>' + existingContent;
}

function updateFly() {
    dots.forEach(cell => {
        cell.classList.remove('fly', 'correct-cell', 'incorrect-cell');
        const isFlyCell = cell.dataset.row == flyPosition.row && cell.dataset.col == flyPosition.col;
        const isTargetCell = cell.dataset.row == targetPosition.row && cell.dataset.col == targetPosition.col;
        if (isFlyCell && flyVisible) {
            const flyHTML = `<div class="fly-game"><img src="fly2.png" alt="Fly"></div>`;
            const existingContent = cell.innerHTML.includes('target') ? cell.innerHTML : '';
            cell.innerHTML = flyHTML + existingContent;
            cell.classList.add('fly');
        } else {
            cell.innerHTML = isTargetCell ? '<div class="target"></div>' : '';
        }
    });
}

async function calculateRandomPath() {
    try {
        const steps = totalMoves;
        const response = await fetch(`http://localhost:8000/fly_route/?steps=${steps}`);
        const data = await response.json();

        moveQueue = data.directions.map(dir => dir.toLowerCase());
        flyPosition = {
            row: data.initial_position[0],
            col: data.initial_position[1]
        };
        expectedFinalPosition = {
            row: data.final_position[0],
            col: data.final_position[1]
        };

        currentMoveCount = 0;
        flyVisible = true;
        gameState = 'playing';
        isMoving = true;

        updateFly();
        executeNextMove();
    } catch (error) {
        console.error("Error fetching path:", error);
        alert("Error fetching path from server. Check console for details.");
    }
}

function executeNextMove() {
    if (moveQueue.length === 0) {
        flyVisible = false;
        updateFly();
        isMoving = false;
        // startGameButton.style.display = 'block';
        currentMove.style.display = 'block';
        currentMove.textContent = translations[currentLanguage].whereIsFly;
        return;
    }

    const nextMove = moveQueue.shift();
    const prevPosition = {...flyPosition };

    switch (nextMove) {
        case 'up':
            if (flyPosition.row > 0) flyPosition.row--;
            break;
        case 'down':
            if (flyPosition.row < gridSize - 1) flyPosition.row++;
            break;
        case 'left':
            if (flyPosition.col > 0) flyPosition.col--;
            break;
        case 'right':
            if (flyPosition.col < gridSize - 1) flyPosition.col++;
            break;
    }

    currentMoveCount++;
    movesLeft.textContent = `${translations[currentLanguage].movesLeft}${totalMoves - currentMoveCount}`;
    if (!soundOn) currentMove.style.display = 'block';

    updateFly();
    setTimeout(executeNextMove, moveDelay);

}

function moveStepByStep() {
    if (isMoving || gameState !== 'start') {
        console.log('moveStepByStep blocked: gameState=', gameState, 'isMoving=', isMoving);
        return;
    }

    console.log('moveStepByStep called');
    isMoving = true;
    startGameButton.style.display = 'none';
    currentMove.textContent = translations[currentLanguage].whereIsFly;
    currentMove.style.display = 'block';
    gameState = 'playing';
    calculateRandomPath();




    // function executeNextMove() {
    //     if (moveQueue.length === 0) {
    //         flyVisible = false;
    //         updateFly();
    //         isMoving = false;
    //         startGameButton.style.display = 'block';
    //         currentMove.textContent = translations[currentLanguage].flyWaiting;
    //         return;
    //     }

    //     const nextMove = moveQueue.shift();
    //     const prevPosition = {...flyPosition };

    //     switch (nextMove) {
    //         case 'up':
    //             if (flyPosition.row > 0) flyPosition.row--;
    //             break;
    //         case 'down':
    //             if (flyPosition.row < gridSize - 1) flyPosition.row++;
    //             break;
    //         case 'left':
    //             if (flyPosition.col > 0) flyPosition.col--;
    //             break;
    //         case 'right':
    //             if (flyPosition.col < gridSize - 1) flyPosition.col++;
    //             break;
    //     }

    //     currentMoveCount++;
    //     movesLeft.textContent = `${translations[currentLanguage].movesLeft}${totalMoves - currentMoveCount}`;
    //     if (!soundOn) currentMove.style.display = 'block';

    //     updateFly();
    //     setTimeout(executeNextMove, moveDelay);

    // }
    executeNextMove();
}

function checkTarget() {
    flyVisible = true;
    updateFly();

    const flyCell = dots[flyPosition.row * gridSize + flyPosition.col];
    const t = translations[currentLanguage];

    if (
        flyPosition.row === expectedFinalPosition.row &&
        flyPosition.col === expectedFinalPosition.col
    ) {
        flyCell.classList.add('correct-cell');
        resultMessage.textContent = t.correct;

        currentScore += 10;

        fetch('http://127.0.0.1:8000/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ score: currentScore })
        });

        setRandomTargetPosition();
        updateTarget();
    } else {
        flyCell.classList.add('incorrect-cell');
        resultMessage.textContent = t.incorrect;
        totalMoves--;
        movesLeft.textContent = `${t.movesLeft}${totalMoves}`;
    }

    resultMessage.style.display = 'block';
    restartButton.style.display = 'block';
    startGameButton.style.display = 'block';
    currentMove.textContent = translations[currentLanguage].flyWaiting;

    if (totalMoves <= 0) {
        gameState = 'ended';
    }
}

function handleCellClick(event) {
    if (gameState !== 'playing' || isMoving) return;

    const clickedRow = parseInt(event.target.dataset.row);
    const clickedCol = parseInt(event.target.dataset.col);
    const t = translations[currentLanguage];

    if (clickedRow === expectedFinalPosition.row && clickedCol === expectedFinalPosition.col) {
        event.target.classList.add('correct-cell');
        resultMessage.textContent = t.correct;

        currentScore += 10;

        fetch('http://127.0.0.1:8000/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ score: currentScore })
        });

        setRandomTargetPosition();
        updateTarget();
    } else {
        event.target.classList.add('incorrect-cell');
        resultMessage.textContent = t.incorrect;
        totalMoves--;
        movesLeft.textContent = `${t.movesLeft}${totalMoves}`;
    }

    resultMessage.style.display = 'block';
    restartButton.style.display = 'block';
    startGameButton.style.display = 'none';
    currentMove.style.display = 'none';
    // currentMove.textContent = translations[currentLanguage].flyWaiting;

    if (totalMoves <= 0) {
        gameState = 'ended';
    }
}

function toggleSound() {
    soundOn = !soundOn;
    const t = translations[currentLanguage];
    soundButton.textContent = soundOn ? t.soundOn : t.soundOff;
    localStorage.setItem('flyGameSound', soundOn);
}

async function startGame(difficultyLevel) {
    try {
        await fetch(`http://127.0.0.1:8000/difficulty/${difficultyLevel}`, {
            method: 'POST'
        });

        const response = await fetch('http://127.0.0.1:8000/play', {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to start game from backend');
        }

        const data = await response.json();
        console.log("Game path from backend:", data.path);

        gameState = 'start';
        currentMoveCount = 0;
        flyVisible = true;
        isMoving = false;
        moveQueue = [];

        createGrid(gridSize, difficultyLevel);
        movesLeft.textContent = `${translations[currentLanguage].movesLeft}${totalMoves}`;
        currentMove.textContent = translations[currentLanguage].flyWaiting;
        currentMove.style.display = 'block';
        movesLeft.style.display = 'block';
        startGameButton.style.display = 'block';
        resultMessage.style.display = 'none';
        restartButton.style.display = 'none';
        menuToggle.style.display = 'flex';
        standaloneMenu.style.display = 'none';

        difficultyScreen.style.display = 'none';
        generalSettingsScreen.style.display = 'none';
        customSettingsScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    } catch (error) {
        console.error("Error starting game:", error);
        alert("Error starting game. Check console for details.");
    }
}

function restartGame() {
    let difficultyLevel;
    switch (gridSize) {
        case 3:
            difficultyLevel = 'easy';
            break;
        case 4:
            difficultyLevel = 'normal';
            break;
        case 5:
            difficultyLevel = 'hard';
            break;
    }
    currentMove.textContent = translations[currentLanguage].flyWaiting;
    startGame(difficultyLevel);
}

function showInstructions() {
    instructionsScreen.style.display = 'flex';
    // page1.style.display = 'block';
    // page2.style.display = 'none';
    // page3.style.display = 'none';
}

function hideInstructions() {
    instructionsScreen.style.display = 'none';
    // page1.style.display = 'none';
    // page2.style.display = 'none';
    // page3.style.display = 'none';
}

function showDifficultyScreen() {
    homeScreen.style.display = 'none';
    difficultyScreen.style.display = 'block';
    movesLeft.style.display = 'none';
    currentMove.style.display = 'none';
    startGameButton.style.display = 'none';
    menuToggle.style.display = 'none';
    standaloneMenu.style.display = 'block';
}

function showGeneralSettingsScreen() {
    homeScreen.style.display = 'none';
    generalSettingsScreen.style.display = 'block';
    movesLeft.style.display = 'none';
    currentMove.style.display = 'none';
    startGameButton.style.display = 'none';
    menuToggle.style.display = 'none';
    standaloneMenu.style.display = 'block';
}

function showCustomSettingsScreen() {
    difficultyScreen.style.display = 'none';
    customSettingsScreen.style.display = 'block';
    gridSizeValue.textContent = `${gridSize}×${gridSize}`;
    movesLeft.style.display = 'none';
    currentMove.style.display = 'none';
    startGameButton.style.display = 'none';
    menuToggle.style.display = 'none';
    standaloneMenu.style.display = 'block';
}

function goBack() {
    const currentScreen = document.querySelector('.screen:not([style*="display: none"])');
    if (currentScreen === difficultyScreen) {
        difficultyScreen.style.display = 'none';
        homeScreen.style.display = 'block';
        menuToggle.style.display = 'none';
        standaloneMenu.style.display = 'none';
    } else if (currentScreen === generalSettingsScreen) {
        generalSettingsScreen.style.display = 'none';
        homeScreen.style.display = 'block';
        menuToggle.style.display = 'none';
        standaloneMenu.style.display = 'none';
    } else if (currentScreen === customSettingsScreen) {
        customSettingsScreen.style.display = 'none';
        difficultyScreen.style.display = 'block';
        menuToggle.style.display = 'none';
        standaloneMenu.style.display = 'block';
    } else if (currentScreen === gameScreen) {
        gameScreen.style.display = 'none';
        difficultyScreen.style.display = 'block';
        menuToggle.style.display = 'none';
        standaloneMenu.style.display = 'block';
    }
    movesLeft.style.display = 'none';
    currentMove.style.display = 'none';
    startGameButton.style.display = 'none';
}

function applyGeneralSettings() {
    volumeLevel = parseInt(volumeValue.value);
    volumeDisplay.textContent = `${volumeLevel}%`;
    startGame('easy');
}

async function applyCustomSettings() {
    flySpeed = parseFloat(speedValue.value);
    speedDisplay.textContent = `x${flySpeed}`;
    totalMoves = parseInt(stepsValue.textContent);
    const gridSizeText = gridSizeValue.textContent;
    gridSize = parseInt(gridSizeText.split('×')[0]);
    moveDelay = 1000 / flySpeed;

    let difficultyLevel;
    switch (gridSize) {
        case 3:
            difficultyLevel = 'easy';
            break;
        case 4:
            difficultyLevel = 'normal';
            break;
        case 5:
            difficultyLevel = 'hard';
            break;
    }

    try {
        await fetch(`http://127.0.0.1:8000/difficulty/${difficultyLevel}`, {
            method: 'POST'
        });

        const response = await fetch('http://127.0.0.1:8000/play', {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to start game from backend');
        }

        const data = await response.json();
        console.log("Game path from backend:", data.path);

        startGame(difficultyLevel);
    } catch (error) {
        console.error("Error applying custom settings:", error);
        alert("Error applying settings. Check console for details.");
    }
}

async function setDifficulty(level) {
    switch (level) {
        case 'easy':
            gridSize = 3;
            totalMoves = 5;
            flySpeed = 0.5;
            break;
        case 'normal':
            gridSize = 4;
            totalMoves = 8;
            flySpeed = 1.0;
            break;
        case 'hard':
            gridSize = 5;
            totalMoves = 12;
            flySpeed = 1.5;
            break;
    }
    speedValue.value = flySpeed;
    speedDisplay.textContent = `x${flySpeed}`;
    stepsValue.textContent = totalMoves;
    gridSizeValue.textContent = `${gridSize}×${gridSize}`;
    moveDelay = 1000 / flySpeed;

    // try {
    const difficultyResponse = await fetch(`http://127.0.0.1:8000/difficulty/${level}`, {
        method: 'POST'
    });

    if (!difficultyResponse.ok) {
        const errText = await difficultyResponse.text();
        throw new Error(`Difficulty error: ${errText}`);
    }

    const playResponse = await fetch(`http://127.0.0.1:8000/play`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });

    if (!playResponse.ok) {
        const errText = await playResponse.text();
        throw new Error(`Play error: ${errText}`);
    }

    const gameData = await playResponse.json();
    console.log("Game path from backend:", gameData.path);

    moveQueue = gameData.path.directions;
    flyRoute = gameData.path.route;
    flyAudio = gameData.path.audio_urls;

    startGame(level);
    // } catch (error) {
    //     console.error("Error setting difficulty or starting game:", error);
    //     alert("Error starting game. Check console for details.");
    // }
}

function updateGeneralSettingsValues() {
    volumeValue.addEventListener('input', () => {
        volumeLevel = parseInt(volumeValue.value);
        volumeDisplay.textContent = `${volumeLevel}%`;
    });

    const voiceDecrease = voiceValue.parentElement.querySelector('.decrease');
    const voiceIncrease = voiceValue.parentElement.querySelector('.increase');
    let voiceIndex = voiceOptions.indexOf(voiceGender);
    voiceValue.textContent = voiceOptions[voiceIndex] || voiceOptions[0];
    voiceDecrease.addEventListener('click', () => {
        voiceIndex = (voiceIndex > 0) ? voiceIndex - 1 : voiceOptions.length - 1;
        voiceValue.textContent = voiceOptions[voiceIndex];
        voiceGender = voiceOptions[voiceIndex];
    });
    voiceIncrease.addEventListener('click', () => {
        voiceIndex = (voiceIndex < voiceOptions.length - 1) ? voiceIndex + 1 : 0;
        voiceValue.textContent = voiceOptions[voiceIndex];
        voiceGender = voiceOptions[voiceIndex];
    });

    const characterDecrease = characterValue.parentElement.querySelector('.decrease');
    const characterIncrease = characterValue.parentElement.querySelector('.increase');
    let characterIndex = characterOptions.indexOf(character);
    characterValue.textContent = characterOptions[characterIndex] || characterOptions[0];
    characterDecrease.addEventListener('click', () => {
        characterIndex = (characterIndex > 0) ? characterIndex - 1 : characterOptions.length - 1;
        characterValue.textContent = characterOptions[characterIndex];
        character = characterOptions[characterIndex];
    });
    characterIncrease.addEventListener('click', () => {
        characterIndex = (characterIndex < characterOptions.length - 1) ? characterIndex + 1 : 0;
        characterValue.textContent = characterOptions[characterIndex];
        character = characterOptions[characterIndex];
    });
}

function updateCustomSettingsValues() {
    speedValue.addEventListener('input', () => {
        flySpeed = parseFloat(speedValue.value);
        speedDisplay.textContent = `x${flySpeed}`;
    });

    stepsValue.parentElement.querySelector('.decrease').addEventListener('click', () => {
        let steps = parseInt(stepsValue.textContent);
        steps = Math.max(1, steps - 1);
        stepsValue.textContent = steps;
    });

    stepsValue.parentElement.querySelector('.increase').addEventListener('click', () => {
        let steps = parseInt(stepsValue.textContent);
        steps = Math.min(20, steps + 1);
        stepsValue.textContent = steps;
    });

    const gridSizeDecrease = gridSizeValue.parentElement.querySelector('.decrease');
    const gridSizeIncrease = gridSizeValue.parentElement.querySelector('.increase');
    let currentGridIndex = gridSizes.indexOf(gridSizeValue.textContent);

    gridSizeDecrease.addEventListener('click', () => {
        currentGridIndex = Math.max(0, currentGridIndex - 1);
        gridSizeValue.textContent = gridSizes[currentGridIndex];
        gridSize = parseInt(gridSizes[currentGridIndex].split('×')[0]);
    });

    gridSizeIncrease.addEventListener('click', () => {
        currentGridIndex = Math.min(gridSizes.length - 1, currentGridIndex + 1);
        gridSizeValue.textContent = gridSizes[currentGridIndex];
        gridSize = parseInt(gridSizes[currentGridIndex].split('×')[0]);
    });
}

function loadSavedSettings() {
    const savedLanguage = localStorage.getItem('flyGameLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        languageRu.classList.toggle('active', savedLanguage === 'ru');
        languageEn.classList.toggle('active', savedLanguage === 'en');
    }

    soundOn = localStorage.getItem('flyGameSound') !== 'false';
    soundButton.textContent = soundOn ? translations[currentLanguage].soundOn : translations[currentLanguage].soundOff;

    updateLanguage();
}

function updateRulesLanguage(lang) {
    const t = translations[lang];
    rulesTitle.textContent = t.rulesTitle;
    rulesText1.textContent = t.rulesText1;
    rulesText2.textContent = t.rulesText2;
    rulesText3.textContent = t.rulesText3;
}

function showRulesModal() {
    rulesLanguage = currentLanguage;
    updateRulesLanguage(rulesLanguage);
    rulesModal.style.display = 'flex';
}

function closeRulesModal() {
    rulesModal.style.display = 'none';
}

function toggleRulesLanguage(direction) {
    if (direction === 'next') {
        rulesLanguage = rulesLanguage === 'ru' ? 'en' : 'ru';
    } else {
        rulesLanguage = rulesLanguage === 'ru' ? 'en' : 'ru';
    }
    updateRulesLanguage(rulesLanguage);
}

playButton.addEventListener('click', showDifficultyScreen);
settingsButton.addEventListener('click', showGeneralSettingsScreen);
exitButton.addEventListener('click', () => window.close());
easyButton.addEventListener('click', () => setDifficulty('easy'));
easyButton.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    difficultyScreen.style.display = 'none';
    homeScreen.style.display = 'block';
    menuToggle.style.display = 'none';
    standaloneMenu.style.display = 'none';
});
normalButton.addEventListener('click', () => setDifficulty('normal'));
normalButton.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    difficultyScreen.style.display = 'none';
    homeScreen.style.display = 'block';
    menuToggle.style.display = 'none';
    standaloneMenu.style.display = 'none';
});
hardButton.addEventListener('click', () => setDifficulty('hard'));
hardButton.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    difficultyScreen.style.display = 'none';
    homeScreen.style.display = 'block';
    menuToggle.style.display = 'none';
    standaloneMenu.style.display = 'none';
});
difficultySettingsButton.addEventListener('click', showCustomSettingsScreen);
startSettingsButton.addEventListener('click', applyCustomSettings);
startGameButton.addEventListener('click', moveStepByStep);
restartButton.addEventListener('click', restartGame);
soundButton.addEventListener('click', toggleSound);
languageRu.addEventListener('click', () => setLanguage('ru'));
languageEn.addEventListener('click', () => setLanguage('en'));
menuButton.addEventListener('click', goBack);
menuButtonStandalone.addEventListener('click', goBack);
rulesButton.addEventListener('click', showRulesModal);
closeRules.addEventListener('click', closeRulesModal);
rulesPrev.addEventListener('click', () => toggleRulesLanguage('prev'));
rulesNext.addEventListener('click', () => toggleRulesLanguage('next'));
// helpButton.addEventListener('click', showInstructions);
document.getElementById('menu-button-standalone').addEventListener('click', goBack);

// page1.querySelector('.next-page').addEventListener('click', () => {
//     page1.style.display = 'none';
//     page2.style.display = 'block';
// });

// page2.querySelector('.next-page').addEventListener('click', () => {
//     page2.style.display = 'none';
//     page3.style.display = 'block';
// });

// page2.querySelector('.prev-page').addEventListener('click', () => {
//     page2.style.display = 'none';
//     page1.style.display = 'block';
// });

// page3.querySelector('.prev-page').addEventListener('click', () => {
//     page3.style.display = 'none';
//     page2.style.display = 'block';
// });

document.querySelectorAll('.close-instructions').forEach(button => {
    button.addEventListener('click', hideInstructions);
});

loadSavedSettings();
updateGeneralSettingsValues();
updateCustomSettingsValues();