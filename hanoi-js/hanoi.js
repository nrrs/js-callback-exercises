const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hanoi {
  constructor() {
    this.stacks = [[3, 2, 1], [], []];
  }

  promptMove(callback) {
    // 1. Prints the stacks
    this.print();

    // 2. Ask user for move
    let start, end;
    reader.question("Choose a stack to draw from: ", (response1) => {
      start = response1;
      reader.question("Choose a destination stack: ", (response2) => {
        end = response2;
        console.log(`Choosing from: ${response1}`);
        console.log(`Dropping at: ${response2}`);
        callback(start, end);
      });
    });
  }

  isValidMove(startIdx, endIdx) {
    const startLast = this.stacks[startIdx].length-1;
    const endLast = this.stacks[endIdx].length-1;
    // const startLast = this._lastIndex(startIdx);
    // const endLast = this._lastIndex(endIdx);

    let startTop = this.stacks[startIdx][startLast];
    let endTop = this.stacks[endIdx][endLast];

    return (startTop > endTop) ? false : true;
  }

  _lastIndex(idx) {
    return this.stacks[idx].length-1;
  }

  move(startIdx, endIdx) {
    if (this.isValidMove(startIdx, endIdx)) {
      console.log('Valid move.');
      let moveDisk = this.stacks[startIdx].pop();
      this.stacks[endIdx].push(moveDisk);
      this.print();
      return true;
    } else {
      console.log(`Invalid move.`);
      return false;
    }
  }

  print() {
    // console.log(JSON.stringify(this.stacks));
    console.log(this.stacks);
  }

  isWon() {
    for (let i = 1; i < this.stacks.length; i++) {
      if (this.stacks[i].length === 3) {
        return true;
      }
    }
  }

  run(completionCallback) {
    this.promptMove((startIdx, endIdx) => {
      this.move(startIdx, endIdx);

      if (this.isWon()) {
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    });
  }
}

let game = new Hanoi();
// game.promptMove(() => game.print());
// console.log(game.isValidMove(0, 1));
// game.move(0, 1);
// game.print();
game.run(() => console.log("finished!") );
