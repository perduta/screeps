"use strict";

let BaseCreep = require('role.BaseCreep');

function MineralHarvester(creep) {
    BaseCreep.call(this, creep);
}
MineralHarvester.prototype = new BaseCreep();
MineralHarvester.prototype.constructor = MineralHarvester;

MineralHarvester.prototype.work = function() {
    if(!this.memory.mineral) {
        let mineral = this.pos.findClosestByPath(this.room.find(FIND_MINERALS));
        if(!mineral) return;
        this.memory.mineral = mineral.id;
    }

    if(this.memory.mineral) {
        if(_.sum(this.carry) !== this.carryCapacity) {
            let mineral = Game.getObjectById(this.memory.mineral);
            if(!mineral) return;
            if(!this.pos.isNearTo(mineral)) {
                this.moveTo(mineral);
            }
            this.harvest(mineral);
        }
        else {
            let mineral = Game.getObjectById(this.memory.mineral);
            let storage = this.room.terminal;
            if(!storage || storage.store[mineral.mineralType] >= 10000) {
                storage = this.room.storage;
            }
            if(!this.pos.isNearTo(storage)) {
                this.moveTo(storage);
            }
            this.transfer(storage, mineral.mineralType);
        }
    }
};

module.exports = MineralHarvester;
