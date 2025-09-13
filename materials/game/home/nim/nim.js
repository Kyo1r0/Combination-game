// --- DOM要素の取得 ---
const backToTitleButton = document.getElementById('back-to-title-button');
const pilesContainer = document.getElementById('nim-piles-container');

// --- ゲームの状態を管理する変数 ---
// 例：[3, 4, 5] は、3個、4個、5個の石の山がそれぞれある状態を示す
let piles = [1,1,1];
let currentPlayer = 1; // ★★★ どちらのプレイヤーの番か (1 or 2)

/**
 * 現在のpiles配列の状態を元に、画面に石を描画する関数
 */
function renderPiles() {
    // 一旦、石の表示をすべて消去する
    pilesContainer.innerHTML = '';

    // piles配列の各要素（山の石の数）に対して処理を行う
    piles.forEach((stoneCount, index) => {
        // 1つの山を表すdiv要素を作成
        const pileDiv = document.createElement('div');
        pileDiv.classList.add('pile');

        // 石の数だけ、石の要素を作成して山に追加する
        for (let i = 0; i < stoneCount; i++) {
            const stoneDiv = document.createElement('div');
            stoneDiv.classList.add('stone');
            pileDiv.appendChild(stoneDiv);
        }

        // 完成した山をコンテナに追加
        pilesContainer.appendChild(pileDiv);
    });
}

/**
 * ★★★ ゲームの勝利条件をチェックする関数 ★★★
 */
function checkWinCondition() {
    // 全ての山の石が0個になったかチェック
    const isGameOver = piles.every(stoneCount => stoneCount === 0);

    if (isGameOver) {
        // 石を取り終えたプレイヤーが勝利
        gameMessage.textContent = `プレイヤー${currentPlayer}の勝ちです！`;
        // 操作ができないように入力欄とボタンを無効化
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

// --- 初期化処理 ---
// ページが読み込まれたら、最初の石を描画する
renderPiles();


// --- DOM要素の取得 (追加) ---
const takeStonesButton = document.getElementById('take-stones-button');
const pileIndexInput = document.getElementById('pile-index-input');
const stonesToTakeInput = document.getElementById('stones-to-take-input');
const gameMessage = document.getElementById('game-message');

// 「石を取る」ボタンがクリックされた時の処理
// 「石を取る」ボタンがクリックされた時の処理
takeStonesButton.addEventListener('click', () => {
    // 入力値を取得 (文字列なので数値に変換)
    const pileIndex = parseInt(pileIndexInput.value) - 1; // 配列は0からなので-1する
    const stonesToTake = parseInt(stonesToTakeInput.value);

    // --- 入力値のバリデーション(妥当性チェック) ---
    if (isNaN(pileIndex) || isNaN(stonesToTake) || stonesToTake < 1) {
        gameMessage.textContent = '正しい数値を入力してください。';
        return; // 処理を中断
    }
    if (pileIndex < 0 || pileIndex >= piles.length) {
        gameMessage.textContent = '存在しない山の番号です。';
        return; // 処理を中断
    }
    if (stonesToTake > piles[pileIndex]) {
        gameMessage.textContent = '山にある石の数より多くは取れません。';
        return; // 処理を中断
    }

    // --- 処理が妥当な場合 ---
    piles[pileIndex] -= stonesToTake;
    renderPiles();

    // ★★★ 勝利判定を行う ★★★
    const gameHasEnded = checkWinCondition();

    // ★★★ ゲームが続いていれば、プレイヤーを交代する ★★★
    if (!gameHasEnded) {
        // 現在のプレイヤーが1なら2に、2なら1にする
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        // メッセージを更新
        gameMessage.textContent = `プレイヤー${currentPlayer}のターンです。`;
    }
    // 勝利していた場合は、checkWinCondition()の中でメッセージが設定される

    // 入力欄を空にする
    pileIndexInput.value = '';
    stonesToTakeInput.value = '';
});