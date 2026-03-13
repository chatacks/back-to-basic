const hoursHand = document.querySelector('.hand.hours');
const minutesHand = document.querySelector('.hand.minutes');
const secondsHand = document.querySelector('.hand.seconds');

const setRotation = (element, rotationPercentage) => {
  element.style.setProperty('--rotation', rotationPercentage * 360);
};

const setClock = () => {
  const currentDate = new Date();

  const hoursPercentage = currentDate.getHours() / 12;
  const minutesPercentage = currentDate.getMinutes() / 60;
  const secondsPercentage = currentDate.getSeconds() / 60;

  setRotation(hoursHand, hoursPercentage);
  setRotation(minutesHand, minutesPercentage);
  setRotation(secondsHand, secondsPercentage);
};

setClock();

setInterval(setClock, 1000);
