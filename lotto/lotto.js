const $button = document.querySelector("button");
const $result = document.getElementById("result");
const $bonus = document.getElementById("bonus");

function colorize(num, target) {
  if (num < 10) {
    target.style.background = "red";
    target.style.color = "white";
  } else if (num < 20) {
    target.style.background = "orange";
  } else if (num < 30) {
    target.style.background = "yellow";
  } else if (num < 40) {
    target.style.background = "green";
    target.style.color = "white";
  } else if (num <= 45) {
    target.style.background = "blue";
    target.style.color = "white";
  }
}

const showBall = (num, target) => {
  const $ball = document.createElement("div");
  $ball.className = "ball";
  $ball.textContent = num;
  colorize(num, $ball);
  target.appendChild($ball);
};

$button.addEventListener("click", () => {
  const numbers = Array(45)
    .fill()
    .map((el, idx) => {
      return idx + 1;
    });
  const lottoNum = [];
  while (numbers.length > 0) {
    const random = Math.floor(Math.random() * numbers.length);
    const spliceArray = numbers.splice(random, 1);
    const value = spliceArray[0];
    lottoNum.push(value);
  }
  console.log(lottoNum);
  const bonus = lottoNum[6];
  const winBalls = lottoNum.slice(0, 6).sort((a, b) => a - b);
  for (let j = 0; j < 6; j++) {
    setTimeout(() => {
      showBall(winBalls[j], $result);
    }, (j + 1) * 1000);
  }
  setTimeout(() => {
    showBall(bonus, $bonus);
  }, 7000);
});
