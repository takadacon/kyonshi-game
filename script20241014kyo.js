const player = document.getElementById("player");
const kyonshi = document.getElementById("kyonshi");
const gameArea = document.getElementById("gameArea");
const message = document.getElementById("message");

let isJumping = false;
let playerPosition = 0;
let kyonshiPosition = gameArea.offsetWidth; // キョンシーの初期位置を右端に設定
let gravity = 0.9;
let score = 0; // スコアをカウントする変数
let kyonshiSpeed = 3; // キョンシーのスピード
let isKyonshiMoving = true; // キョンシーが動いているかどうか
let isKyonshiJumping = false; // キョンシーがジャンプ中かどうか

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

// キョンシーのジャンプ処理
function kyonshiJump() {
    if (!isKyonshiJumping) {
        isKyonshiJumping = true;
        let kyonshiJumpHeight = 100;
        let kyonshiPositionY = 0;
        let kyonshiJumpInterval = setInterval(() => {
            if (kyonshiPositionY >= kyonshiJumpHeight) {
                clearInterval(kyonshiJumpInterval);
                // キョンシーが落下する処理
                let kyonshiFallInterval = setInterval(() => {
                    if (kyonshiPositionY <= 0) {
                        clearInterval(kyonshiFallInterval);
                        kyonshiPositionY = 0;
                        kyonshi.style.bottom = `${kyonshiPositionY}px`;
                        isKyonshiJumping = false;
                    } else {
                        kyonshiPositionY -= 5 * gravity;
                        kyonshi.style.bottom = `${kyonshiPositionY}px`;
                    }
                }, 20);
            } else {
                kyonshiPositionY += 5;
                kyonshi.style.bottom = `${kyonshiPositionY}px`;
            }
        }, 20);
    }
}

// キョンシーの移動処理
function moveKyonshi() {
    let direction = -1; // 右から左へ移動
    let kyonshiInterval = setInterval(() => {
        if (isKyonshiMoving) {
            kyonshiPosition += kyonshiSpeed * direction;
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
        }
    }, 20);
}

// キョンシーをランダムに停止し、巨大化＆ジャンプさせる
function randomStopAndStart() {
    setInterval(() => {
        isKyonshiMoving = false; // 一時停止
        kyonshi.style.transform = 'scale(2)'; // キョンシーを巨大化
        kyonshiJump(); // キョンシーをジャンプさせる

        let stopDuration = Math.random() * 2000 + 1000; // 1秒から3秒間停止
        setTimeout(() => {
            isKyonshiMoving = true; // 再び動き出す
            kyonshi.style.transform = 'scale(1)'; // 元のサイズに戻す
            kyonshi.style.bottom = '0'; // キョンシーの位置を元に戻す
        }, stopDuration);
    }, Math.random() * 3000 + 5000); // 5秒から8秒の間隔でランダムに停止
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
randomStopAndStart();
