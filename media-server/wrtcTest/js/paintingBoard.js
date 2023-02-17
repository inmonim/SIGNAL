const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
ctx.globalAlpha = 1;
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const clearer = document.querySelector(".clearer");
const eraser = document.querySelector(".eraser");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_H = 700;
const CANVAS_W = 700;

const DRAWING = 0;
const ERASE = 1;
let MODE = DRAWING;
const ERASER_SIZE = 20;

canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
let drawingXYs = [];
let drawingType = DRAWING;
let drawingColor = INITIAL_COLOR;
let drawingSize = 2.5;
// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
//ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = drawingSize;
let mx, my; //내 그림 좌표

let isPainting = false;

//다른 사람이 그리거나 지움
socket.on("drawing", function (data) {
  let xys = data.xys;

  if (data.mode === DRAWING) {
    //그리기
    let size = data.size;
    let color = data.color;
    ctx.beginPath();
    for (let i = 1; i < xys.length; i++) {
      let [px, py] = xys[i - 1];
      let [cx, cy] = xys[i];
      ctx.moveTo(px, py);
      ctx.lineTo(cx, cy); //(px,py) ->(cx,cy)로 긋기
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.stroke();
      ctx.beginPath();
    }
  } else {
    //지우개
    for (let i = 0; i < xys.length; i++) {
      let [cx, cy] = xys[i];
      ctx.clearRect(
        cx - ERASER_SIZE / 2,
        cy - ERASER_SIZE / 2,
        ERASER_SIZE,
        ERASER_SIZE
      );
    }
  }
});

//다른사람이 전체를 지움
socket.on("clear", function () {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
});

function stopPainting() {
  if (!isPainting) return;
  console.log("그리기 종료");
  socket.emit("drawing", {
    size: drawingSize,
    color: drawingColor,
    mode: MODE,
    xys: drawingXYs,
  });

  isPainting = false;
}

function startPainting() {
  isPainting = true;
  drawingXYs = [[mx, my]]
  //console.log("색상:", drawingColor);
  //console.log("그리기 시작");
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (MODE === DRAWING) {
    if (!isPainting) {
      //ctx.beginPath();
      //ctx.moveTo(x, y);
      [mx, my] = [x, y];
    } else {
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(x, y);
      ctx.strokeStyle = drawingColor;
      ctx.lineWidth = drawingSize;
      ctx.stroke();
      drawingXYs.push([x, y]);
      [mx, my] = [x, y];
    }
  } else if (MODE === ERASE) {
    if (isPainting) {
      drawingXYs.push([x, y]);
      ctx.clearRect(
        x - ERASER_SIZE / 2,
        y - ERASER_SIZE / 2,
        ERASER_SIZE,
        ERASER_SIZE
      );
    }
  }
}

function handleColorClick(event) {
  MODE = DRAWING;
  drawingColor = event.target.style.backgroundColor;
  ctx.strokeStyle = drawingColor;
  //ctx.fillStyle = drawingColor;
}

function handleRangeChange(event) {
  const size = event.target.value;
  drawingSize = size;
}

function handleCanvasClick() {}

function handleCM(event) {
  event.preventDefault();
}

function clear() {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  socket.emit("clear");
}

function erase() {
  MODE = ERASE;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((el) =>
  el.addEventListener("click", handleColorClick)
);

clearer.addEventListener("click", clear);

eraser.addEventListener("click", erase);

if (range) {
  range.addEventListener("input", handleRangeChange);
}
