import { findWinningMove, getXorDetails } from './nim-logic.js';

// --- DOM要素の取得 ---
const pileCountInput = document.getElementById('pile-count-input');
const stoneCountsContainer = document.getElementById('stone-counts-container');
const startGameButton = document.getElementById('start-game-button');
const backToTitleButton = document.getElementById('back-to-title-button');
const pilesContainer = document.getElementById('nim-piles-container');
const showHintButton = document.getElementById('show-hint-button');
const hideHintButton = document.getElementById('hide-hint-button');
const hintOverlay = document.getElementById('hint-overlay');
const hintMessage = document.getElementById('hint-message');
const showXorButton = document.getElementById('show-xor-button');
const xorDetails = document.getElementById('xor-details');

/**
 * 現在の入力値を取得する関数
 */
function getCurrentPilesFromInputs() {
    const inputs = document.querySelectorAll('.stone-count-input');
    return Array.from(inputs).map(input => parseInt(input.value) || 0);
}

/**
 * 入力欄の値を元に、石のプレビューを描画する関数
 */
function renderPreviewPiles() {
    pilesContainer.innerHTML = '';
    const inputs = document.querySelectorAll('.stone-count-input');

    inputs.forEach(input => {
        const stoneCount = parseInt(input.value) || 0;
        
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
 * 山の数に応じて、石の数を設定する入力欄を生成する関数
 */
function createStoneCountInputs() {
    stoneCountsContainer.innerHTML = '';
    const pileCount = parseInt(pileCountInput.value);

    for (let i = 1; i <= pileCount; i++) {
        const label = document.createElement('label');
        label.textContent = `山${i}: `;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'stone-count-input';
        input.value = '5';
        input.min = '1';
        
        input.addEventListener('input', renderPreviewPiles);
        
        label.appendChild(input);
        stoneCountsContainer.appendChild(label);
    }
    
    renderPreviewPiles();
}

// --- イベントリスナー ---
pileCountInput.addEventListener('change', createStoneCountInputs);

backToTitleButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

startGameButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.stone-count-input');
    const stoneCounts = [];
    
    inputs.forEach(input => {
        stoneCounts.push(input.value);
    });
    
    const pilesParam = stoneCounts.join(',');
    window.location.href = `nim.html?piles=${pilesParam}`;
});

showHintButton.addEventListener('click', () => {
    const move = findWinningMove(getCurrentPilesFromInputs());
    // start.js 用のメッセージ調整
    if (move.message.includes('必勝手はありません')) {
        hintMessage.textContent = "現在、後手必勝の局面です。このまま始めると2番目のプレイヤーが有利です。";
    } else {
        hintMessage.textContent = move.message.replace('取ります', 'に変更すると後手必勝になります');
    }

    document.body.classList.add('hint-mode');
    hintOverlay.classList.remove('hidden');
    xorDetails.textContent = '';
});

hideHintButton.addEventListener('click', () => {
    document.body.classList.remove('hint-mode');
    hintOverlay.classList.add('hidden');
});

showXorButton.addEventListener('click', () => {
    xorDetails.textContent = getXorDetails(getCurrentPilesFromInputs());
});

// --- 初期化処理 ---
createStoneCountInputs();