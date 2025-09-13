// --- DOM要素の取得 ---
const pileCountInput = document.getElementById('pile-count-input');
const stoneCountsContainer = document.getElementById('stone-counts-container');
const startGameButton = document.getElementById('start-game-button');
const backToTitleButton = document.getElementById('back-to-title-button');

/**
 * 山の数に応じて、石の数を設定する入力欄を生成する関数
 */
function createStoneCountInputs() {
    // いったんコンテナを空にする
    stoneCountsContainer.innerHTML = '';
    
    // 現在の山の数の値を取得
    const pileCount = parseInt(pileCountInput.value);

    // 山の数だけ入力欄を作成する
    for (let i = 1; i <= pileCount; i++) {
        const label = document.createElement('label');
        label.textContent = `山${i}: `;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'stone-count-input'; // CSSやJSで識別するためのクラス名
        input.value = '5'; // 初期値
        input.min = '1';
        
        label.appendChild(input);
        stoneCountsContainer.appendChild(label);
    }
}

// --- イベントリスナー ---

// 「山の数」の入力欄の値が変わったら、石の数の入力欄を再生成
pileCountInput.addEventListener('change', createStoneCountInputs);

// 「タイトルへ戻る」ボタンの処理
backToTitleButton.addEventListener('click', () => {
    window.location.href = '../index.html';
});

// 「この設定でゲーム開始」ボタンの処理
startGameButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.stone-count-input');
    const stoneCounts = [];
    
    // 各入力欄の値を取得して配列に格納
    inputs.forEach(input => {
        stoneCounts.push(input.value);
    });
    
    // 配列をカンマ区切りの文字列に変換 (例: "5,7,3")
    const pilesParam = stoneCounts.join(',');
    
    // URLにパラメータを付けてnim.htmlに遷移
    window.location.href = `nim.html?piles=${pilesParam}`;
});


// --- 初期化処理 ---
// ページ読み込み時に、最初の入力欄を生成
createStoneCountInputs();