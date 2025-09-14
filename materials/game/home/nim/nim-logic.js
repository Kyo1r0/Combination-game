/**
 * 渡されたpiles配列を元に、必勝手を計算して返す
 * @param {number[]} piles - 石の山の状態を表す配列
 * @returns {object} - 計算結果のメッセージや情報を含むオブジェクト
 */
export function findWinningMove(piles) {
    const nimSum = piles.reduce((sum, count) => sum ^ count, 0);

    if (nimSum === 0) {
        return { message: "必勝手はありません。相手のミスを待ちましょう。" };
    }

    for (let i = 0; i < piles.length; i++) {
        const target = piles[i] ^ nimSum;
        if (target < piles[i]) {
            const stonesToTake = piles[i] - target;
            return {
                message: `山${i + 1} から ${stonesToTake}個 の石を取ります。`,
            };
        }
    }
}

/**
 * 渡されたpiles配列を元に、Nim和（XOR計算）の詳細な文字列を生成して返す
 * @param {number[]} piles - 石の山の状態を表す配列
 * @returns {string} - 表示用の詳細文字列
 */
export function getXorDetails(piles) {
    const nimSum = piles.reduce((sum, count) => sum ^ count, 0);
    let details = "各山の石の数を2進数で表し、桁ごとに足し算（XOR）します。\n\n";
    piles.forEach((count, i) => {
        details += `山${i + 1} (${count.toString().padStart(2, ' ')}) = ${count.toString(2).padStart(8, '0')}\n`;
    });
    details += "--------------------------\n";
    details += `Nim和 (${nimSum.toString().padStart(2, ' ')}) = ${nimSum.toString(2).padStart(8, '0')}\n\n`;
    details += "Nim和が0の局面を作って相手に渡すのが必勝法です。";
    return details;
}