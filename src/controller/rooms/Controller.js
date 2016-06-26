'use strict';

var Process = require('kernel.Process');

class Controller extends Process {
  run() {
    _.forEach(Game.rooms, room => {
      kernel.queueProcess('controller.rooms.Planner', {room: room});
    });
  }
}

module.exports = Controller;
