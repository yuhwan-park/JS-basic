const modalBtn = document.querySelector("#modal-btn");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-btn");
const offCanvas = document.getElementById("myOffcanvas");
const offCanvasContainer = document.querySelector(".offcanvas-container");
let slideIndex = 1;
const slides = document.getElementsByClassName("mySlide");
const dots = document.getElementsByClassName("dot");
const $todoInput = document.querySelector('.todo-input')
const $todoForm = document.querySelector('#todoform')
const $todoContent = document.querySelector('.todo-content')
const $todoList = document.querySelector('.todo-list')
let toDos = [];

// 모달 기능
modalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", () => {
  modal.style.display = "none";
});

// 오프캔버스 메뉴 기능
offCanvasContainer.addEventListener("click", () => {
  offCanvas.style.width = "0px";
  offCanvasContainer.style.display = "none";
});

function openOffcanvas() {
  offCanvas.style.width = "300px";
  offCanvas.style.animationDuration = '0.3s'
  offCanvas.style.animationName = 'animateRight'
  offCanvasContainer.style.display = "block";
}
function closeOffcanvas() {
  offCanvas.style.animationName = 'animateLeft'
  offCanvas.style.animationDuration = '0.3s'
  offCanvasContainer.style.display = "none";
}

// 사이트 하단 슬라이드 기능
function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}
function plusSlides(n) {
  showSlides((slideIndex += n));
}
showSlides(slideIndex);

function currentSlide(n) {
  showSlides((slideIndex = n));
}

// 드래그 앤 드랍 기능
function handleDrag(item) {
  const selectedItem = item.target;
  const list = selectedItem.parentNode;
  const x = item.clientX;
  const y = item.clientY;
  selectedItem.classList.add("drag-sort-active");
  let swapItem =
    document.elementFromPoint(x, y) === null
      ? selectedItem
      : document.elementFromPoint(x, y);

  if (list === swapItem.parentNode) {
    swapItem =
      swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}

function handleDrop(item) {
  item.target.classList.remove("drag-sort-active");
}
function enableDragItem(item) {
  const event = item;
  event.setAttribute("draggable", true);
  event.ondrag = handleDrag;
  event.ondragend = handleDrop;
}

function enableDragList(list) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
}
function enableDragSort(listClass) {
  const sortableLists = document.getElementsByClassName(listClass);
  Array.prototype.map.call(sortableLists, (list) => {
    // Array.prototype.map.call -> DOM에서 Array가 아닌 노드리스트를 가져오기때문에 map을 이용하기 위해 map.call을 사용
    // https://stackoverflow.com/questions/20153455/why-array-prototype-map-call-instead-of-array-map-call
    enableDragList(list);
  });
}

(() => {
  enableDragSort("drag-sort-enable");
})();

// 투두리스트 기능
function toDoData() {
  localStorage.setItem("todo", JSON.stringify(toDos));
}
function deleteTodo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter((item) => item.id !== parseInt(li.id, 10));
  toDoData();
  li.remove();
}
function paintTodo(Todo) {
  const li = document.createElement("li");
  li.id = Todo.id;
  const span = document.createElement("span");
  span.innerHTML = Todo.text;
  const button = document.createElement("button");
  li.appendChild(span);
  li.appendChild(button);
  button.textContent = '삭제'
  button.addEventListener("click", deleteTodo);
  $todoList.appendChild(li);
}

$todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTodo = $todoInput.value;
    $todoInput.value = "";
    const newTodoObj = { id: Date.now(), text: newTodo };
    toDos.push(newTodoObj);
    paintTodo(newTodoObj);
    toDoData();
});
const savedtoDos = localStorage.getItem("todo");

if (savedtoDos) {
  const parsetoDo = JSON.parse(savedtoDos);
  toDos = parsetoDo;
  parsetoDo.forEach(paintTodo);
}

window.onclick = (e) => {
  if (e.target.className === 'todo-input' || e.target.textContent === '삭제'){
    $todoContent.style.display = 'block'
  } else {
    $todoContent.style.display = 'none'
  }
}
