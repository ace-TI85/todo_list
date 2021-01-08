// define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
window.onload = loadEventListeners();

function loadEventListeners(){
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);

  // add task event
  form.addEventListener('submit', addTask);

  // remove task event
  taskList.addEventListener('click', removeTask);

  // clear task event
  clearBtn.addEventListener('click', removeAllTasks);

  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

function getTasksFromLocalStorage(){
  /**
   * check if tasks is empty. if so, create empty array; 
   * if not empty, then parse JSON string into array format
   */
  if (window.localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
    // create a new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
  })
}

function addTask(e){
  if (taskInput.value === ''){
    // if task input is empty, do nothing
    return;
  }

  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create a new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);

  // load into local storage
  storeTask(taskInput.value);

  //clear input
  taskInput.value = '';

  e.preventDefault();
}

function removeTask(e){
  let li = e.target.parentElement.parentElement;
  let a_tag = e.target.parentElement;
  if (a_tag.classList.contains('delete-item')){
    li.remove();
    // remove from local storage
    removeTaskFromLocalStorage(li);
  }
}

function removeAllTasks(e){
  // slower
  taskList.innerHTML = '';

  // faster
  while (taskList.firstChild){
    taskList.firstChild.remove();
    // or taskList.removeChild(taskList.removeChild);
  }

  // clear tasks from local storage
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        // show item
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}

function storeTask(task){
  let tasks;
  /**
   * check if tasks is empty. if so, create empty array; 
   * if not empty, then parse JSON string into array format
   */
  if (window.localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // push task into array list
  tasks.push(task);

  // push updated array into local storage in JSON string format
  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  /**
   * check if tasks is empty. if so, create empty array; 
   * if not empty, then parse JSON string into array format
   */
  if (window.localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
      if (taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}