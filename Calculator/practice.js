const $operator = document.getElementById("operator");
const $result = document.getElementById("result");
let originNum = 0;
let numOne = 0;
let numTwo = 0;
let operate;
document.getElementById("num-1").addEventListener("click", addNum(1));
document.getElementById("num-2").addEventListener("click", addNum(2));
document.getElementById("num-3").addEventListener("click", addNum(3));
document.getElementById("num-4").addEventListener("click", addNum(4));
document.getElementById("num-5").addEventListener("click", addNum(5));
document.getElementById("num-6").addEventListener("click", addNum(6));
document.getElementById("num-7").addEventListener("click", addNum(7));
document.getElementById("num-8").addEventListener("click", addNum(8));
document.getElementById("num-9").addEventListener("click", addNum(9));
document.getElementById("num-0").addEventListener("click", addNum(0));
document.getElementById("plus").addEventListener("click", operator("+"));
document.getElementById("minus").addEventListener("click", operator("-"));
document.getElementById("divide").addEventListener("click", operator("/"));
document.getElementById("multiply").addEventListener("click", operator("x"));
document.getElementById("clear").addEventListener("click", clear());
document.getElementById("calculate").addEventListener("click", calculate());

function addNum(num) {
  // 숫자 클릭
  return () => {
    if (operate && numTwo === 0) {
      // 두번째 숫자 눌렀을 때 인풋 비우기
      $result.value = "";
      numTwo += num;
    } else if (!operate && numOne) {
      // 숫자 연속으로 눌렀을 때 자릿 수 증가
      numOne = parseInt(numOne.toString() + num.toString());
    } else if (operate && numOne && numTwo) {
      // 두번째 항 숫자 숫자 연속으로 눌렀을 때 자릿 수 증가
      numTwo = parseInt(numTwo.toString() + num.toString());
    } else {
      // 첫번째 숫자 눌렀을 때
      numOne += num;
      originNum += num;
    }
    $result.value += num;
  };
}

function operator(op) {
  // 연산자 클릭
  return () => {
    if (numOne === 0) {
      $result.value = 0;
      $operator.value = op;
      operate = op;
    } else {
      if (operate === undefined) {
        $operator.value = op;
        operate = op;
      } else {
        if (operate === "+" && numTwo === 0) {
          numOne += originNum;
          $result.value = numOne;
          operate = op;
        }
        if (operate === "-" && numTwo === 0) {
          numOne -= originNum;
          $result.value = numOne;
          operate = op;
        }
        if (operate === "x" && numTwo === 0) {
          numOne *= originNum;
          $result.value = numOne;
          operate = op;
        }
        if (operate === "/" && numTwo === 0) {
          numOne /= originNum;
          $result.value = numOne;
          operate = op;
        }
        if (operate === "+") {
          numOne = numOne + numTwo;
          $result.value = numOne;
          operate = op;
          numTwo = 0;
        }
        if (operate === "-") {
          numOne = numOne - numTwo;
          $result.value = numOne;
          operate = op;
          numTwo = 0;
        }
        if (operate === "/") {
          numOne = numOne / numTwo;
          $result.value = numOne;
          operate = op;
          numTwo = 0;
        }
        if (operate === "x") {
          numOne = numOne * numTwo;
          $result.value = numOne;
          operate = op;
          numTwo = 0;
        }
      }
    }
  };
}

function calculate() {
  return () => {
    if (numTwo === undefined) {
      numOne += numOne;
      $result.value = numOne;
    } else {
      if (operate === "+") {
        $result.value = numOne + numTwo;
        numOne = numOne + numTwo;
      }
      if (operate === "-") {
        $result.value = numOne - numTwo;
        numOne = numOne - numTwo;
      }
      if (operate === "/") {
        $result.value = numOne / numTwo;
        numOne = numOne / numTwo;
      }
      if (operate === "x") {
        $result.value = numOne * numTwo;
        numOne = numOne * numTwo;
      }
    }
  };
}

function clear() {
  return () => {
    numOne = 0;
    numTwo = 0;
    originNum = 0;
    operate = undefined;
    $result.value = "";
    $operator.value = "";
  };
}
