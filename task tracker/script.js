// Находим элементы страницы

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn")
const list = document.getElementById("taskList");

// хранение задач
let tasks = [];

// Когда нажали кнопку...
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", e => { if(e.key === "Enter") addTask() });
clearBtn.addEventListener("click", clearAll);

// Функция, которую вызывает кнопка
function addTask() {
    const text = input.value.trim();
    if(!text) return;

    const task = {
        text,
        done: false,
        time: new Date().toLocaleTimeString()
    };

    tasks.push(task);
    // saveTasks();
    renderTask(task);
    input.value = "";
}


function renderTask(task){
    // создаем элемент
    const li = document.createElement("li");

    // задаем текст
    const span = document.createElement("span");
    span.textContent = task.text + " ";
    if (task.done) span.classList.add("done");

    // задаем время
    const meta = document.createElement("span");
    meta.classList.add("meta");
    meta.textContent = task.time;

    // создаем кнопку удаления
    const deleteBtn = document.createElement("button");
    deleteBtn.text = "X";

    // удалить задачу
    deleteBtn.addEventListener("click", () => {
        tasks = tasks.filter(t => t !== task);
        li.remove();
        //saveTasks();
    })

    // создаем элементы и добавляем их в HTML документ
    li.appendChild(span);
    li.appendChild(meta);
    li.appendChild(deleteBtn);

    list.appendChild(li);
}

function clearAll(){
    tasks = [];
    list.innerHTML = "";
    //saveTasks();
}