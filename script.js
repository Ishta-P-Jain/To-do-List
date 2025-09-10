let tasks = []; //EMPTY LIST CREATED


//WHEN THE PAGE RE-OPENS THE STORED/SAVED LIST WILL BE RESTORED
document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
        tasks = storedTasks;
        updateTaskList();  //UPDATES THE TASK LIST WHEN THE PAGE RE-OPENS
        updateStats(); //UPDATES THE STATS WHEN THE PAGE RE-OPENS
    }
});

const addTask = () => {
    const taskInput = document.getElementById("taskInput"); //INPUT FROM THE USER
    //"trim()" IS USED TO REMOVE THE SPACES BEFORE AND AFTER THE STRING
    const text = taskInput.value.trim();

    if (text) { //IF THE STRING IS NOT EMPTY
        tasks.push({ text, completed: false }); //ADDS THE TASK TO THE LIST
        taskInput.value = ""; //CLEARS THE INPUT FIELD
        updateTaskList();
        updateStats();
        saveTasks(); //SAVES THE TASKS TO LOCAL STORAGE
    }
};


const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed; //TOGGLES THE COMPLETION STATUS
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text; //LOADS THE TASK TEXT BACK TO THE INPUT BOX FOR EDITING
    tasks.splice(index, 1); //REMOVES THE TASK FROM THE LIST
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    //CALCULATES THE PROGRESS PERCENTAGE
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    document.getElementById('progress').style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
};

const updateTaskList = () => {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ""; //CLEARS THE OLD LIST
    
    //LOOPS THROUGH ALL THE TASKS AND ADDS THEM TO THE LIST
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png" alt="Edit" onclick="editTask(${index})"/>
                    <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" onclick="deleteTask(${index})"/>
                </div>
            </div>
        `;
        listItem.querySelector('.checkbox').addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });
};

document.getElementById("newTask").addEventListener('click', (e) => {
    e.preventDefault(); // PREVENTING FROM RELOADING THE PAGE
    addTask();
});

//SAVES THE TASK INTO THE LOCAL STORAGE
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
