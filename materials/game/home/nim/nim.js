// --- DOM要素の取得 ---
const backToTitleButton = document.getElementById('back-to-title-button');
const pilesContainer = document.getElementById('nim-piles-container');
const takeStonesButton = document.getElementById('take-stones-button');
const pileIndexInput = document.getElementById('pile-index-input');
const stonesToTakeInput = document.getElementById('stones-to-take-input');
const gameMessage = document.getElementById('game-message');

// --- ゲームの状態を管理する変数 ---
let piles;
let currentPlayer = 1;

// URLパラメータから初期の石の数を取得して設定する
const urlParams = new URLSearchParams(window.location.search);
const pilesParam = urlParams.get('piles'); // '5,7,3'のような文字列が取れる

if (pilesParam) {
    // カンマで区切って文字列の配列にし、それぞれを数値に変換する
    piles = pilesParam.split(',').map(s => parseInt(s, 10));
} else {
    // パラメータがなければ、デフォルト値で開始
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

// --- 初期化処理 ---
renderPiles();
gameMessage.textContent = `プレイヤー${currentPlayer}のターンです。`;