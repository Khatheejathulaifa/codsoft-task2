document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    };

    addBtn.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.getAttribute('data-index');
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });


    renderTasks();
});