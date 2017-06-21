var scr = document.getElementById("main-screen");
var curArr = [];
var openPara = 0;

function btnFun() {}
function clearCalc() {
  var newArr = [];
  curArr = newArr;
  updateScreen();
}
function divide() {
  if (Number.isInteger(curArr[curArr.length - 1]) || curArr[curArr.length - 1] == ")") {
    curArr.push("/");
  } else {
      curArr[curArr.length - 1] = "/";
  }
  updateScreen();
}
function multiply() {
  if (Number.isInteger(curArr[curArr.length - 1]) || curArr[curArr.length - 1] == ")") {
    curArr.push("*");
  } else {
      curArr[curArr.length - 1] = "*";
  }
  updateScreen();
}
function delt() {
  var last = curArr[curArr.length - 1];
  if (Number.isInteger(last)) {
    if (curArr.length == 1 && Math.abs(curArr[0]) - 10 < 0) {
      curArr = [];
    } else {
      last = ("" + last).split("");
      last[last.length - 1] = "";
      last = parseInt(last.join(""));
      curArr[curArr.length - 1] = last;
    }
  } else {
    if (curArr.length == 1) {
      curArr = [];
    } else {
      curArr.splice(curArr.length - 1, 1);
    }
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
  numStr = "" + num;
  if (
    !Number.isInteger(curArr[curArr.length - 1]) &&
    curArr[curArr.length - 1] !== "." &&
    curArr[curArr.length - 1] !== ")"
  ) {
    curArr.push(num);
  } else {
    if (curArr[curArr.length - 1] == ".") {
      var last = curArr.length - 1;
      curArr[last - 1] = curArr[last - 1] + num / 10;
      curArr.splice(last, 1);
    } else {
      curArr[curArr.length - 1] = parseInt(
        "" + curArr[curArr.length - 1] + numStr
      );
    }
  }
}
function nine() {
  addNum(9);
  updateScreen();
}
function subtract() {
  if (Number.isInteger(curArr[curArr.length - 1]) || curArr[curArr.length - 1] == ")") {
    curArr.push("-");
  } else {
      curArr[curArr.length - 1] = "-";
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
  if (Number.isInteger(curArr[curArr.length - 1]) || curArr[curArr.length - 1] == ")") {
    curArr.push("+");
  } else {
      curArr[curArr.length - 1] = "+";
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
  if (
    (!Number.isInteger(curArr[curArr.length - 1]) ||
    curArr[curArr.length - 1] == "(") && curArr[curArr.length - 1] != (')')
  ) {
    curArr.push("(");
    openPara += 1;
  } else {
    if (openPara > 0) {
      curArr.push(")");
      openPara -= 1;
    }
  }
  console.log(curArr);
  updateScreen();
}
function zero() {
  addNum(0);
  updateScreen();
}
function point() {
  if (curArr.length == 0 || curArr[curArr.length - 1] != ")") {
    curArr.push(".");
  }
  updateScreen();
}
function signChange() {
  if (Number.isInteger(curArr[curArr.length - 1])) {
    curArr[curArr.length - 1] *= -1;
    updateScreen();
  }
}
function eql() {
  //console.log(curArr);
  resolveArray();
  //console.log(curArr);
  updateScreen();
}

function updateScreen() {
  scr.value = curArr.join("");
}

function resolveParantheses(arr2) {
  if (Number.isInteger(arr2)) {
    return arr2;
  }
  var arr = arr2;
  
  if (arr === undefined) {
    return undefined;
  }
  //2. Sweep inner parantheses
  for (var pi = 0; pi < arr.length; pi++) {
    if (arr[pi] == "(") {
      var begindex = pi;
      console.log('pindex');
      for (var pend = arr.length - 1; pend > pi; pend--) {
        if (arr[pend] == ")") {
          console.log('end');
          var endex = pend;
          //Work out this par, read methods more carefully         
          console.log(pi + ', ' + pend);
          console.log(arr);
          console.log('wot de');
          console.log(resolveParantheses(arr.slice(begindex + 1, endex)));
          arr.splice(begindex, endex - begindex + 1, resolveParantheses(arr.slice(begindex + 1 , endex)));
        }
      }
    }
  }
  //3.Now that that's done, sweep the rest as normal.
  //3a. Sweep multiples
  for (var i = 0; i < arr.length; i++) {
    if (!Number.isInteger(arr[i])) {
      if (arr[i] == "*") {
        arr[i - 1] = arr[i - 1] * arr[i + 1];
        arr.splice(i, 2);
      }
      if (arr[i] == "/") {
        arr[i - 1] = arr[i - 1] / arr[i + 1];
        arr.splice(i, 2);
      }
    }
  }
  //3b. Sweep additions
  for (var i = 0; i < arr.length; i++) {
    if (!Number.isInteger(arr[i])) {
      var a = parseInt(arr[i - 1]);
      var b = parseInt(arr[i + 1]);
      if (arr[i] == "+") {
        arr[i - 1] = a + b;
        arr.splice(i, 2);
      }
      if (arr[i] == "-") {
        arr[i - 1] = a - b;
        arr.splice(i, 2);
      }
    }
  }
  //4. Clean head and tail
  if (arr[arr.length - 1] == ")" ) {
    arr.splice(arr.length - 1, 1);
  }
  if (arr[0] == '(') {
    arr.splice(0, 1);    
  }
  return arr;
}

function resolveArray() {
  console.log(resolveParantheses(curArr));
  //1. Clean tail
  if (
    !Number.isInteger(curArr[curArr.length - 1]) &&
    curArr[curArr.length !== ")"]
  ) {
    curArr.splice(curArr.length - 1, 1);
  }
  //2. Sweep multiples
  for (var i = 0; i < curArr.length; i++) {
    if (!Number.isInteger(curArr[i])) {
      if (curArr[i] == "*") {
        curArr[i - 1] = curArr[i - 1] * curArr[i + 1];
        curArr.splice(i, 2);
      }
      if (curArr[i] == "/") {
        curArr[i - 1] = curArr[i - 1] / curArr[i + 1];
        curArr.splice(i, 2);
      }
    }
  }
  //3. Sweep additions
  for (var i = 0; i < curArr.length; i++) {
    if (!Number.isInteger(curArr[i])) {
      if (curArr[i] == "+") {
        curArr[i - 1] = curArr[i - 1] + curArr[i + 1];
        curArr.splice(i, 2);
      }
      if (curArr[i] == "-") {
        curArr[i - 1] = curArr[i - 1] - curArr[i + 1];
        curArr.splice(i, 2);
      }
    }
  }
}