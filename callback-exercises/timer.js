class Clock {
  constructor() {
    const date = new Date();
    this.hours = date.getHours();
    this.minutes = date.getMinutes();
    this.seconds = date.getSeconds();
    this.printTime();
    setInterval(this._tick.bind(this), 1000);
  }

  printTime() {
    console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
  }

  _tick() {
    if (this.seconds === 59) {
      this.minutes++;
      this.seconds = 0;
    } else if (this.minutes === 59) {
      this.hours++;
      this.minutes = 0;
    } else {
      this.seconds++;
    }
    this.printTime();
  }
}

const clock = new Clock();
