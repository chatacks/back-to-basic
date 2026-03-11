const taskButton = document.querySelector('button');
const taskInput = document.querySelector('input');
const tasksContainer = document.querySelector('.task-container');

const validadeInput = () => taskInput.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validadeInput();

  if (!inputIsValid) {
    return taskInput.classList.add('error');
  }

  const divElementTask = document.createElement('div');
  divElementTask.classList.add('task-item');

  const paragraphElementTask = document.createElement('p');
  paragraphElementTask.textContent = taskInput.value;

  paragraphElementTask.addEventListener('click', () => handleClick(paragraphElementTask));

  const iconElementTask = document.createElement('i');
  iconElementTask.classList.add('fa-regular', 'fa-trash-can', 'task-item-trash');

  iconElementTask.addEventListener('click', () => {
    divElementTask.remove();
    updateLocalStorage();
  });

  divElementTask.appendChild(paragraphElementTask);
  divElementTask.appendChild(iconElementTask);

  tasksContainer.appendChild(divElementTask);

  taskInput.value = '';

  updateLocalStorage();
};

const handleClick = (paragraphElementTask) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    if (task.firstChild.isSameNode(paragraphElementTask)) {
      task.firstChild.classList.toggle('completed');
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validadeInput();

  if (inputIsValid) {
    return taskInput.classList.remove('error');
  }
};

const updateLocalStorage = () => {
  const tasks = tasksContainer.children;

  const localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains('completed');

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

  for (const task of tasksFromLocalStorage) {
    const divElementTask = document.createElement('div');
    divElementTask.classList.add('task-item');

    const paragraphElementTask = document.createElement('p');
    paragraphElementTask.textContent = task.description;

    paragraphElementTask.addEventListener('click', () => handleClick(paragraphElementTask));

    const iconElementTask = document.createElement('i');
    iconElementTask.classList.add('fa-regular', 'fa-trash-can', 'task-item-trash');

    iconElementTask.addEventListener('click', () => {
      divElementTask.remove();
      updateLocalStorage();
    });

    divElementTask.appendChild(paragraphElementTask);
    divElementTask.appendChild(iconElementTask);

    tasksContainer.appendChild(divElementTask);

    if (task.isCompleted) {
      paragraphElementTask.classList.add('completed');
    }
  }
};

refreshTasksUsingLocalStorage();

taskInput.addEventListener('change', () => handleInputChange());

taskButton.addEventListener('click', () => handleAddTask());
