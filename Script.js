const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
const resultText = document.getElementById("result");

let ball, keeper;
let animation;

function reset() {
    ball = {
        x: 400,
        y: 420,
        vx: 0,
        vy: 0,
        radius: 8
    };

    keeper = {
        x: 400,
        y: 80,
        width: 60,
        height: 15,
        direction: Math.random() < 0.33 ? -1 : Math.random() < 0.66 ? 1 : 0
    };

    resultText.textContent = "";
}

function shoot() {
    reset();

    const power = document.getElementById("power").value;
    const spin = document.getElementById("spin").value;

    // Zufällige Schussrichtung
    const angle = (Math.random() * 0.6 - 0.3);

    ball.vx = angle * power;
    ball.vy = -power;

    keeper.vx = keeper.direction * 4;

    cancelAnimationFrame(animation);
    animate(spin);
}

function animate(spin) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ballbewegung
    ball.vy += 0.05;       // leichter Luftwiderstand
    ball.vx += spin * 0.01;

    ball.x += ball.vx;
    ball.y += ball.vy;

    // Torwartbewegung
    keeper.x += keeper.vx;
    keeper.x = Math.max(350, Math.min(450, keeper.x));

    drawGoal();
    drawBall();
    drawKeeper();

    // Torlinie
    if (ball.y < 100) {
        checkResult();
        return;
    }

    animation = requestAnimationFrame(() => animate(spin));
}

function checkResult() {
    if (
        ball.x > keeper.x - keeper.width / 2 &&
        ball.x < keeper.x + keeper.width / 2
    ) {
        resultText.textContent = "🧤 GEHALTEN!";
    } else {
        resultText.textContent = "⚽ TOR!";
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawKeeper() {
    ctx.fillStyle = "black";
    ctx.fillRect(
        keeper.x - keeper.width / 2,
        keeper.y,
        keeper.width,
        keeper.height
    );
}

function drawGoal() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(300, 50, 200, 80);
}

reset();
