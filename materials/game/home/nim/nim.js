// 「タイトルへ戻る」ボタンの要素を取得
const backToTitleButton = document.getElementById('back-to-title-button');

// ボタンがクリックされたら、index.htmlにページ遷移する
backToTitleButton.addEventListener('click', () => {
    // 一つ上の階層のindex.htmlに戻る
    window.location.href = '../index.html';
});

// (ここにNimのゲームロジックを書いていく)