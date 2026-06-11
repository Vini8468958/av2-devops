const API_BASE_URL = 'http://localhost:5000'; // Ajuste conforme a URL do seu backend

let currentFilter = "all";

const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");

// Função para buscar tarefas do backend
async function fetchTasks() {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        return [];
    }
}

// Função para adicionar uma nova tarefa ao backend
async function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("taskPriority").value;

    if (!title) {
        alert("Digite um título.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, date, priority, completed: false }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDate").value = "";
        renderTasks(); // Renderiza as tarefas novamente após adicionar
    } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
    }
}

// Função para marcar/desmarcar tarefa como concluída no backend
async function toggleTask(id) {
    try {
        const tasks = await fetchTasks();
        const taskToUpdate = tasks.find(task => task.id === id);
        if (!taskToUpdate) return;

        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: !taskToUpdate.completed }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        renderTasks(); // Renderiza as tarefas novamente após atualizar
    } catch (error) {
        console.error("Erro ao alternar status da tarefa:", error);
    }
}

// Função para excluir tarefa do backend
async function deleteTask(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        renderTasks(); // Renderiza as tarefas novamente após excluir
    } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
    }
}

// Função para mudar o filtro (mantida no frontend)
function changeFilter(filter, button) {
    currentFilter = filter;

    document
        .querySelectorAll(".filter-btn")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    renderTasks();
}

// Função para atualizar estatísticas
async function updateStats() {
    const tasks = await fetchTasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("pendingTasks").textContent = pending;
    document.getElementById("completedTasks").textContent = completed;
}

// Função para renderizar tarefas
async function renderTasks() {
    const allTasks = await fetchTasks();
    const search = searchInput.value.toLowerCase();

    let filtered = allTasks.filter(task =>
        task.title.toLowerCase().includes(search)
    );

    if (currentFilter === "pending") {
        filtered = filtered.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filtered = filtered.filter(task => task.completed);
    }

    taskList.innerHTML = "";

    filtered.reverse().forEach(task => {
        const priorityClass = task.priority.toLowerCase().replace("é", "e");

        taskList.innerHTML += `
            <div class="task ${task.completed ? 'completed' : ''}">
                <div class="task-left">
                    <input
                        type="checkbox"
                        ${task.completed ? "checked" : ""}
                        onchange="toggleTask(${task.id})"
                    >

                    <div class="task-info">
                        <span class="task-title">${task.title}</span>
                        <span class="task-date">${task.date || 'Sem data'}</span>

                        <span class="badge ${priorityClass}">
                            ${task.priority}
                        </span>
                    </div>
                </div>

                <div class="actions">
                    <button
                        class="btn-complete"
                        onclick="toggleTask(${task.id})">
                        ✓
                    </button>

                    <button
                        class="btn-delete"
                        onclick="deleteTask(${task.id})">
                        🗑
                    </button>
                </div>
            </div>
        `;
    });

    updateStats();
}

searchInput.addEventListener("input", renderTasks);

// Renderização inicial
renderTasks();
