const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");
const speed = [];
let startTime;
let endTime;
let flag = true;
let average = 0;
let timeoutId;
const onClick = () => {
  if (flag) {
    if ($screen.className === "waiting") {
      $screen.className = "ready";
      $screen.textContent = "화면이 초록색이 되면 클릭하세요!";
      const random = Math.floor(Math.random() * 5 + 3);
      timeoutId = setTimeout(() => {
        startTime = new Date();
        $screen.className = "now";
        $screen.textContent = "클릭하세요!";
      }, 1000 * random);
    } else if ($screen.className === "ready") {
      clearTimeout(timeoutId);
      flag = false;
      $screen.textContent = "너무 성급했습니다! 천천히 다시해봐요";
      setTimeout(() => {
        $screen.className = "waiting";
        $screen.textContent = "클릭해서 시작하세요";
        flag = true;
      }, 1000);
    } else if ($screen.className === "now") {
      flag = false;
      endTime = new Date();
      let mySpeed = endTime - startTime;
      speed.push(mySpeed);
      $screen.textContent = `반응속도 : ${mySpeed}ms`;
      $result.append(`${mySpeed}ms`, document.createElement("br"));
      if (speed.length >= 5) {
        speed.forEach((x) => (average += x));
        $screen.innerHTML = `<br>총 평균 : ${average / speed.length}ms <br> 재도전을 원하신다면 클릭해주세요`;
        flag = true;
      } else {
        setTimeout(() => {
          flag = true;
          $screen.className = "waiting";
          $screen.textContent = "클릭해서 시작하세요";
        }, 2000);
      }
    }
  }
};

$screen.addEventListener("click", onClick);
