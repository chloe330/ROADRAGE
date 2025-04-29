const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const toggleButton = document.getElementById("toggleDrawingButton");
const clearButton = document.getElementById("clearCanvasButton");

const strokeSound = new Audio("audio/spray.mp3");
const clickSound = new Audio("audio/shake.mp3");
strokeSound.loop = true;

let drawing = false;
let lastPos = null;
let isDrawingEnabled = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) * (canvas.width / rect.width),
    y: (evt.clientY - rect.top) * (canvas.height / rect.height),
  };
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomLineWidth() {
  return Math.random() * 5 + 4;
}

function addNoise(pos, noiseLevel) {
  return {
    x: pos.x + (Math.random() * noiseLevel - noiseLevel / 2),
    y: pos.y + (Math.random() * noiseLevel - noiseLevel / 2),
  };
}

function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();
}

canvas.addEventListener("mousedown", (e) => {
  if (isDrawingEnabled) {
    drawing = true;
    const pos = getMousePos(canvas, e);
    lastPos = addNoise(pos, 5);
    ctx.fillStyle = getRandomColor();
    ctx.globalAlpha = Math.random() * 0.5 + 0.5;
    drawCircle(lastPos.x, lastPos.y, getRandomLineWidth());
    strokeSound.play();
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (drawing && isDrawingEnabled) {
    const pos = getMousePos(canvas, e);
    const noisyPos = addNoise(pos, 5);
    if (lastPos) {
      const distance = Math.hypot(
        noisyPos.x - lastPos.x,
        noisyPos.y - lastPos.y
      );
      const step = Math.min(15, distance);
      for (let i = 0; i < distance; i += step) {
        const x = lastPos.x + (noisyPos.x - lastPos.x) * (i / distance);
        const y = lastPos.y + (noisyPos.y - lastPos.y) * (i / distance);
        drawCircle(x, y, getRandomLineWidth());
      }
    }
    lastPos = noisyPos;
  }
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  lastPos = null;
  strokeSound.pause();
  strokeSound.currentTime = 0;
});

canvas.addEventListener("mouseout", () => {
  if (drawing) {
    drawing = false;
    lastPos = null;
    strokeSound.pause();
    strokeSound.currentTime = 0;
  }
});

toggleButton.addEventListener("click", () => {
  isDrawingEnabled = !isDrawingEnabled;

  if (isDrawingEnabled) {
    canvas.classList.add("drawing");
    canvas.style.cursor = "url('../images/spicon.png'), auto";
    clearButton.style.display = "block";
    clickSound.play();

    toggleButton.classList.add("active");
  } else {
    canvas.classList.remove("drawing");
    canvas.style.cursor = "auto";
    clearButton.style.display = "none";

    toggleButton.classList.remove("active");
  }
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Initial fill style & alpha for drawing
ctx.fillStyle = "black";
ctx.globalAlpha = 1;
