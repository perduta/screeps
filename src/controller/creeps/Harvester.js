'use strict';

var Creep = require('controller.creeps.Creep');

class Harvester extends Creep {
  findUnclaimedSources() {
    let sources = this.creep.room.find(FIND_SOURCES);
    let harvestersWithSource = this.creep.room.find(FIND_MY_CREEPS, {filter: c => c.memory.class === 'Harvester' && c.memory.source});

    let unclaimedSources = sources;
    _.forEach(harvestersWithSource, c => {
      let harvesterSource = Game.getObjectById(c.memory.source);
      _.pull(unclaimedSources, harvesterSource);
    });

    return unclaimedSources;
  }

  assignToSource() {
    if (this.creep.memory.source) {
      return;
    }

    let closestUnclaimedSource = this.creep.pos.findClosestByPath(this.findUnclaimedSources());
    if(!closestUnclaimedSource) {
      return;
    }

    this.creep.memory.source = closestUnclaimedSource.id;
  }

  setUpSource() {
    this.assignToSource();
    this.source = Game.getObjectById(this.creep.memory.source);
  }

  moveToSource() {
    if(!this.creep.pos.isNearTo(this.source)) {
      this.creep.moveTo(this.source);
    }
  }

  harvest() {
    if(!this.creep.isFull() && this.source.energy > 0) {
      this.creep.harvest(this.source);
    }
  }

  run() {
    this.setUpSource();
    this.moveToSource();
    this.harvest();
  }
}

module.exports = Harvester;
