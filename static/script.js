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

// التحقق من وجود عناصر DOM
if (!homeScreen || !difficultyScreen || !generalSettingsScreen || !gameScreen || !grid) {
    console.error("One or more DOM elements are missing. Check index.html structure.");
    alert("Error: Game elements not found. Please check the HTML file.");
    throw new Error("Missing DOM elements");
}

let dots = [];
let flyPosition = { row: 0, col: 0 };
let targetPosition = { row: 0, col: 0 };
let expectedFinalPosition = null;
let flyRoute = null;
let flyAudio = null;
let gameState = 'start';
let totalMoves = 8;
let currentMoveCount = 0;
let currentScore = 0;
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
let availableVoices = [];

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
        characterOptions: ['Fly', 'Fly'],
        up: "Up",
        down: "Down",
        left: "Left",
        right: "Right"
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
        characterOptions: ['Муха', 'Муха'],
        up: "Вверх",
        down: "Вниз",
        left: "Влево",
        right: "Вправо"
    }
};

// إخفاء الشاشات غير الضرورية عند بدء التشغيل
function initializeScreens() {
    const scormWelcomeScreen = document.getElementById('scorm-welcome-screen');
    if (scormWelcomeScreen) scormWelcomeScreen.style.display = 'block';
    if (homeScreen) homeScreen.style.display = 'none';
    if (difficultyScreen) difficultyScreen.style.display = 'none';
    if (generalSettingsScreen) generalSettingsScreen.style.display = 'none';
    if (customSettingsScreen) customSettingsScreen.style.display = 'none';
    if (gameScreen) gameScreen.style.display = 'none';
    if (menuToggle) menuToggle.style.display = 'none';
    if (standaloneMenu) standaloneMenu.style.display = 'none';
}

// تشغيل شاشة البداية
const startGameBtn = document.getElementById('start-game');
if (startGameBtn) {
    startGameBtn.addEventListener('click', function() {
        const scormWelcomeScreen = document.getElementById('scorm-welcome-screen');
        if (scormWelcomeScreen) scormWelcomeScreen.style.display = 'none';
        if (homeScreen) homeScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'none';
    });
}

// تحميل الأصوات مع التعامل مع الأخطاء
function loadVoices() {
    try {
        availableVoices = speechSynthesis.getVoices();
        console.log("Available voices:", availableVoices.map(v => ({ name: v.name, lang: v.lang })));
        if (availableVoices.length === 0) {
            speechSynthesis.onvoiceschanged = () => {
                availableVoices = speechSynthesis.getVoices();
                console.log("Voices loaded after change:", availableVoices.map(v => ({ name: v.name, lang: v.lang })));
            };
        }
    } catch (error) {
        console.error("Error loading voices:", error);
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    localStorage.setItem('flyGameLanguage', currentLanguage);
    if (languageRu) languageRu.classList.toggle('active', lang === 'ru');
    if (languageEn) languageEn.classList.toggle('active', lang === 'en');
}

function updateLanguage() {
    const t = translations[currentLanguage];
    if (!t) {
        console.error(`Translation for language ${currentLanguage} not found`);
        return;
    }

    if (document.getElementById('title')) document.getElementById('title').textContent = t.title;
    if (playButton) playButton.textContent = t.play;
    if (settingsButton) settingsButton.textContent = t.settings;
    if (exitButton) exitButton.textContent = t.exit;
    if (document.getElementById('choose-difficulty')) document.getElementById('choose-difficulty').textContent = t.chooseDifficulty;
    if (easyButton) easyButton.textContent = t.easy;
    if (normalButton) normalButton.textContent = t.normal;
    if (hardButton) hardButton.textContent = t.hard;
    if (difficultySettingsButton) difficultySettingsButton.textContent = t.difficultySettings;
    if (document.getElementById('general-settings-title')) document.getElementById('general-settings-title').textContent = t.settingsTitle;
    if (document.getElementById('volume-label')) document.getElementById('volume-label').textContent = t.volume;
    if (document.getElementById('voice-label')) document.getElementById('voice-label').textContent = t.voice;
    if (document.getElementById('character-label')) document.getElementById('character-label').textContent = t.character;
    if (document.getElementById('speed-label')) document.getElementById('speed-label').textContent = t.speed;
    if (document.getElementById('steps-label')) document.getElementById('steps-label').textContent = t.steps;
    if (document.getElementById('grid-size-label')) document.getElementById('grid-size-label').textContent = t.gridSize;
    if (startSettingsButton) startSettingsButton.textContent = t.start;
    if (movesLeft) movesLeft.textContent = `${t.movesLeft}${totalMoves - currentMoveCount}`;
    if (currentMove) currentMove.textContent = t.flyWaiting;
    if (startGameButton) startGameButton.textContent = t.startGame;
    if (restartButton) restartButton.textContent = t.restart;
    if (resultMessage) resultMessage.textContent = '';

    voiceOptions = t.voiceOptions;
    characterOptions = t.characterOptions;

    // تحويل voiceGender لتتوافق مع اللغة
    if (currentLanguage === 'ru') {
        voiceGender = voiceGender === 'Male' ? 'Мужчина' : voiceGender === 'Female' ? 'Женщина' : voiceGender;
    } else {
        voiceGender = voiceGender === 'Мужчина' ? 'Male' : voiceGender === 'Женщина' ? 'Female' : voiceGender;
    }

    if (voiceValue) {
        voiceValue.textContent = voiceOptions[voiceOptions.indexOf(voiceGender) !== -1 ? voiceOptions.indexOf(voiceGender) : 0];
        voiceGender = voiceValue.textContent;
    }
    if (characterValue) {
        characterValue.textContent = characterOptions[characterOptions.indexOf(character) !== -1 ? characterOptions.indexOf(character) : 0];
        character = characterValue.textContent;
    }

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
    if (!grid) {
        console.error("Grid element not found");
        return;
    }
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
    if (targetCell) {
        const existingContent = targetCell.innerHTML.includes('fly-game') ? targetCell.innerHTML : '';
        targetCell.innerHTML = '<div class="target"></div>' + existingContent;
    }
}

function updateFly() {
    dots.forEach(cell => {
        cell.classList.remove('fly');
        const isFlyCell = cell.dataset.row == flyPosition.row && cell.dataset.col == flyPosition.col;
        const isTargetCell = cell.dataset.row == targetPosition.row && cell.dataset.col == targetPosition.col;
        if (isFlyCell && flyVisible) {
            const flyHTML = `<div class="fly-game"><img id="fly_image" src="fly2.png" alt="Fly"></div>`;
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
        moveQueue = [];
        let currentPosition = { row: Math.floor(gridSize / 2), col: Math.floor(gridSize / 2) };
        flyPosition = {...currentPosition };
        let movesGenerated = 0;

        while (movesGenerated < steps) {
            const directions = ['up', 'down', 'left', 'right'];
            let randomMove = directions[Math.floor(Math.random() * directions.length)];
            let tempPosition = {...currentPosition };
            let moveValid = true;

            switch (randomMove) {
                case 'up':
                    moveValid = tempPosition.row > 0;
                    if (moveValid) tempPosition.row--;
                    break;
                case 'down':
                    moveValid = tempPosition.row < gridSize - 1;
                    if (moveValid) tempPosition.row++;
                    break;
                case 'left':
                    moveValid = tempPosition.col > 0;
                    if (moveValid) tempPosition.col--;
                    break;
                case 'right':
                    moveValid = tempPosition.col < gridSize - 1;
                    if (moveValid) tempPosition.col++;
                    break;
            }

            if (moveValid) {
                moveQueue.push(randomMove);
                currentPosition = {...tempPosition };
                movesGenerated++;
            }
        }

        expectedFinalPosition = {...currentPosition };
        console.log("Move queue:", moveQueue);
        console.log("Initial position:", flyPosition);
        console.log("Expected final position:", expectedFinalPosition);

        currentMoveCount = 0;
        flyVisible = false;
        gameState = 'playing';
        isMoving = true;

        updateFly();
        executeNextMove();
    } catch (error) {
        console.error("Error generating path:", error);
        alert("Error generating path. Check console for details.");
        isMoving = false;
        gameState = 'start';
    }
}

function executeNextMove() {
    if (moveQueue.length === 0 || currentMoveCount >= totalMoves) {
        console.log("All moves completed, final flyPosition:", flyPosition, "expected:", expectedFinalPosition);
        flyPosition = {...expectedFinalPosition };
        flyVisible = false;
        updateFly();
        isMoving = false;
        gameState = 'waiting';
        if (currentMove) currentMove.style.display = 'block';
        if (currentMove) currentMove.textContent = translations[currentLanguage].whereIsFly;
        speechSynthesis.cancel();
        if (startGameButton) startGameButton.style.display = 'none';
        if (restartButton) restartButton.style.display = 'block';
        if (movesLeft) movesLeft.textContent = `${translations[currentLanguage].movesLeft}0`;
        return;
    }

    const nextMove = moveQueue.shift();
    console.log("Executing move:", nextMove, "Remaining moves:", moveQueue.length, "Current position:", flyPosition);
    let moveValid = true;

    switch (nextMove) {
        case 'up':
            if (flyPosition.row > 0) {
                flyPosition.row--;
                expectedFinalPosition.row = flyPosition.row;
            } else {
                moveValid = false;
            }
            break;
        case 'down':
            if (flyPosition.row < gridSize - 1) {
                flyPosition.row++;
                expectedFinalPosition.row = flyPosition.row;
            } else {
                moveValid = false;
            }
            break;
        case 'left':
            if (flyPosition.col > 0) {
                flyPosition.col--;
                expectedFinalPosition.col = flyPosition.col;
            } else {
                moveValid = false;
            }
            break;
        case 'right':
            if (flyPosition.col < gridSize - 1) {
                flyPosition.col++;
                expectedFinalPosition.col = flyPosition.col;
            } else {
                moveValid = false;
            }
            break;
    }

    if (moveValid) {
        currentMoveCount++;
        console.log("Current move count:", currentMoveCount, "New position:", flyPosition, "Expected:", expectedFinalPosition);
        if (movesLeft) movesLeft.textContent = `${translations[currentLanguage].movesLeft}${totalMoves - currentMoveCount}`;
        if (!soundOn && currentMove) currentMove.style.display = 'block';
        updateFly();

        if (soundOn) {
            const utterance = new SpeechSynthesisUtterance(translations[currentLanguage][nextMove]);
            utterance.lang = currentLanguage === 'ru' ? 'ru-RU' : 'en-US';
            utterance.volume = Math.min(1.0, volumeLevel / 50);

            let selectedVoice = null;
            if (currentLanguage === 'ru') {
                selectedVoice = availableVoices.find(voice =>
                    voice.lang === 'ru-RU' &&
                    (voiceGender === 'Мужчина' ?
                        voice.name.match(/male|pavel|google русский|yandex male/i) :
                        voice.name.match(/female|irina|google русская|yandex female/i)
                    )
                );
            } else {
                selectedVoice = availableVoices.find(voice =>
                    voice.lang === 'en-US' &&
                    (voiceGender === 'Male' ?
                        voice.name.match(/male|david|mark|google us english/i) :
                        voice.name.match(/female|zira|jenny|google us english female/i)
                    )
                );
            }

            if (!selectedVoice) {
                selectedVoice = availableVoices.find(voice => voice.lang === (currentLanguage === 'ru' ? 'ru-RU' : 'en-US')) || availableVoices[0];
                console.warn(`No matching voice for ${voiceGender} in ${currentLanguage}. Using fallback: ${selectedVoice ? selectedVoice.name : 'none'}`);
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                console.log(`Selected voice: ${selectedVoice.name} (${selectedVoice.lang})`);
            }

            utterance.onend = () => setTimeout(executeNextMove, moveDelay);
            utterance.onerror = (event) => {
                console.error("Speech error:", event.error);
                setTimeout(executeNextMove, moveDelay);
            };
            speechSynthesis.speak(utterance);
        } else {
            setTimeout(executeNextMove, moveDelay);
        }
    } else {
        console.log("Invalid move skipped:", nextMove, "Keeping position:", flyPosition);
        executeNextMove();
    }
}

function moveStepByStep() {
    if (isMoving || gameState !== 'start') return;
    isMoving = true;
    if (startGameButton) startGameButton.style.display = 'none';
    if (currentMove) currentMove.textContent = translations[currentLanguage].whereIsFly;
    if (currentMove) currentMove.style.display = 'block';
    gameState = 'playing';
    calculateRandomPath();
}

function handleCellClick(event) {
    if (gameState !== 'waiting' || isMoving) return;

    const clickedRow = parseInt(event.target.dataset.row);
    const clickedCol = parseInt(event.target.dataset.col);
    const t = translations[currentLanguage];

    dots.forEach(cell => cell.classList.remove('correct-cell', 'incorrect-cell'));

    if (clickedRow === expectedFinalPosition.row && clickedCol === expectedFinalPosition.col) {
        event.target.classList.add('correct-cell');
        flyPosition = {...expectedFinalPosition };
        flyVisible = true;
        if (resultMessage) resultMessage.textContent = t.correct;
        currentScore += 10;

        fetch('http://127.0.0.1:8000/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ score: currentScore })
        }).catch(error => console.error("Error sending score:", error));

        setRandomTargetPosition();
        updateTarget();
    } else {
        event.target.classList.add('incorrect-cell');
        const correctCell = dots[expectedFinalPosition.row * gridSize + expectedFinalPosition.col];
        if (correctCell) correctCell.classList.add('correct-cell');
        flyPosition = {...expectedFinalPosition };
        flyVisible = true;
        if (resultMessage) resultMessage.textContent = t.incorrect;
        totalMoves--;
        if (movesLeft) movesLeft.textContent = `${t.movesLeft}${totalMoves}`;
    }

    updateFly();
    if (resultMessage) resultMessage.style.display = 'block';
    if (restartButton) restartButton.style.display = 'block';
    if (startGameButton) startGameButton.style.display = 'none';
    if (currentMove) currentMove.textContent = t.flyWaiting;

    if (totalMoves <= 0) {
        gameState = 'ended';
    }
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

        switch (difficultyLevel) {
            case 'easy':
                gridSize = 3;
                totalMoves = Math.min(totalMoves, 100);
                break;
            case 'normal':
                gridSize = 4;
                totalMoves = Math.min(totalMoves, 100);
                break;
            case 'hard':
                gridSize = 5;
                totalMoves = Math.min(totalMoves, 100);
                break;
        }

        createGrid(gridSize, difficultyLevel);
        if (movesLeft) movesLeft.textContent = `${translations[currentLanguage].movesLeft}${totalMoves}`;
        if (currentMove) currentMove.textContent = translations[currentLanguage].flyWaiting;
        if (currentMove) currentMove.style.display = 'block';
        if (movesLeft) movesLeft.style.display = 'block';
        if (startGameButton) startGameButton.style.display = 'block';
        if (resultMessage) resultMessage.style.display = 'none';
        if (restartButton) restartButton.style.display = 'none';
        if (menuToggle) menuToggle.style.display = 'flex';
        if (standaloneMenu) standaloneMenu.style.display = 'none';

        if (difficultyScreen) difficultyScreen.style.display = 'none';
        if (generalSettingsScreen) generalSettingsScreen.style.display = 'none';
        if (customSettingsScreen) customSettingsScreen.style.display = 'none';
        if (gameScreen) gameScreen.style.display = 'block';
    } catch (error) {
        console.error("Error starting game:", error);
        alert("Error starting game. Check console for details.");
    }
}

function speak(text) {
    if (!soundOn || !window.speechSynthesis) {
        console.warn("Sound is off or speechSynthesis not supported");
        return;
    }

    const t = translations[currentLanguage];
    const translatedText = t[text] || text;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = currentLanguage === 'ru' ? 'ru-RU' : 'en-US';
    utterance.volume = Math.min(1.0, volumeLevel / 50);

    try {
        if (!availableVoices.length) {
            console.warn("No voices available, attempting to reload");
            loadVoices();
            return;
        }

        let selectedVoice = null;
        if (currentLanguage === 'ru') {
            selectedVoice = availableVoices.find(voice =>
                voice.lang === 'ru-RU' &&
                (voiceGender === 'Мужчина' ?
                    voice.name.match(/male|pavel|google русский|yandex male/i) :
                    voice.name.match(/female|irina|google русская|yandex female/i)
                )
            );
        } else {
            selectedVoice = availableVoices.find(voice =>
                voice.lang === 'en-US' &&
                (voiceGender === 'Male' ?
                    voice.name.match(/male|david|mark|google us english/i) :
                    voice.name.match(/female|zira|jenny|google us english female/i)
                )
            );
        }

        if (!selectedVoice) {
            selectedVoice = availableVoices.find(voice => voice.lang === (currentLanguage === 'ru' ? 'ru-RU' : 'en-US')) || availableVoices[0];
            console.warn(`No matching voice for ${voiceGender} in ${currentLanguage}. Using fallback: ${selectedVoice ? selectedVoice.name : 'none'}`);
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log(`Selected voice: ${selectedVoice.name} (${selectedVoice.lang})`);
        }

        utterance.onerror = (event) => console.error("Speech error:", event.error);
        speechSynthesis.speak(utterance);
    } catch (error) {
        console.error("Error in speak function:", error);
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
    gameState = 'start';
    currentMoveCount = 0;
    moveQueue = [];
    isMoving = false;
    flyVisible = true;
    startGame(difficultyLevel);
}

function showDifficultyScreen() {
    if (homeScreen) homeScreen.style.display = 'none';
    if (difficultyScreen) difficultyScreen.style.display = 'block';
    if (movesLeft) movesLeft.style.display = 'none';
    if (currentMove) currentMove.style.display = 'none';
    if (startGameButton) startGameButton.style.display = 'none';
    if (menuToggle) menuToggle.style.display = 'none';
    if (standaloneMenu) standaloneMenu.style.display = 'block';
}

function showGeneralSettingsScreen() {
    if (homeScreen) homeScreen.style.display = 'none';
    if (generalSettingsScreen) generalSettingsScreen.style.display = 'block';
    if (movesLeft) movesLeft.style.display = 'none';
    if (currentMove) currentMove.style.display = 'none';
    if (startGameButton) startGameButton.style.display = 'none';
    if (menuToggle) menuToggle.style.display = 'none';
    if (standaloneMenu) standaloneMenu.style.display = 'block';
}

function showCustomSettingsScreen() {
    if (difficultyScreen) difficultyScreen.style.display = 'none';
    if (customSettingsScreen) customSettingsScreen.style.display = 'block';
    if (gridSizeValue) gridSizeValue.textContent = `${gridSize}×${gridSize}`;
    if (stepsValue) stepsValue.textContent = totalMoves;
    if (movesLeft) movesLeft.style.display = 'none';
    if (currentMove) currentMove.style.display = 'none';
    if (startGameButton) startGameButton.style.display = 'none';
    if (menuToggle) menuToggle.style.display = 'none';
    if (standaloneMenu) standaloneMenu.style.display = 'block';
}

function goBack() {
    const currentScreen = document.querySelector('.screen:not([style*="display: none"])');
    if (currentScreen === difficultyScreen) {
        if (difficultyScreen) difficultyScreen.style.display = 'none';
        if (homeScreen) homeScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'none';
    } else if (currentScreen === generalSettingsScreen) {
        if (generalSettingsScreen) generalSettingsScreen.style.display = 'none';
        if (homeScreen) homeScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'none';
    } else if (currentScreen === customSettingsScreen) {
        if (customSettingsScreen) customSettingsScreen.style.display = 'none';
        if (difficultyScreen) difficultyScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'block';
    } else if (currentScreen === gameScreen) {
        if (gameScreen) gameScreen.style.display = 'none';
        if (difficultyScreen) difficultyScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'block';
    }
    if (movesLeft) movesLeft.style.display = 'none';
    if (currentMove) currentMove.style.display = 'none';
    if (startGameButton) startGameButton.style.display = 'none';
}

function applyGeneralSettings() {
    if (volumeValue) {
        volumeLevel = parseInt(volumeValue.value);
        if (volumeDisplay) volumeDisplay.textContent = `${volumeLevel}%`;
    }
    startGame('easy');
}

async function applyCustomSettings() {
    if (stepsValue) totalMoves = parseInt(stepsValue.textContent);
    if (gridSizeValue) {
        const gridSizeText = gridSizeValue.textContent;
        gridSize = parseInt(gridSizeText.split('×')[0]);
    }

    switch (gridSize) {
        case 3:
            flySpeed = 0.5;
            break;
        case 4:
            flySpeed = 1.0;
            break;
        case 5:
            flySpeed = 1.5;
            break;
    }
    if (speedValue) speedValue.value = flySpeed;
    if (speedDisplay) speedDisplay.textContent = `x${flySpeed}`;
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
            totalMoves = Math.min(totalMoves, 100);
            flySpeed = 0.5;
            break;
        case 'normal':
            gridSize = 4;
            totalMoves = Math.min(totalMoves, 100);
            flySpeed = 1.0;
            break;
        case 'hard':
            gridSize = 5;
            totalMoves = Math.min(totalMoves, 100);
            flySpeed = 1.5;
            break;
    }
    if (speedValue) speedValue.value = flySpeed;
    if (speedDisplay) speedDisplay.textContent = `x${flySpeed}`;
    if (stepsValue) stepsValue.textContent = totalMoves;
    if (gridSizeValue) gridSizeValue.textContent = `${gridSize}×${gridSize}`;
    moveDelay = 1000 / flySpeed;

    try {
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

        startGame(level);
    } catch (error) {
        console.error("Error setting difficulty or starting game:", error);
        alert("Error starting game. Check console for details.");
    }
}

function updateGeneralSettingsValues() {
    if (volumeValue && volumeDisplay) {
        volumeValue.addEventListener('input', () => {
            volumeLevel = parseInt(volumeValue.value);
            volumeDisplay.textContent = `${volumeLevel}%`;
        });
    }

    if (voiceValue) {
        const voiceDecrease = voiceValue.parentElement.querySelector('.decrease');
        const voiceIncrease = voiceValue.parentElement.querySelector('.increase');
        let voiceIndex = voiceOptions.indexOf(voiceGender);
        voiceValue.textContent = voiceOptions[voiceIndex] || voiceOptions[0];

        if (voiceDecrease) {
            voiceDecrease.addEventListener('click', () => {
                voiceIndex = (voiceIndex > 0) ? voiceIndex - 1 : voiceOptions.length - 1;
                voiceValue.textContent = voiceOptions[voiceIndex];
                voiceGender = voiceOptions[voiceIndex];
                if (currentLanguage === 'ru') {
                    voiceGender = voiceGender === 'Male' ? 'Мужчина' : voiceGender === 'Female' ? 'Женщина' : voiceGender;
                } else {
                    voiceGender = voiceGender === 'Мужчина' ? 'Male' : voiceGender === 'Женщина' ? 'Female' : voiceGender;
                }
                console.log(`Voice gender updated to: ${voiceGender}`);
            });
        }

        if (voiceIncrease) {
            voiceIncrease.addEventListener('click', () => {
                voiceIndex = (voiceIndex < voiceOptions.length - 1) ? voiceIndex + 1 : 0;
                voiceValue.textContent = voiceOptions[voiceIndex];
                voiceGender = voiceOptions[voiceIndex];
                if (currentLanguage === 'ru') {
                    voiceGender = voiceGender === 'Male' ? 'Мужчина' : voiceGender === 'Female' ? 'Женщина' : voiceGender;
                } else {
                    voiceGender = voiceGender === 'Мужчина' ? 'Male' : voiceGender === 'Женщина' ? 'Female' : voiceGender;
                }
                console.log(`Voice gender updated to: ${voiceGender}`);
            });
        }
    }

    if (characterValue) {
        const characterDecrease = characterValue.parentElement.querySelector('.decrease');
        const characterIncrease = characterValue.parentElement.querySelector('.increase');
        let characterIndex = characterOptions.indexOf(character);
        characterValue.textContent = characterOptions[characterIndex] || characterOptions[0];

        if (characterDecrease) {
            characterDecrease.addEventListener('click', () => {
                characterIndex = (characterIndex > 0) ? characterIndex - 1 : characterOptions.length - 1;
                characterValue.textContent = characterOptions[characterIndex];
                character = characterOptions[characterIndex];
            });
        }

        if (characterIncrease) {
            characterIncrease.addEventListener('click', () => {
                characterIndex = (characterIndex < characterOptions.length - 1) ? characterIndex + 1 : 0;
                characterValue.textContent = characterOptions[characterIndex];
                character = characterOptions[characterIndex];
            });
        }
    }
}

function updateCustomSettingsValues() {
    if (stepsValue) {
        const stepsDecrease = stepsValue.parentElement.querySelector('.decrease');
        const stepsIncrease = stepsValue.parentElement.querySelector('.increase');

        if (stepsDecrease) {
            stepsDecrease.addEventListener('click', () => {
                let steps = parseInt(stepsValue.textContent);
                steps = Math.max(1, steps - 1);
                stepsValue.textContent = steps;
                totalMoves = steps;
            });
        }

        if (stepsIncrease) {
            stepsIncrease.addEventListener('click', () => {
                let steps = parseInt(stepsValue.textContent);
                steps = Math.min(100, steps + 1);
                stepsValue.textContent = steps;
                totalMoves = steps;
            });
        }
    }

    if (gridSizeValue) {
        const gridSizeDecrease = gridSizeValue.parentElement.querySelector('.decrease');
        const gridSizeIncrease = gridSizeValue.parentElement.querySelector('.increase');
        let currentGridIndex = gridSizes.indexOf(gridSizeValue.textContent);

        if (gridSizeDecrease) {
            gridSizeDecrease.addEventListener('click', () => {
                currentGridIndex = Math.max(0, currentGridIndex - 1);
                gridSizeValue.textContent = gridSizes[currentGridIndex];
                gridSize = parseInt(gridSizes[currentGridIndex].split('×')[0]);
                if (stepsValue) stepsValue.textContent = Math.min(parseInt(stepsValue.textContent), 100);
                totalMoves = parseInt(stepsValue.textContent);
                flySpeed = gridSize === 3 ? 0.5 : gridSize === 4 ? 1.0 : 1.5;
                if (speedValue) speedValue.value = flySpeed;
                if (speedDisplay) speedDisplay.textContent = `x${flySpeed}`;
                moveDelay = 1000 / flySpeed;
            });
        }

        if (gridSizeIncrease) {
            gridSizeIncrease.addEventListener('click', () => {
                currentGridIndex = Math.min(gridSizes.length - 1, currentGridIndex + 1);
                gridSizeValue.textContent = gridSizes[currentGridIndex];
                gridSize = parseInt(gridSizes[currentGridIndex].split('×')[0]);
                if (stepsValue) stepsValue.textContent = Math.min(parseInt(stepsValue.textContent), 100);
                totalMoves = parseInt(stepsValue.textContent);
                flySpeed = gridSize === 3 ? 0.5 : gridSize === 4 ? 1.0 : 1.5;
                if (speedValue) speedValue.value = flySpeed;
                if (speedDisplay) speedDisplay.textContent = `x${flySpeed}`;
                moveDelay = 1000 / flySpeed;
            });
        }
    }
}

function loadSavedSettings() {
    const savedLanguage = localStorage.getItem('flyGameLanguage');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        if (languageRu) languageRu.classList.toggle('active', savedLanguage === 'ru');
        if (languageEn) languageEn.classList.toggle('active', savedLanguage === 'en');
    }
    updateLanguage();
}

function updateRulesLanguage(lang) {
    const t = translations[lang];
    if (rulesTitle) rulesTitle.textContent = t.rulesTitle;
    if (rulesText1) rulesText1.textContent = t.rulesText1;
    if (rulesText2) rulesText2.textContent = t.rulesText2;
    if (rulesText3) rulesText3.textContent = t.rulesText3;
}

function showRulesModal() {
    rulesLanguage = currentLanguage;
    updateRulesLanguage(rulesLanguage);
    if (rulesModal) rulesModal.style.display = 'flex';
}

function closeRulesModal() {
    if (rulesModal) rulesModal.style.display = 'none';
}

function toggleRulesLanguage(direction) {
    if (direction === 'next') {
        rulesLanguage = rulesLanguage === 'ru' ? 'en' : 'ru';
    } else {
        rulesLanguage = rulesLanguage === 'ru' ? 'en' : 'ru';
    }
    updateRulesLanguage(rulesLanguage);
}

// إضافة Event Listeners مع التحقق من وجود العناصر
if (playButton) playButton.addEventListener('click', showDifficultyScreen);
if (settingsButton) settingsButton.addEventListener('click', showGeneralSettingsScreen);
if (exitButton) exitButton.addEventListener('click', () => window.close());
if (easyButton) {
    easyButton.addEventListener('click', () => setDifficulty('easy'));
    easyButton.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (difficultyScreen) difficultyScreen.style.display = 'none';
        if (homeScreen) homeScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'none';
    });
}
if (normalButton) {
    normalButton.addEventListener('click', () => setDifficulty('normal'));
    normalButton.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (difficultyScreen) difficultyScreen.style.display = 'none';
        if (homeScreen) homeScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'none';
    });
}
if (hardButton) {
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    hardButton.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (difficultyScreen) difficultyScreen.style.display = 'none';
        if (homeScreen) homeScreen.style.display = 'block';
        if (menuToggle) menuToggle.style.display = 'none';
        if (standaloneMenu) standaloneMenu.style.display = 'none';
    });
}
if (difficultySettingsButton) difficultySettingsButton.addEventListener('click', showCustomSettingsScreen);
if (startSettingsButton) startSettingsButton.addEventListener('click', applyCustomSettings);
if (startGameButton) startGameButton.addEventListener('click', moveStepByStep);
if (restartButton) restartButton.addEventListener('click', restartGame);
if (languageRu) languageRu.addEventListener('click', () => setLanguage('ru'));
if (languageEn) languageEn.addEventListener('click', () => setLanguage('en'));
if (menuButton) menuButton.addEventListener('click', goBack);
if (menuButtonStandalone) menuButtonStandalone.addEventListener('click', goBack);
if (rulesButton) rulesButton.addEventListener('click', showRulesModal);
if (closeRules) closeRules.addEventListener('click', closeRulesModal);
if (rulesPrev) rulesPrev.addEventListener('click', () => toggleRulesLanguage('prev'));
if (rulesNext) rulesNext.addEventListener('click', () => toggleRulesLanguage('next'));

// تشغيل التهيئة
initializeScreens();
loadVoices();
updateGeneralSettingsValues();
updateCustomSettingsValues();
loadSavedSettings();