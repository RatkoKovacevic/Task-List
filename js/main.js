// Define UI let 
const form = document.querySelector('#task-form');
const takslist = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taksInput = document.querySelector('#task');

// Load all events listeners 
loadEventlisteners();

function loadEventlisteners() {
  // Dom load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event 
  form.addEventListener('submit', addTask);
  //Remove task event
  takslist.addEventListener('click', removeTask);
  //Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
};

// Get Tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create tesht node and append to li 
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html 
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Appen li to ul
    takslist.appendChild(li);
  });
}

//Add Task
function addTask(e) {
  if (taksInput.value === '') {
    alert('Add a task');
  }
  //Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  //Create tesht node and append to li 
  li.appendChild(document.createTextNode(taksInput.value));
  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html 
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append the link to li
  li.appendChild(link);
  //Appen li to ul
  takslist.appendChild(li);
  // Store in local storage
  storeTaskInLocalStorage(taksInput.value);
  //Clear input
  taksInput.value = '';

  e.preventDefault();
};
// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    };
  };
};
// Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear Tasks
function clearTasks(e) {
  while (takslist.firstChild) {
    takslist.removeChild(takslist.firstChild);
  }
  clearTasksFromLocalStorage();
}

// Clear task from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
};