const player = document.getElementById("player");
const kyonshi = document.getElementById("kyonshi");
const gameArea = document.getElementById("gameArea");
const message = document.getElementById("message");

let isJumping = false;
let playerPosition = 0;
let kyonshiPosition = gameArea.offsetWidth; // キョンシーの初期位置を右端に設定
let gravity = 0.9;
let score = 0; // スコアをカウントする変数

// ジャンプ処理
function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 150;
        let jumpInterval = setInterval(() => {
            if (playerPosition >= jumpHeight) {
                clearInterval(jumpInterval);
                // 落下処理
                let fallInterval = setInterval(() => {
                    if (playerPosition <= 0) {
                        clearInterval(fallInterval);
                        playerPosition = 0;
                        player.style.bottom = `${playerPosition}px`;
                        isJumping = false;
                    } else {
                        playerPosition -= 5 * gravity;
                        player.style.bottom = `${playerPosition}px`;
                    }
                }, 20);
            } else {
                playerPosition += 5;
                player.style.bottom = `${playerPosition}px`;
            }
        }, 20);
    }
}

// キョンシーの移動処理
function moveKyonshi() {
    let kyonshiSpeed = 3;
    let kyonshiInterval = setInterval(() => {
        kyonshiPosition -= kyonshiSpeed;
        kyonshi.style.left = `${kyonshiPosition}px`;

        // キョンシーが画面の外に出たらリセット（右端に戻す）
        if (kyonshiPosition < -50) {
            kyonshiPosition = gameArea.offsetWidth;
            kyonshiSpeed += 0.5;  // 少しずつスピードアップ
            score++; // スコアを加算
            message.textContent = `スコア: ${score}`; // スコアを更新
        }

        // 当たり判定
        if (kyonshiPosition < 50 && playerPosition < 50 && kyonshiPosition > 0) {
            clearInterval(kyonshiInterval);
            message.textContent = "ゲームオーバー！リロードして再挑戦してください";
        }
    }, 20);
}

// ジャンプイベントリスナー（スペースキーでジャンプ）
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

// ジャンプイベントリスナー（クリックでジャンプ）
document.addEventListener("click", () => {
    jump();
});

// ゲーム開始
moveKyonshi();
