"use strict";

let BaseCreep = require('role.BaseCreep');

function ScoutCreep(creep) {
    BaseCreep.call(this, creep);
}
ScoutCreep.prototype = new BaseCreep();
ScoutCreep.prototype.constructor = ScoutCreep;

ScoutCreep.prototype.work = function() {
    // set mode
    if (this.memory.harvesting && this.carry.energy === this.carryCapacity) {
        this.memory.harvesting = false;
    }
    else if (!this.memory.harvesting && this.carry.energy === 0) {
        this.memory.harvesting = true;
    }

    // harvesting
    if (this.memory.harvesting) {
        var source = this.pos.findClosestByPath(this.room.find(FIND_SOURCES, {filter: e => e.energy !== 0}));
        if (!source) return;
        if (!this.pos.isNearTo(source)) this.moveTo(source);
        else this.harvest(source);
    }

    // not harvesting
    else {
        var spawn = this.pos.findClosestByPath(this.room.find(FIND_MY_STRUCTURES, {filter: e => (e.structureType === STRUCTURE_SPAWN || e.structureType === STRUCTURE_EXTENSION) && e.energy < e.energyCapacity}));
        if (!spawn) return;
        if (!this.pos.isNearTo(spawn)) this.moveTo(spawn);
        else this.transfer(spawn, RESOURCE_ENERGY);
    }
};

module.exports = ScoutCreep;
