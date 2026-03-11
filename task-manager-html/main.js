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

  const paragraphElementTask = document.createElement('p');

  paragraphElementTask.addEventListener('click', () => handleClick(paragraphElementTask))

  const iconElementTask = document.createElement('i');
  iconElementTask.classList.add('fa-regular', 'fa-trash-can', 'task-item-trash');
  
  iconElementTask.addEventListener('click', () => {
    divElementTask.remove();
  })

  tasksContainer.appendChild(divElementTask);

  divElementTask.classList.add('task-item');
  divElementTask.appendChild(paragraphElementTask);
  divElementTask.appendChild(iconElementTask);
  paragraphElementTask.textContent = taskInput.value;

  taskInput.value = '';

}

const handleClick = (paragraphElementTask) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    if (task.firstChild.isSameNode(paragraphElementTask)) {
      task.firstChild.classList.toggle('completed');
    }
  }
}

const handleInputChange = () => {
  const inputIsValid = validadeInput();

  if (inputIsValid) {
    return taskInput.classList.remove('error');
  }
}

taskInput.addEventListener('change', () => handleInputChange());
taskButton.addEventListener('click', () => handleAddTask());

