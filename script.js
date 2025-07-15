const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const question = document.getElementById('question');
const buttons = document.getElementById('buttons');
const followUp = document.getElementById('followUp');
const schedule = document.getElementById('schedule');
const finalMessage = document.getElementById('finalMessage');
const confirmDate = document.getElementById('confirmDate');
const dateOptions = document.querySelectorAll('.dateOption');

let isMoving = false;

// Make "No" button move on mouseover
noBtn.addEventListener('mouseover', () => {
  moveNoButton();
});

// Make "No" button move on click too (just for fun)
noBtn.addEventListener('click', () => {
  question.textContent = 'Are you sure? 😢';
  moveNoButton();
});

function moveNoButton() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

yesBtn.addEventListener('click', () => {
  // Remove question and buttons
  question.remove();
  buttons.classList.add('hidden');
  followUp.classList.remove('hidden');
});

dateOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    followUp.classList.add('hidden');
    schedule.classList.remove('hidden');
  });
});

confirmDate.addEventListener('click', () => {
  schedule.classList.add('hidden');
  finalMessage.classList.remove('hidden');
  startConfetti();
});

function startConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      tilt: Math.random() * 10 - 10
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();
    });

    update();
  }

  function update() {
    confetti.forEach(c => {
      c.y += c.d / 2;
      c.x += Math.sin(c.tilt) * 2;
      if (c.y > canvas.height) {
        c.y = 0;
        c.x = Math.random() * canvas.width;
      }
    });
  }

  setInterval(draw, 30);
}

