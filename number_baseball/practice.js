const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $log = document.getElementById("log");
const $start = document.getElementById("start");
const $span = document.querySelector("span");
let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let answer = [];
let tries = [];
const randomNumber = () => {
  answer = [];
  number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  for (i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * number.length);
    answer.push(number[index]);
    number.splice(index, 1);
  }
  $span.classList.remove("hidden");
  tries = []; // 게임 재시작 시 초기화
  $log.innerHTML = "";
  $span.innerHTML = "숫자는 0~9까지, 기회는 10번. 성현아 한 게임 하고 버그좀 찾아줘";
};

function checkInput(input) {
  if (answer.length !== 4) {
    return;
  }
  if (input.length !== 4) {
    return alert("4자리 숫자를 입력해주세요");
  }
  if (new Set(input).size !== 4) {
    return alert("중복된 숫자를 입력하였습니다");
  }
  if (tries.includes(input)) {
    return alert("이미 시도한 숫자입니다");
  }
  return true;
}

function onSubmit(event) {
  event.preventDefault();
  const value = $input.value;
  $input.value = "";
  if (!checkInput(value) || answer.length !== 4) {
    return;
  }
  if (answer.join("") === value) {
    $start.textContent = "재시작";
    answer = [];
    $span.textContent = "축하합니다! 한 게임 더!";
    return alert(`${value}!! 정답입니다!!`);
  }
  if (tries.length >= 9) {
    $start.textContent = "재시작";
    answer = [];
    $span.textContent = "아깝네요! 다시 한번 도전해봐요!";
    return alert(`패배하였습니다. 정답은 ${answer.join("")} 입니다.`);
  }
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }
  strike == 0 && ball == 0
    ? $log.append(`${value} : 아웃입니다!`, document.createElement("br"))
    : $log.append(`${value} : ${strike} 스트라이크 ${ball} 볼입니다.`, document.createElement("br"));
  tries.push(value);
}
$start.addEventListener("click", randomNumber);
$form.addEventListener("submit", onSubmit);
