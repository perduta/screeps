'use strict';

var Creep = require('controller.creeps.Creep');

class Harvester extends Creep {
  run() {
    this.creep.say('C' + this.creep.name);
  }
}

module.exports = Harvester;
