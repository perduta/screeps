'use strict';

var Process = require('kernel.Process');

class Wait extends Process {
  run() {
    let startTime = Game.cpu.getUsed();
    let endTime = startTime += 3;
    while(Game.cpu.getUsed() < endTime);
  }
}

module.exports = Wait;
