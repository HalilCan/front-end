var scr = document.getElementById("main-screen");
var curArr = [];
function btnFun() {
}
function clearCalc() {
  var newArr = [];
  curArr = newArr;
  updateScreen();
}
function divide() {
  if (Number.isInteger(curArr[curArr.length - 1])){
    curArr.push('/');
  } else {
    curArr[curArr.length - 1] = '/';
  }  
  updateScreen();
}
function multiply() {
  if (Number.isInteger(curArr[curArr.length - 1])){
    curArr.push('*');
  } else {
    curArr[curArr.length - 1] = '*';
  }
  updateScreen();
}

function delt() {
  var last = curArr[curArr.length - 1];
  if (Number.isInteger(last)){
    last = ('' + last).split('');
    last[last.length - 1] = '';
    last = parseInt(last.join(''));
    curArr[curArr.length - 1] = last;
  } else {
    curArr.splice(curArr.length - 1, 1);
  }
  updateScreen();
}
function seven() {
  addNum(7);
  updateScreen();
}
function eight() {
  addNum(8);
  updateScreen();
}

function addNum(num) {
  numStr = '' + num;
  if (!Number.isInteger(curArr[curArr.length - 1]) && curArr[curArr.length - 1] !== '.'){
    curArr.push(num);
  } else {
    if (curArr[curArr.length - 1] == '.') {
      var last = curArr.length - 1;
      curArr[last - 1] = curArr[last - 1] + num/10;
      curArr.splice(last, 1);
    } else {
      curArr[curArr.length - 1] = parseInt(''+ curArr[curArr.length - 1] + numStr);      
    }
  }
}
function nine() {
  addNum(9);
  updateScreen();
}
function subtract() {
  if (Number.isInteger(curArr[curArr.length - 1])){
    curArr.push('-');
  } else {
    curArr[curArr.length - 1] = '-';
  }  
  updateScreen();
}
function four() {
  addNum(4);
  updateScreen();
}
function five() {
  addNum(5);
  updateScreen();
}
function six() {
  addNum(6);
  updateScreen();
}
function add() {
  if (Number.isInteger(curArr[curArr.length - 1])){
    curArr.push('+');
  } else {
    curArr[curArr.length - 1] = '+';
  }  
  updateScreen();
}
function one() {
  addNum(1);
  updateScreen();
}
function two() {
  addNum(2);
  updateScreen();
}
function three() {
  addNum(3);
  updateScreen();
}
function paranthesis() {
}
function zero() {
  addNum(0);
  updateScreen();
}
function point() {
  curArr.push('.');
  updateScreen();
}
function signChange() {
  if (Number.isInteger(curArr[curArr.length - 1])){
    curArr[curArr.length - 1] *= -1;
    updateScreen();
  }
}
function eql() {
  console.log(curArr);
  resolveArray();
  console.log(curArr);
  updateScreen();
}
function updateScreen() {
  scr.value = curArr.join("");
}

function resolveArray() {
  //1. Clean tail
  if (!Number.isInteger(curArr[curArr.length - 1])) {
    curArr.splice(curArr.length - 1, 1);
  }
  //2. Sweep multiples
  for (var i = 0; i < curArr.length; i ++) {
    if (!Number.isInteger(curArr[i])) {
      if (curArr[i] == '*') {
        curArr[i-1] = curArr[i-1] * curArr[i+1];
        curArr.splice(i, 2);
      }
      if (curArr[i] == '/') {
        curArr[i-1] = curArr[i-1] / curArr[i+1];
        curArr.splice(i, 2);
      }
    }
  }
  //3. Sweep additions
  for (var i = 0; i < curArr.length; i ++) {
    if (!Number.isInteger(curArr[i])) {
      if (curArr[i] == '+') {
        curArr[i-1] = curArr[i-1] + curArr[i+1];
        curArr.splice(i, 2);
      }
      if (curArr[i] == '-') {
        curArr[i-1] = curArr[i-1] - curArr[i+1];
        curArr.splice(i, 2);
      }
    }
  }
}