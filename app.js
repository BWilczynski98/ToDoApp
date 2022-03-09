// *! --------------------------------Variables----------------------------------------
// inputy
const inputUserTask = document.querySelector('#task--enter');
const inputUserStep = '';
// innerHTML
const panelTasks = document.querySelector('.to--do--tasks--render');
const panelDoneTasks = document.querySelector('.done--tasks--render');
// arrays
const tasksArray = [];
// elements
const darkModeBtn = document.querySelector('.btn--dark--mode');
const mainBackground = document.querySelector('body');
const headerDoneTask = document.querySelector('.header--done--task');

// toggles
let taskFieldDarkMode = '';
let taskId = 1;

// *! --------------------------------Functions----------------------------------------

const validation = (type) => {
    const wrongData = () => alert(`You have entry empty ${type}, try again`);
    const inputValue = type === 'task' ? inputUserTask.value : inputUserStep.value;
    !inputValue.trim() ? wrongData() : addNewTask(inputValue);
};

const addNewTask = (value) => {
    inputUserTask.value = '';
    const task = {
        value,
        taskId,
        done: false,
        step: []
    };
    taskId++
    tasksArray.push(task);
    renderTasks();
};

const renderTasks = () => {
    const tasks = tasksArray.filter(el => !el.done);
    const doneTasks = tasksArray.filter(el => el.done);

    let task = '';
    let doneTask = '';
    tasks.forEach((value) => {

        task +=
            `<div class="task ${taskFieldDarkMode}">
            <button class="btn--passive" onClick=taskStatus(${value.taskId})><i class="fas fa-check"></i></button>
            <li onClick=sidePanelStatus(${value.taskId})>${value.value}</li>
            <button class="btn--delete" onClick=deleteTask(${value.taskId})><i class="fas fa-trash fas--color"></i></button>
        </div>`
    });
    doneTasks.forEach((value) => {
        doneTask +=
            `<div class="task ${taskFieldDarkMode}">
            <button class="btn--passive" onClick=taskStatus(${value.taskId})><i class="fas fa-check"></i></button>
            <li onClick=sidePanelStatus()>${value.value}</li>
            <button class="btn--delete" onClick=deleteTask(${value.taskId})><i class="fas fa-trash fas--color"></i></button>
        </div>`
    });

    panelTasks.innerHTML = task;
    panelDoneTasks.innerHTML = doneTask;

    doneTask.length != 0 ? headerDoneTask.classList.add('visible') : headerDoneTask.classList.remove('visible');
};

const taskStatus = (id) => {
    const arr = [...tasksArray]
    const task = arr.find(el => el.taskId === id);
    task.done = !task.done;
    renderTasks();
};

const deleteTask = (taskId) => {
    const index = tasksArray.findIndex(el => el.taskId === taskId);
    console.log(index);
    tasksArray.splice(index, 1);
    renderTasks();
};

const sidePanelStatus = (taskId) => {
    const sidePanel = document.querySelector('.side--panel');
    sidePanel.classList.toggle('position--right--0');

    let renderStructureSidePanel = ''
    renderStructureSidePanel += `
    <div><button>Close the window</button></div>
    <div><label for=""> Enter step <input type="text"></label></div>
    <ul class="step--render"></ul>
    `
    sidePanel.innerHTML = renderStructureSidePanel;
}

const darkMode = () => {
    if (mainBackground.style.backgroundColor === 'rgb(18, 18, 18)') {
        mainBackground.style.backgroundColor = 'rgb(252, 252, 252';
        headerDoneTask.classList.remove('dm--white');
        taskFieldDarkMode = '';
    } else {
        mainBackground.style.backgroundColor = 'rgb(18, 18, 18)';
        headerDoneTask.classList.add('dm--white');
        taskFieldDarkMode = 'dm--task';
    };
    renderTasks();
};
// *! --------------------------------Input----------------------------------------

inputUserTask.addEventListener('keyup', (key) => {
    if (key.keyCode === 13) {
        validation('task');
    }
});
darkModeBtn.addEventListener('click', darkMode);
