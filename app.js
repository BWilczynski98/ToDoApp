// *!--------------------------------Variables----------------------------------------
// inputy
const inputTask = document.querySelector('#input--task');
const inputStep = document.querySelector('#input--step');
const view = document.querySelector('#view')
// innerHTML
const tasksPanel = document.querySelector('.to--do--tasks--render');
const doneTasksPanel = document.querySelector('.done--tasks--render');
const sidePanel = document.querySelector('.side--panel');
const render = document.querySelector('.render');
let stepPanel = '';
// arrays
const tasksArray = [];
// elements
const darkModeBtn = document.querySelector('.btn--dark--mode');
const mainBackground = document.querySelector('body');
const headerDoneTask = document.querySelector('.header--done--task');

// toggles
let taskFieldDarkMode = '';
let idTask = 1;
let idStep = 100;


// *!--------------------------------Functions----------------------------------------
const wrongData = (type) => alert(`You have entry empty ${type}, try again`);

const addTask = (value) => {
    const task = {
        value,
        idTask,
        done: false,
        step: []
    };
    idTask++
    tasksArray.push(task);
    renderTasks();
};

const loadSidePanelData = (taskId, x) => {
    inputStep.dataset.id = taskId;
    stepPanel = x;
    console.log(stepPanel);
};

const openSidePanel = (taskId) => {
    sidePanel.classList.add('side--panel--visible');
    const closePanel = document.querySelector('#btn--close--side--panel');
    closePanel.addEventListener('click', () => {
        sidePanel.classList.remove('side--panel--visible');
    });
    const id = parseInt(taskId)
    const index = tasksArray.findIndex(el => el.idTask === id);
    let y = `<ul class="step--render"></ul>`
    render.innerHTML = y;
    const stepPanel = document.querySelector('.step--render');
    if (tasksArray[index].step.length > 0) {
        let x = '';
        tasksArray[index].step.forEach((item) => {
            x += `<li>${item.value}</li>`
        });
        stepPanel.innerHTML = x;
    };
    loadSidePanelData(taskId, stepPanel);
};

const addStepToTask = (value, taskId) => {
    const id = parseInt(taskId)
    const findTaskById = tasksArray.find(({ idTask }) => idTask === id);
    const step = {
        value,
        idStep,
        done: false
    };
    idStep++;
    findTaskById.step.push(step);

    let x = '';
    findTaskById.step.forEach((item) => {
        x += `<li>${item.value}</li>`
    });
    stepPanel.innerHTML = x;
};

const renderTasks = () => {
    const tasks = tasksArray.filter(el => !el.done);
    const doneTasks = tasksArray.filter(el => el.done);
    let task = '';
    let doneTask = '';
    tasks.forEach((item) => {
        task +=
            `<div class="task ${taskFieldDarkMode}">
            <button class="btn--passive" onClick=taskStatus(${item.idTask})><i class="fas fa-check"></i></button>
            <li onClick="openSidePanel(${item.idTask})">${item.value}</li>
            <button class="btn--delete" onClick=deleteTask(${item.idTask})><i class="fas fa-trash fas--color"></i></button>
        </div>`

    });
    doneTasks.forEach((item) => {
        doneTask +=
            `<div class="task ${taskFieldDarkMode}">
            <button class="btn--passive" onClick=taskStatus(${item.idTask})><i class="fas fa-check"></i></button>
            <li onClick=sidePanelStatus()>${item.value}</li>
            <button class="btn--delete" onClick=deleteTask(${item.idTask})><i class="fas fa-trash fas--color"></i></button>
        </div>`
    });

    tasksPanel.innerHTML = task;
    doneTasksPanel.innerHTML = doneTask;
    doneTask.length != 0 ? headerDoneTask.classList.add('visible') : headerDoneTask.classList.remove('visible');
};

const taskStatus = (id) => {
    const arr = [...tasksArray]
    const task = arr.find(el => el.idTask === id);
    task.done = !task.done;
    renderTasks();
};

const deleteTask = (id) => {
    const index = tasksArray.findIndex(el => el.idTask === id);
    tasksArray.splice(index, 1);
    renderTasks();
};

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

inputTask.addEventListener('keyup', (key) => {
    if (key.keyCode === 13) {
        !inputTask.value.trim() ? wrongData('task') : addTask(inputTask.value);
        inputTask.value = '';
    };
});

inputStep.addEventListener('keyup', (key) => {
    if (key.keyCode === 13) {
        addStepToTask(inputStep.value, inputStep.dataset.id)
    };
});

view.addEventListener('click', () => {
    console.log(tasksArray);
})
darkModeBtn.addEventListener('click', darkMode);


// rozwiązanie marcina:
// const openPanel = (id) => {
//     sidePanel.classList.toggle('side--panel--visible');
//     loadSidePanelData(id);
// };

// const loadSidePanelData = (id) => {
//     innerId.innerHTML = id;
//     inputStep.dataset.id = id;
// };

// const addStepToTask = (id, value) => {
//     console.log(id);
//     console.log(value);
// };
// inputStep.addEventListener('keyup', (key) => {
//     if (key.keyCode === 13) {
//         addStepToTask(inputStep.dataset.id, inputStep.value);
//     };


// });