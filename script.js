const climber = document.querySelector('#climber');
const counter = document.querySelector('.counter');
const start = document.querySelector('.start');

const arr = [
  {
    gorizont: '13%',
    vertical: '6%',
  },
  {
    gorizont: '18%',
    vertical: '26%',
  },
  {
    gorizont: '25%',
    vertical: '48%',
  },
  {
    gorizont: '35%',
    vertical: '52%',
  },
  {
    gorizont: '42%',
    vertical: '72%',
  },
  {
    gorizont: '50%',
    vertical: '56%',
  },
  {
    gorizont: '56%',
    vertical: '36%',
  },
  {
    gorizont: '65%',
    vertical: '28%',
  },
  {
    gorizont: '69%',
    vertical: '54%',
  },
  {
    gorizont: '73%',
    vertical: '80%',
  },
];
const arrRock = [
  {
    gorizont: '12.5%',
    vertical: '27%',
  },
  {
    gorizont: '17.5%',
    vertical: '46%',
  },
  {
    gorizont: '24.5%',
    vertical: '67%',
  },
  {
    gorizont: '34.5%',
    vertical: '72%',
  },
  {
    gorizont: '41.5%',
    vertical: '92%',
  },
  {
    gorizont: '49.5%',
    vertical: '76%',
  },
  {
    gorizont: '55.5%',
    vertical: '56%',
  },
  {
    gorizont: '64.5%',
    vertical: '47%',
  },
  {
    gorizont: '68.5%',
    vertical: '75%',
  },
  {
    gorizont: '73%',
    vertical: '99%',
  },
];

let i = 0;
function act(event) {
  if (event.code === 'KeyZ' || event.code === 'ArrowLeft') {
    if (i > 9) {
      i = 9;
    }
    i--;
    climber.style.left = arr[i].gorizont;
    climber.style.bottom = arr[i].vertical;
  } else if (event.code === 'KeyX' || event.code === 'ArrowRight') {
    if (i < 0) {
      i = 0;
    }
    i++;
    climber.style.left = arr[i].gorizont;
    climber.style.bottom = arr[i].vertical;
    if (i === 9) {
      const img = document.createElement('img');
      img.id = 'flag';
      img.setAttribute('src', 'img/win.gif');
      climber.after(img);
    }
  }
}
addEventListener('keydown', act);

function startGame() {
  let level = getComplexity();
  let speedGame;
  switch (level) {
    case 'easy':
      speedGame = 2000;
      break;
    case 'medium':
      speedGame = 1000;
      break;
    case 'hard':
      speedGame = 500;
      break;
    default:
      speedGame = 100;
      break;
  }
  let timerSetting = setInterval(time, 1000);
  let settingGameSpeed = setInterval(rockfall, speedGame);
  function rockfall() {
    const randomNumber = Math.floor(Math.random() * 10);
    const rock = document.createElement('img');
    rock.className = 'rock';
    rock.style.animationName = 'rock' + (randomNumber + 1);
    rock.setAttribute('src', 'img/Валун.png');
    climber.after(rock);
    rock.style.left = arrRock[randomNumber].gorizont;
    rock.style.bottom = arrRock[randomNumber].vertical;
    setInterval(() => {
      const climberVer = parseInt(window.getComputedStyle(climber).getPropertyValue('bottom'));
      const rockVer = parseInt(window.getComputedStyle(rock).getPropertyValue('bottom'));
      const climberGor = parseInt(window.getComputedStyle(climber).getPropertyValue('left'));
      const rockGor = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));
      const heigC = parseInt(window.getComputedStyle(climber).getPropertyValue('height'));
      const widC = parseInt(window.getComputedStyle(climber).getPropertyValue('width'));
      const widR = parseInt(window.getComputedStyle(rock).getPropertyValue('width'));

      if (climberVer + heigC > rockVer && climberVer < rockVer
        && rockGor + (widR / 2) > climberGor
        && rockGor + (widR / 2) < climberGor + widC) {
        alert('FATALITY');
        counter.textContent = 0;
        clearInterval(timerSetting);
        clearInterval(settingGameSpeed);
      }
    }, 10);
    setTimeout(() => {
      rock.remove('rock');
    }, 5000);
  }
  let j = 0;
  function time() {
    if (j === 60) {
      alert('Your WIN');
      counter.textContent = 0;
      clearInterval(timerSetting);
      clearInterval(settingGameSpeed);
    } else {
      j++;
      counter.textContent = j;
    }
  }
}
start.addEventListener('click', startGame);

function getComplexity() {
  const select = document.querySelector('#list');
  const value = select.value;
  return value;
}
