let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let tarefaSelecionada = null;

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {
  const tituloInput = document.getElementById("tituloTarefa");
  const titulo = tituloInput.value.trim();
  if (titulo === "") return;

  const novaTarefa = { titulo, subtarefas: [] };
  tarefas.push(novaTarefa);
  tituloInput.value = "";
  salvarTarefas();
  renderizarLista();
}

function removerTarefa() {
  if (tarefaSelecionada === null) return;
  tarefas.splice(tarefaSelecionada, 1);
  tarefaSelecionada = null;
  salvarTarefas();
  renderizarLista();
  renderizarTarefa();
}

function editarTarefa() {
  if (tarefaSelecionada === null) return;

  const novoTitulo = prompt(
    "Edite o título da tarefa:",
    tarefas[tarefaSelecionada].titulo
  );
  if (novoTitulo !== null && novoTitulo.trim() !== "") {
    tarefas[tarefaSelecionada].titulo = novoTitulo.trim();
    salvarTarefas();
    renderizarLista();
    renderizarTarefa();
  }
}

function selecionarTarefa(index) {
  tarefaSelecionada = index;
  renderizarTarefa();
}

function adicionarSubtarefa() {
  if (tarefaSelecionada === null) return;

  const subtarefaInput = document.getElementById("subtarefaInput");
  const subtitulo = subtarefaInput.value.trim();
  if (subtitulo === "") return;

  tarefas[tarefaSelecionada].subtarefas.push(subtitulo);
  subtarefaInput.value = "";
  salvarTarefas();
  renderizarTarefa();
}

function editarSubtarefa(index) {
  if (tarefaSelecionada === null) return;

  const novoSubtitulo = prompt(
    "Edite a subtarefa:",
    tarefas[tarefaSelecionada].subtarefas[index]
  );
  if (novoSubtitulo !== null && novoSubtitulo.trim() !== "") {
    tarefas[tarefaSelecionada].subtarefas[index] = novoSubtitulo.trim();
    salvarTarefas();
    renderizarTarefa();
  }
}

function removerSubtarefa(index) {
  tarefas[tarefaSelecionada].subtarefas.splice(index, 1);
  salvarTarefas();
  renderizarTarefa();
}

function renderizarLista() {
  const lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>
            ${tarefa.titulo}
        </span>
        <div>
            <button onclick="editarTarefa()">
                <span class="material-symbols-outlined">edit</span>
            </button>

        <button onclick="removerTarefa()">
            <span class="material-symbols-outlined">delete</span>
        </button>

        </div>`;
    li.onclick = () => selecionarTarefa(index);
    lista.appendChild(li);
  });
}

function renderizarTarefa() {
  const container = document.getElementById("visualizacaoTarefa");
  if (tarefaSelecionada === null) {
    container.innerHTML = "<p>Selecione uma tarefa para visualizar.</p>";
    return;
  }

  const tarefa = tarefas[tarefaSelecionada];
  container.innerHTML = `
        <div class="task-details">
            <header>
                <h2>${tarefa.titulo}</h2>
            </header>

            <div>
                <input type="text" id="subtarefaInput" placeholder="Nova subtarefa">
                <button onclick="adicionarSubtarefa()">Adicionar</button>
            </div>

            <hr>

            <section class="subtasks">
                ${tarefa.subtarefas
                  .map(
                    (sub, i) => `
                    <div>
                        <span>${sub}</span>

                        <div>
                            <button onclick="editarSubtarefa(${i})">
                                <span class="material-symbols-outlined">edit</span>
                            </button>

                            <button onclick="removerSubtarefa(${i})">
                                <span class="material-symbols-outlined">delete</span>
                            </button>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </section>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarLista();
});
