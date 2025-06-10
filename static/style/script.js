// const homeScreen = document.getElementById('home-screen');
// const difficultyScreen = document.getElementById('difficulty-screen');
// const customSettingsScreen = document.getElementById('custom-settings-screen');
// const gameScreen = document.getElementById('game-screen');
// const grid = document.getElementById('grid');
// const movesLeft = document.getElementById('moves-left');
// const currentMove = document.getElementById('current-move');
// const resultMessage = document.getElementById('result-message');
// const playButton = document.getElementById('play-button');
// const settingsButton = document.getElementById('settings-button');
// const exitButton = document.getElementById('exit-button');
// const easyButton = document.getElementById('easy-button');
// const normalButton = document.getElementById('normal-button');
// const hardButton = document.getElementById('hard-button');
// const customizeButton = document.getElementById('customize-button');
// const applySettingsButton = document.getElementById('apply-settings-button');
// const startGameButton = document.getElementById('start-game-button');
// const restartButton = document.getElementById('restart-button');
// const soundButton = document.getElementById('sound-button');
// const languageToggle = document.getElementById('language-toggle');
// const simplicityValue = document.getElementById('simplicity-value');
// const movesValue = document.getElementById('moves-value');
// const speedValue = document.getElementById('speed-value');

// let dots = [];
// let flyPosition = { row: 0, col: 0 };
// let targetPosition = { row: 0, col: 0 };
// let gameState = 'start';
// let totalMoves = 8;
// let currentMoveCount = 0;
// let moveDelay = 1000;
// let soundOn = true;
// let gridSize = 4;
// let autoMoveInterval = null;
// let isMoving = false;
// let currentLanguage = 'ru';
// let moveQueue = [];
// let flyVisible = true;
// let difficulty = 5;
// let flySpeed = 1.0;

// const translations = {
//     en: {
//         title: "Fly 2.0",
//         play: "Play",
//         settings: "Settings",
//         exit: "Exit",
//         chooseDifficulty: "Choose Difficulty",
//         easy: "Easy",
//         normal: "Normal",
//         hard: "Hard",
//         customize: "Customize",
//         settingsTitle: "Settings",
//         simplicity: "Simplicity:",
//         moves: "Numbers:",
//         speed: "Fly Speed:",
//         applySettings: "Apply",
//         movesLeft: "Moves Left: ",
//         currentMove: "Current Turn: ",
//         startGame: "Start",
//         restart: "Restart",
//         soundOn: "🔊",
//         soundOff: "🔇",
//         languageToggle: "RU / EN",
//         correct: "Correct!",
//         incorrect: "Incorrect!",
//     },
//     ru: {
//         title: "муха 2.0",
//         play: "Играть",
//         settings: "Настройки",
//         exit: "Выход",
//         chooseDifficulty: "Выберите сложность",
//         easy: "Легко",
//         normal: "Нормально",
//         hard: "Сложно",
//         customize: "Настроить",
//         settingsTitle: "Настройки",
//         simplicity: "Простота:",
//         moves: "Числа:",
//         speed: "Скорость мухи:",
//         applySettings: "Применить",
//         movesLeft: "Осталось ходов: ",
//         currentMove: "Текущий ход: ",
//         startGame: "Начать",
//         restart: "Рестарт",
//         soundOn: "🔊",
//         soundOff: "🔇",
//         languageToggle: "RU / EN",
//         correct: "Верно!",
//         incorrect: "Неверно!",
//     }
// };

// function toggleLanguage() {
//     currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
//     updateLanguage();
//     localStorage.setItem('flyGameLanguage', currentLanguage);
// }

// function updateLanguage() {
//     const t = translations[currentLanguage];
//     document.getElementById('title').textContent = t.title;
//     playButton.textContent = t.play;
//     settingsButton.textContent = t.settings;
//     exitButton.textContent = t.exit;
//     document.getElementById('choose-difficulty').textContent = t.chooseDifficulty;
//     easyButton.textContent = t.easy;
//     normalButton.textContent = t.normal;
//     hardButton.textContent = t.hard;
//     customizeButton.textContent = t.customize;
//     document.getElementById('settings-title').textContent = t.settingsTitle;
//     document.getElementById('simplicity-label').textContent = t.simplicity;
//     document.getElementById('moves-label').textContent = t.moves;
//     document.getElementById('speed-label').textContent = t.speed;
//     applySettingsButton.textContent = t.applySettings;
//     movesLeft.textContent = `${t.movesLeft}${totalMoves - currentMoveCount}`;
//     currentMove.textContent = t.currentMove;
//     startGameButton.textContent = t.startGame;
//     restartButton.textContent = t.restart;
//     soundButton.textContent = soundOn ? t.soundOn : t.soundOff;
//     languageToggle.textContent = t.languageToggle;
//     resultMessage.textContent = '';
// }

// function setRandomTargetPosition() {
//     let newRow, newCol;
//     do {
//         newRow = Math.floor(Math.random() * gridSize);
//         newCol = Math.floor(Math.random() * gridSize);
//     } while (newRow === flyPosition.row && newCol === flyPosition.col);
//     targetPosition = { row: newRow, col: newCol };
// }

// function createGrid(size) {
//     grid.innerHTML = '';
//     dots = [];
//     grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
//     grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

//     for (let row = 0; row < size; row++) {
//         for (let col = 0; col < size; col++) {
//             const cell = document.createElement('div');
//             cell.className = 'cell';
//             cell.dataset.row = row;
//             cell.dataset.col = col;
//             cell.addEventListener('click', handleCellClick);
//             grid.appendChild(cell);
//             dots.push(cell);
//         }
//     }

//     const centerRow = Math.floor(size / 2);
//     const centerCol = Math.floor(size / 2);
//     flyPosition = { row: centerRow, col: centerCol };
//     setRandomTargetPosition();
//     flyVisible = true;
//     updateTarget();
//     updateFly();
// }

// function updateTarget() {
//     dots.forEach(cell => {
//         const isTargetCell = cell.dataset.row == targetPosition.row && cell.dataset.col == targetPosition.col;
//         if (!isTargetCell) {
//             cell.innerHTML = cell.innerHTML.includes('fly-game') ? cell.innerHTML : '';
//         }
//     });

//     const targetCell = dots[targetPosition.row * gridSize + targetPosition.col];
//     const existingContent = targetCell.innerHTML.includes('fly-game') ? targetCell.innerHTML : '';
//     targetCell.innerHTML = '<div class="target"></div>' + existingContent;
// }

// function updateFly() {
//     dots.forEach(cell => {
//         const isTargetCell = cell.dataset.row == targetPosition.row && cell.dataset.col == targetPosition.col;
//         if (!isTargetCell) {
//             cell.innerHTML = cell.innerHTML.includes('target') ? cell.innerHTML : '';
//         }
//         cell.classList.remove('fly', 'correct-cell', 'incorrect-cell');
//     });

//     if (flyVisible) {
//         const flyCell = dots[flyPosition.row * gridSize + flyPosition.col];
//         const flyHTML = `<div class="fly-game"><img src="fly2.png" alt="Fly"></div>`;
//         const existingContent = flyCell.innerHTML.includes('target') ? flyCell.innerHTML : '';
//         flyCell.innerHTML = flyHTML + existingContent;
//         flyCell.classList.add('fly');
//     }
// }

// function calculateRandomPath() {
//     moveQueue = [];
//     let currentPos = {...flyPosition };
//     let steps = Math.floor(Math.random() * totalMoves) + 1;

//     for (let i = 0; i < steps; i++) {
//         const possibleMoves = [];
//         if (currentPos.row > 0) possibleMoves.push('up');
//         if (currentPos.row < gridSize - 1) possibleMoves.push('down');
//         if (currentPos.col > 0) possibleMoves.push('left');
//         if (currentPos.col < gridSize - 1) possibleMoves.push('right');

//         if (possibleMoves.length === 0) break;

//         const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
//         moveQueue.push(randomMove);

//         switch (randomMove) {
//             case 'up':
//                 currentPos.row--;
//                 break;
//             case 'down':
//                 currentPos.row++;
//                 break;
//             case 'left':
//                 currentPos.col--;
//                 break;
//             case 'right':
//                 currentPos.col++;
//                 break;
//         }
//     }
// }

// function moveStepByStep() {
//     if (isMoving || gameState !== 'playing') return;

//     isMoving = true;
//     startGameButton.style.display = 'none';
//     calculateRandomPath();

//     function executeNextMove() {
//         if (gameState !== 'playing' || moveQueue.length === 0) {
//             flyVisible = false;
//             updateFly();
//             checkTarget();
//             isMoving = false;
//             return;
//         }

//         const nextMove = moveQueue.shift();
//         const prevPosition = {...flyPosition };

//         switch (nextMove) {
//             case 'up':
//                 if (flyPosition.row > 0) flyPosition.row--;
//                 break;
//             case 'down':
//                 if (flyPosition.row < gridSize - 1) flyPosition.row++;
//                 break;
//             case 'left':
//                 if (flyPosition.col > 0) flyPosition.col--;
//                 break;
//             case 'right':
//                 if (flyPosition.col < gridSize - 1) flyPosition.col++;
//                 break;
//         }

//         currentMoveCount++;
//         movesLeft.textContent = `${translations[currentLanguage].movesLeft}${totalMoves - currentMoveCount}`;
//         currentMove.textContent = `${translations[currentLanguage].currentMove}${nextMove} ${currentMoveCount}`;
//         if (!soundOn) currentMove.style.display = 'block';

//         updateFly();
//         setTimeout(executeNextMove, moveDelay);
//     }

//     executeNextMove();
// }

// function checkTarget() {
//     flyVisible = true;
//     updateFly();

//     const flyCell = dots[flyPosition.row * gridSize + flyPosition.col];
//     const t = translations[currentLanguage];

//     if (flyPosition.row === targetPosition.row && flyPosition.col === targetPosition.col) {
//         flyCell.classList.add('correct-cell');
//         resultMessage.textContent = t.correct;
//         setRandomTargetPosition();
//         updateTarget();
//     } else {
//         flyCell.classList.add('incorrect-cell');
//         resultMessage.textContent = t.incorrect;
//         totalMoves--;
//         movesLeft.textContent = `${t.movesLeft}${totalMoves}`;
//     }

//     resultMessage.style.display = 'block';
//     restartButton.style.display = 'block';

//     if (totalMoves <= 0) {
//         gameState = 'ended';
//     }
// }

// function handleCellClick(event) {}

// function toggleSound() {
//     soundOn = !soundOn;
//     const t = translations[currentLanguage];
//     soundButton.textContent = soundOn ? t.soundOn : t.soundOff;
//     currentMove.style.display = soundOn ? 'none' : 'block';
//     localStorage.setItem('flyGameSound', soundOn);
// }

// function startGame() {
//     gameState = 'playing';
//     currentMoveCount = 0;
//     flyVisible = true;
//     isMoving = false;
//     moveQueue = [];

//     createGrid(gridSize);
//     movesLeft.textContent = `${translations[currentLanguage].movesLeft}${totalMoves}`;
//     currentMove.textContent = translations[currentLanguage].currentMove;
//     currentMove.style.display = soundOn ? 'none' : 'block';
//     resultMessage.style.display = 'none';
//     startGameButton.style.display = 'block';
//     restartButton.style.display = 'none';

//     difficultyScreen.style.display = 'none';
//     gameScreen.style.display = 'block';
// }

// function restartGame() {
//     startGame();
// }

// function showDifficultyScreen() {
//     homeScreen.style.display = 'none';
//     difficultyScreen.style.display = 'block';
// }

// function showCustomSettingsScreen() {
//     difficultyScreen.style.display = 'none';
//     customSettingsScreen.style.display = 'block';
// }

// function applyCustomSettings() {
//     difficulty = parseInt(simplicityValue.textContent);
//     totalMoves = parseInt(movesValue.textContent);
//     flySpeed = parseFloat(speedValue.textContent);
//     moveDelay = 1000 / flySpeed;
//     gridSize = totalMoves > 10 ? 6 : totalMoves > 5 ? 4 : 3;
//     startGame();
// }

// function setDifficulty(level) {
//     switch (level) {
//         case 'easy':
//             difficulty = 3;
//             totalMoves = 5;
//             flySpeed = 0.5;
//             gridSize = 3;
//             break;
//         case 'normal':
//             difficulty = 5;
//             totalMoves = 8;
//             flySpeed = 1.0;
//             gridSize = 4;
//             break;
//         case 'hard':
//             difficulty = 7;
//             totalMoves = 12;
//             flySpeed = 1.5;
//             gridSize = 6;
//             break;
//     }
//     moveDelay = 1000 / flySpeed;
//     startGame();
// }

// function updateSettingsValues() {
//     document.querySelectorAll('.setting-controls').forEach(control => {
//         const decreaseBtn = control.querySelector('.decrease');
//         const increaseBtn = control.querySelector('.increase');
//         const valueSpan = control.querySelector('span');

//         decreaseBtn.addEventListener('click', () => {
//             let value;
//             if (valueSpan.id === 'speed-value') {
//                 value = parseFloat(valueSpan.textContent);
//                 value = Math.max(0.1, value - 0.1);
//                 valueSpan.textContent = value.toFixed(1);
//             } else {
//                 value = parseInt(valueSpan.textContent);
//                 value = Math.max(1, value - 1);
//                 valueSpan.textContent = value;
//             }
//         });

//         increaseBtn.addEventListener('click', () => {
//             let value;
//             if (valueSpan.id === 'speed-value') {
//                 value = parseFloat(valueSpan.textContent);
//                 value = Math.min(2.0, value + 0.1);
//                 valueSpan.textContent = value.toFixed(1);
//             } else {
//                 value = parseInt(valueSpan.textContent);
//                 value = Math.min(10, value + 1);
//                 valueSpan.textContent = value;
//             }
//         });
//     });
// }

// function loadSavedSettings() {
//     const savedLanguage = localStorage.getItem('flyGameLanguage');
//     if (savedLanguage) currentLanguage = savedLanguage;

//     soundOn = localStorage.getItem('flyGameSound') !== 'false';
//     soundButton.textContent = soundOn ? translations[currentLanguage].soundOn : translations[currentLanguage].soundOff;

//     updateLanguage();
// }

// playButton.addEventListener('click', showDifficultyScreen);
// settingsButton.addEventListener('click', showCustomSettingsScreen);
// exitButton.addEventListener('click', () => window.close());
// easyButton.addEventListener('click', () => setDifficulty('easy'));
// normalButton.addEventListener('click', () => setDifficulty('normal'));
// hardButton.addEventListener('click', () => setDifficulty('hard'));
// customizeButton.addEventListener('click', showCustomSettingsScreen);
// applySettingsButton.addEventListener('click', applyCustomSettings);
// startGameButton.addEventListener('click', moveStepByStep);
// restartButton.addEventListener('click', restartGame);
// soundButton.addEventListener('click', toggleSound);
// languageToggle.addEventListener('click', toggleLanguage);

// loadSavedSettings();
// homeScreen.style.display = 'block';
// difficultyScreen.style.display = 'none';
// customSettingsScreen.style.display = 'none';
// gameScreen.style.display = 'none';
// updateSettingsValues();