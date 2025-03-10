const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const emptyState = document.querySelector('.empty-state');
const progressBar = document.querySelector('.progress-bar');
const totalCount = document.querySelector('#total-count');
const completedCount = document.querySelector('#completed-count');

let todos = JSON.parse(localStorage.getItem('todos')) || [];




function updateStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateProgress();
    updateStats();
}

function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    li.innerHTML = `
        <span class="todo-text">${todo.text}</span>
        <div class="actions">
            <button class="action-btn complete-btn">${todo.completed ? '↩' : '✓'}</button>
            <button class="action-btn delete-btn">✕</button>
        </div>
    `;

    li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(todo.id));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));

    return li;
}

function renderTodos() {
    todoList.innerHTML = '';
    emptyState.style.display = todos.length ? 'none' : 'block';

    todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });
}

function addTodo(text) {
    if (text.trim()) {
        const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false
        };

        todos.unshift(newTodo);
        updateStorage();
        renderTodos();
        todoInput.value = '';
    }
}

function toggleComplete(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    updateStorage();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateStorage();
    renderTodos();
}

function updateProgress() {
    const completed = todos.filter(todo => todo.completed).length;
    const progress = todos.length ? (completed / todos.length) * 100 : 0;
    progressBar.style.width = `${progress}%`;
}

function updateStats() {
    totalCount.textContent = todos.length;
    completedCount.textContent = todos.filter(todo => todo.completed).length;
}

// Event Listeners
addBtn.addEventListener('click', () => addTodo(todoInput.value));
todoInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') addTodo(todoInput.value);
});

// Initial render
renderTodos();
updateProgress();
updateStats();


