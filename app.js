// *!--------------------------------Variables----------------------------------------
// inputy
const inputTask = document.querySelector('#input--task');
const inputStep = document.querySelector('#input--step');
// innerHTML
const tasksPanel = document.querySelector('.to--do--tasks--render');
const doneTasksPanel = document.querySelector('.done--tasks--render');
const sidePanel = document.querySelector('.side--panel');
const containerForSteps = document.querySelector('.step--container');
let stepPanel = '';
// arrays
const tasksArray = [];
// elements
const darkModeBtn = document.querySelector('.btn--dark--mode');
const mainBackground = document.querySelector('body');
const headerDoneTask = document.querySelector('.header--done--task');
// toggles
let darkModeSwitch = '';
let idTask = 1;
let idStep = 100;
let indexTask;

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

const renderStep = (index) => {
    let steps = '';
    tasksArray[index].step.forEach((item) => {
        let step = `<li class="${item.idStep}">${item.value}</li>`
        if (item.done) step = `<li class="line--through">${item.value}</li>`
        steps += `<button onClick="stepStatus(${index}, ${item.idStep})">done</button>${step}<button onClick="stepDelete(${index}, ${item.idStep})">del</button>`
    });
    stepPanel.innerHTML = steps;
};

const openSidePanel = (taskId) => {
    // visual actions
    sidePanel.classList.add('side--panel--visible');
    const closePanel = document.querySelector('#btn--close--side--panel');
    closePanel.addEventListener('click', () => {
        sidePanel.classList.remove('side--panel--visible');
    });
    //assign an index from idTask
    indexTask = tasksArray.findIndex(el => el.idTask === taskId);
    // call new ul if task has no steps
    const newUl = `<ul class="ul--with--steps"></ul>`
    containerForSteps.innerHTML = newUl;
    // The place where we set the steps
    stepPanel = document.querySelector('.ul--with--steps');
    if (tasksArray[indexTask].step.length > 0) renderStep(indexTask);
};

const addStepToTask = (value) => {
    const step = {
        value,
        idStep,
        done: false,
    };
    idStep++;
    tasksArray[indexTask].step.push(step)
    renderStep(indexTask);
};

const renderTasks = () => {
    const tasks = tasksArray.filter(el => !el.done);
    const doneTasks = tasksArray.filter(el => el.done);
    let task = '';
    let doneTask = '';
    tasks.forEach((item) => {
        task +=
            `<div class="task ${darkModeSwitch}">
            <button class="btn--passive" onClick=taskStatus(${item.idTask})><i class="fas fa-check"></i></button>
            <li onClick="openSidePanel(${item.idTask})">${item.value}</li>
            <button class="btn--delete" onClick=taskDelete(${item.idTask})><i class="fas fa-trash fas--color"></i></button>
        </div>`

    });
    doneTasks.forEach((item) => {
        doneTask +=
            `<div class="task ${darkModeSwitch}">
            <button class="btn--passive" onClick=taskStatus(${item.idTask})><i class="fas fa-check"></i></button>
            <li onClick="openSidePanel(${item.idTask})">${item.value}</li>
            <button class="btn--delete" onClick=taskDelete(${item.idTask})><i class="fas fa-trash fas--color"></i></button>
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

const taskDelete = (id) => {
    const index = tasksArray.findIndex(el => el.idTask === id);
    tasksArray.splice(index, 1);
    sidePanel.classList.remove('side--panel--visible');
    renderTasks();
};

const stepStatus = (index, idStep) => {
    const stepIndex = tasksArray[index].step.findIndex(el => el.idStep === idStep);
    tasksArray[index].step[stepIndex].done = !tasksArray[index].step[stepIndex].done;
    renderStep(index)
};

const stepDelete = (index, idStep) => {
    const stepIndex = tasksArray[index].step.findIndex(el => el.idStep === idStep);
    tasksArray[index].step.splice(stepIndex, 1);
    renderStep(index);
}

const darkMode = () => {
    if (mainBackground.style.backgroundColor === 'rgb(18, 18, 18)') {
        mainBackground.style.backgroundColor = 'rgb(252, 252, 252';
        headerDoneTask.classList.remove('dm--white');
        darkModeSwitch = '';
    } else {
        mainBackground.style.backgroundColor = 'rgb(18, 18, 18)';
        headerDoneTask.classList.add('dm--white');
        darkModeSwitch = 'dm--task';
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
        !inputStep.value.trim() ? wrongData('step') : addStepToTask(inputStep.value);
        inputStep.value = '';
    };
});
darkModeBtn.addEventListener('click', darkMode);


