// 定义一个画笔颜色hash 
var colorArr = { 'eraser': 'green', 'brush': 'black', 'red': 'red', 'yellow': 'yellow', 'blue': 'blue', 'black': 'black' };
var changeColor = document.getElementsByTagName('button');
var drawColor = 'black'
// 加点击颜色
for (let x in colorArr) {
  changeColor[x].onclick = () => {
    drawColor = colorArr[x]
  }
}
var drawbg = document.getElementById('background');
getClientWidthAndHeight();
window.onresize = function () {
  getClientWidthAndHeight()
};
var context = drawbg.getContext('2d');
//手动绘图定位初始化状态
var painting = false;
var lastPoint = { x: undefined, y: undefined };
//画画
drawbg.onmousedown = function (aaaaa) {
  painting = true;
  var x = aaaaa.clientX;
  var y = aaaaa.clientY;
  lastPoint = { "x": x, "y": y };
  drawCircle(x, y, 1, drawColor);
  //drawCircle(float cx, float cy, float radius,Paint paint)： 绘制圆，参数一是中心点的x轴，参数二是中心点的y轴，参数三是半径，参数四是paint对象；
}
drawbg.onmousemove = function (aaaaa) {
  if (painting) {
    var x = aaaaa.clientX;
    var y = aaaaa.clientY;
    var newPoint = { "x": x, "y": y };
    drawCircle(x, y, 1, drawColor);
    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, drawColor);
    lastPoint = newPoint;
  }
}
drawbg.onmouseup = function () {
  painting = false;
}

function getClientWidthAndHeight() {              //获取界面宽高并赋值
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  drawbg.width = pageWidth;
  drawbg.height = pageHeight;
}
function drawCircle(x, y, radius, drawColor) {
  context.beginPath();
  context.fillStyle = drawColor
  context.arc(x, y, radius, 0, Math.PI * 2); // context.arc(x,y,r,起始角,结束角,顺逆时针（ture、false可选）)
  context.fill();
}
function drawLine(x1, y1, x2, y2, drawColor) {
  context.beginPath();
  context.strokeStyle = drawColor
  context.lineWidth = 5;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}