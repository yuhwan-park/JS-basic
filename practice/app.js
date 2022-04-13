const modalBtn = document.querySelector('#modal-btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-btn');
const offCanvas = document.getElementById('myOffcanvas');
const offCanvasContainer = document.querySelector('.offcanvas-container');
const openSidemenu = document.querySelector('#openSideMenu');
const closeSidemenu = document.querySelector('#closeSideMenu');
const $todoInput = document.querySelector('.todo-input');
const $todoForm = document.querySelector('#todoform');
const $todoContent = document.querySelector('.todo-content');
const $todoList = document.querySelector('.todo-list');
let toDos = [];

// 모달 기능
modalBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// 오프캔버스 메뉴 기능
offCanvasContainer.addEventListener('click', () => {
  offCanvas.style.width = '0px';
  offCanvasContainer.style.display = 'none';
});

function openOffcanvas() {
  offCanvas.style.width = '300px';
  offCanvas.style.animationDuration = '0.3s';
  offCanvas.style.animationName = 'animateRight';
  offCanvasContainer.style.display = 'block';
}
function closeOffcanvas() {
  offCanvas.style.animationName = 'animateLeft';
  offCanvas.style.animationDuration = '0.3s';
  offCanvasContainer.style.display = 'none';
}
openSidemenu.addEventListener('click', openOffcanvas);
closeSidemenu.addEventListener('cllck', closeOffcanvas);
// 투두리스트 기능
function toDoData() {
  localStorage.setItem('todo', JSON.stringify(toDos));
}
function deleteTodo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter(item => item.id !== parseInt(li.id, 10));
  toDoData();
  li.remove();
}
function paintTodo(Todo) {
  const li = document.createElement('li');
  li.id = Todo.id;
  const span = document.createElement('span');
  span.innerHTML = Todo.text;
  const button = document.createElement('button');
  li.appendChild(span);
  li.appendChild(button);
  button.textContent = '삭제';
  button.addEventListener('click', deleteTodo);
  $todoList.appendChild(li);
}
$todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const newTodo = $todoInput.value;
  $todoInput.value = '';
  const newTodoObj = { id: Date.now(), text: newTodo };
  toDos.push(newTodoObj);
  paintTodo(newTodoObj);
  toDoData();
});
const savedtoDos = localStorage.getItem('todo');
if (savedtoDos) {
  const parsetoDo = JSON.parse(savedtoDos);
  toDos = parsetoDo;
  parsetoDo.forEach(paintTodo);
}
window.onclick = e => {
  if (e.target.className === 'todo-input' || e.target.textContent === '삭제') {
    $todoContent.style.display = 'block';
  } else {
    $todoContent.style.display = 'none';
  }
};
