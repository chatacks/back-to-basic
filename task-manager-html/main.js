const taskButton = document.querySelector('button')
const taskInput = document.querySelector('input')


const validadeInput = () => taskInput.value.trim().length > 0;

taskButton.addEventListener('click', (e) => {
  if (!validadeInput()) {
    taskInput.style.border = '2px solid red';
  }
})