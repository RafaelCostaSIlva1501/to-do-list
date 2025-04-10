import { DOM } from "./DOM.js";

const createElement = (tag) => {
  const element = document.createElement(tag);
  return element;
};

// Liga e deliga o modo noturno
DOM.toggleTheme.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-theme");
});

let listState = true;

DOM.toggleList.forEach((e) => {
  e.addEventListener("click", () => {
    listState = !listState;

    DOM.containerTask.style.width = listState ? "0px" : "80%";
    DOM.containerTask.style.borderRight = listState
      ? "0px solid black"
      : "2px solid var(--cor5)";
    DOM.showTasks.style.display = listState ? "flex" : "none";
  });
});

let tasks = [];

let currentIndex = null;

const getDateTime = () => {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hour}:${minute}`;
};

DOM.addTask.addEventListener("click", () => {
  const newTask = document.querySelector(".input-task");
  let title = newTask.value.trim();

  if (title === "") {
    title = `Tarefa ${tasks.length + 1}`;
  }

  const task = {
    title: title,
    tasks: [],
  };

  tasks.push(task);
  newTask.value = "";

  saveTasks();
  renderTasks();
});

const renderTasks = () => {
  DOM.list.innerHTML = "";

  tasks.forEach((e, i) => {
    const li = createElement("li");
    li.innerHTML = `<span>${e.title}</span>`;
    li.addEventListener("click", () => {
      renderSubtasks(i);
      currentIndex = i;
    });

    const div = createElement("div");

    const edit = createElement("button");
    edit.innerHTML = `<span class="material-symbols-outlined">edit</span>`;

    const remove = createElement("button");
    remove.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    remove.addEventListener("click", () => {
      removeTask(i);
    });

    DOM.list.appendChild(li);
    li.appendChild(div);
    div.appendChild(edit);
    div.appendChild(remove);
  });
};

const removeTask = (index) => {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
};

const addSubtask = (index) => {
  const newSubTask = document.querySelector(".input-subtask");
  let title = newSubTask.value.trim();

  if (title === "") {
    newSubTask.setCustomValidity("Por favor, preencha este campo.");
    newSubTask.reportValidity();
    return;
  }

  tasks[index].tasks.push(title);
  newSubTask.value = "";

  saveTasks();
  renderSubtasks(index);
};

const renderSubtasks = (index) => {
  DOM.showTasks.innerHTML = "";

  const header = createElement("header");

  const span = createElement("span");
  span.textContent = tasks[index].title;

  const div = createElement("div");

  const input = createElement("input");
  input.type = "text";
  input.placeholder = "Escreva aqui sua tarefa";
  input.classList.add("input-subtask");

  const button = createElement("button");
  button.innerHTML = `<span class="material-symbols-outlined">add</span>`;
  button.addEventListener("click", () => {
    addSubtask(index);
  });

  const ul = createElement("ul");

  tasks[index].tasks.forEach((e, i) => {
    const li = createElement("li");
    li.textContent = e;

    const div = createElement("div");

    const edit = createElement("button");
    edit.innerHTML = ` <span class="material-symbols-outlined">edit</span>`;

    const remove = createElement("button");
    remove.innerHTML = ` <span class="material-symbols-outlined">delete</span>`;
    remove.addEventListener("click", () => {
      removeSubtask(index, i);
    });

    ul.appendChild(li);
    li.appendChild(div);
    div.appendChild(edit);
    div.appendChild(remove);
  });

  DOM.showTasks.appendChild(header);
  header.appendChild(span);
  header.appendChild(div);
  div.appendChild(input);
  div.appendChild(button);

  DOM.showTasks.appendChild(ul);
};

const removeSubtask = (taskIndex, subtaskIndex) => {
  tasks[taskIndex].tasks.splice(subtaskIndex, 1);
  saveTasks();
  renderSubtasks(taskIndex);
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }
};

loadTasks();
