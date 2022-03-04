const rows = [];
let turn = "O";
const $table = document.createElement("table");
const $result = document.createElement("div");
const checkWinner = (target) => {
  let rowIndex = target.parentNode.rowIndex;
  console.dir(target.parentNode);
  let cellIndex = target.cellIndex;
  let winner = false;
  // 가로줄 검사
  if (rows[rowIndex][0].textContent === turn && rows[rowIndex][1].textContent === turn && rows[rowIndex][2].textContent === turn) {
    winner = true;
  }
  // 세로줄 검사
  if (rows[0][cellIndex].textContent === turn && rows[1][cellIndex].textContent === turn && rows[2][cellIndex].textContent === turn) {
    winner = true;
  }
  // 대각선 검사
  if (rows[0][0].textContent === turn && rows[1][1].textContent === turn && rows[2][2].textContent === turn) {
    winner = true;
  }
  if (rows[0][2].textContent === turn && rows[1][1].textContent === turn && rows[2][0].textContent === turn) {
    winner = true;
  }
  return winner;
};

const checkWinOrDraw = (target) => {
  const hasWinner = checkWinner(target);
  if (hasWinner) {
    $result.textContent = `${turn}님의  승리!`;
    $table.removeEventListener("click", onClick);
    return;
  }
  let draw = rows.flat().every((cell) => cell.textContent); // flat , every , some
  if (draw) {
    $result.textContent = "무승부!";
    return;
  }
  turn = turn === "O" ? "X" : "O";
};
let clickable = true;
const onClick = (e) => {
  if (!clickable) return;
  if (e.target.textContent) return;
  e.target.textContent = turn;
  checkWinOrDraw(e.target);
  if (turn === "X") {
    clickable = false;
    const emptyCell = rows.flat().filter((i) => !i.textContent);
    const randomCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    setTimeout(() => {
      randomCell.textContent = "X";
      checkWinOrDraw(randomCell);
      clickable = true;
    }, 2000);
  }
};
for (i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  $table.appendChild($tr);
  const cells = [];
  for (j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $tr.appendChild($td);
  }
  rows.push(cells);
}
$table.addEventListener("click", onClick);
document.body.appendChild($table);
document.body.appendChild($result);
