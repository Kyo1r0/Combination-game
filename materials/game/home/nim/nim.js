import { findWinningMove, getXorDetails } from './nim-logic.js';

// --- DOM要素の取得 ---
const backToTitleButton = document.getElementById('back-to-title-button');
const pilesContainer = document.getElementById('nim-piles-container');
const takeStonesButton = document.getElementById('take-stones-button');
const pileIndexInput = document.getElementById('pile-index-input');
const stonesToTakeInput = document.getElementById('stones-to-take-input');
const gameMessage = document.getElementById('game-message');
const undoButton = document.getElementById('undo-button');
const showHintButton = document.getElementById('show-hint-button');
const hideHintButton = document.getElementById('hide-hint-button');
const hintOverlay = document.getElementById('hint-overlay');
const hintMessage = document.getElementById('hint-message');
const showXorButton = document.getElementById('show-xor-button');
const xorDetails = document.getElementById('xor-details');

// --- ゲームの状態を管理する変数 ---
let piles;
let currentPlayer = 1;
const history = [];

// URLパラメータから初期の石の数を取得して設定する
const urlParams = new URLSearchParams(window.location.search);
const pilesParam = urlParams.get('piles');

if (pilesParam) {
    piles = pilesParam.split(',').map(s => parseInt(s, 10));
} else {
    piles = [3, 4, 5];
}

/**
 * 現在のpiles配列の状態を元に、画面に石を描画する関数
 */
function renderPiles() {
    pilesContainer.innerHTML = '';
    piles.forEach((stoneCount, index) => {
        const pileDiv = document.createElement('div');
        pileDiv.classList.add('pile');
        for (let i = 0; i < stoneCount; i++) {
            const stoneDiv = document.createElement('div');
            stoneDiv.classList.add('stone');
            pileDiv.appendChild(stoneDiv);
        }
        pilesContainer.appendChild(pileDiv);
    });
}

/**
 * ゲームの勝利条件をチェックする関数
 */
function checkWinCondition() {
    const isGameOver = piles.every(stoneCount => stoneCount === 0);
    if (isGameOver) {
        gameMessage.textContent = `プレイヤー${currentPlayer}の勝ちです！`;
        pileIndexInput.disabled = true;
        stonesToTakeInput.disabled = true;
        takeStonesButton.disabled = true;
        undoButton.disabled = true;
    }
    return isGameOver;
}

// --- イベントリスナー ---
backToTitleButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

takeStonesButton.addEventListener('click', () => {
    const pileIndex = parseInt(pileIndexInput.value) - 1;
    const stonesToTake = parseInt(stonesToTakeInput.value);

    if (isNaN(pileIndex) || isNaN(stonesToTake) || stonesToTake < 1) {
        gameMessage.textContent = '正しい数値を入力してください。';
        return;
    }
    if (pileIndex < 0 || pileIndex >= piles.length) {
        gameMessage.textContent = '存在しない山の番号です。';
        return;
    }
    if (stonesToTake > piles[pileIndex]) {
        gameMessage.textContent = '山にある石の数より多くは取れません。';
        return;
    }

    history.push({
        piles: [...piles],
        player: currentPlayer
    });

    piles[pileIndex] -= stonesToTake;
    renderPiles();

    const gameHasEnded = checkWinCondition();

    if (!gameHasEnded) {
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        gameMessage.textContent = `プレイヤー${currentPlayer}のターンです。`;
    }

    pileIndexInput.value = '';
    stonesToTakeInput.value = '';
});

undoButton.addEventListener('click', () => {
    if (history.length === 0) {
        gameMessage.textContent = 'これ以上は戻れません。';
        return;
    }

    const lastState = history.pop();
    
    piles = lastState.piles;
    currentPlayer = lastState.player;

    renderPiles();
    gameMessage.textContent = `プレイヤー${currentPlayer}のターンです。`;

    pileIndexInput.disabled = false;
    stonesToTakeInput.disabled = false;
    takeStonesButton.disabled = false;
    undoButton.disabled = false;
});

showHintButton.addEventListener('click', () => {
    const move = findWinningMove(piles);
    hintMessage.textContent = move.message;
    
    document.body.classList.add('hint-mode');
    hintOverlay.classList.remove('hidden');
    xorDetails.textContent = '';
});

hideHintButton.addEventListener('click', () => {
    document.body.classList.remove('hint-mode');
    hintOverlay.classList.add('hidden');
});

showXorButton.addEventListener('click', () => {
    xorDetails.textContent = getXorDetails(piles);
});

// --- 初期化処理 ---
renderPiles();
gameMessage.textContent = `プレイヤー${currentPlayer}のターンです。`;