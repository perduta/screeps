'use strict';

var Process = require('kernel.Process');

class Controller extends Process {
  run() {
    _.forEach(Game.creeps, creep => {
      if (!creep.memory.class) {
        return;
      }

      let creepClass = 'controller.creeps.' + creep.memory.class;
      kernel.queueProcess(creepClass, {id: creep.id});
    });
  }
}

module.exports = Controller;
