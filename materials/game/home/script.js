// HTMLから 'start-nim-button' というIDを持つ要素(ボタン)を探してくる
const nimButton = document.getElementById('start-nim-button');

// ボタンがクリックされたら、nim.htmlにページ遷移する
nimButton.addEventListener('click', () => {
    window.location.href = 'nim/start.html';
});