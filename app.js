const modale = document.querySelector('.modal--restart');
const span = document.querySelector('.message');
const startBtn = document.querySelector('.start-button');
const levelHtml = document.querySelector('.level');

class Game {
  constructor(board) {
    this.board = board;
    this.totalTarget = 0;
    this.totalTargetRemove = 0;
    this.level = 1;
    this.speed = 2000;
    this.spawnInterval = null;
  }

  start() {
    this.totalTarget = 0;
    this.totalTargetRemove = 0;
    modale.classList.add('hidden');
    this.clearBoard();
    levelHtml.textContent = this.level;
    this.spawnInterval = setInterval(() => {
      if (this.totalTarget >= 10) {
        clearInterval(this.spawnInterval);
        this.lost();
      } else {
        this.addTarget();
      }
    }, this.speed);
  }

  win() {
    clearInterval(this.spawnInterval);
    modale.classList.remove('hidden');
    span.textContent = 'You win!';
    this.level++;
    this.upgradeDifficulty();
  }

  lost() {
    clearInterval(this.spawnInterval);
    modale.classList.remove('hidden');
    span.textContent = 'You lost...';
    this.level = 1;
  }

  clearBoard() {
    let targets = document.querySelectorAll('.target');
    targets.forEach(target => target.remove());
    this.totalTarget = 0;
  }

  getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  getRandomColor() {
    const colors = ['#C947F5', '#00CCFF', '#FF01BA', '#31F4A3', '#F95D5D', '#E4F53B'];
    return colors[this.getRandomNumber(colors.length)];
  }

  getRandomPosition() {
    return Math.round(Math.random() * 10000) / 100;
  }

  getRandomSize() {
    return Math.floor(Math.random() * 40.99) + 20;
  }

  upgradeDifficulty() {
    this.speed = Math.max(500, this.speed - 200);
  }

  addTarget() {
    const target = new Target(
      this.getRandomPosition(),
      this.getRandomPosition(),
      this.getRandomSize(),
      this.getRandomColor()
    ).toHtml();

    target.addEventListener('click', () => {
      target.remove();
      this.totalTarget--;
      this.totalTargetRemove++;
      if (this.totalTargetRemove >= 10 && this.totalTarget < 1) {
        this.win();
      }
    });

    this.board.appendChild(target);
    this.totalTarget++;
  }
}

class Target {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  toHtml() {
    const div = document.createElement('div');
    div.className = 'target';
    div.style.top = `max(0px, calc(${this.y}% - ${this.size}px))`;
    div.style.left = `max(0px, calc(${this.x}% - ${this.size}px))`;
    div.style.height = this.size + 'px';
    div.style.width = this.size + 'px';
    div.style.backgroundColor = this.color;

    return div;
  }
}

startBtn.addEventListener('click', () => {
  game.start();
});

const game = new Game(document.querySelector('.game'));

game.start();

