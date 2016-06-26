'use strict';

var Process = require('kernel.Process');

class Planner extends Process {
  // isCheckNeeded(room) {
  //   if(!room.controller) return false;
  //   if(room.memory.lastPlannerCheck !== room.controller.level) return true;
  //
  //   return false;
  // }
  constructor(data) {
    super(Process, Process);
    this.room = data.room;
  }

  run() {
  }
}

module.exports = Planner;
