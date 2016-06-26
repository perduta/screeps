'use strict';

var Process = require('kernel.Process');

class Creep extends Process {
  constructor(data) {
    super(Process, Process);
    this.creep = Game.getObjectById(data.id);
  }
}

module.exports = Creep;
