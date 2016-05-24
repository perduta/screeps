"use strict";

let BaseCreep = require('role.BaseCreep');

function MineralWorker(creep) {
    BaseCreep.call(this, creep);
}
MineralWorker.prototype = new BaseCreep();
MineralWorker.prototype.constructor = MineralWorker;

MineralWorker.prototype.work = function() {
    let lab_keanium = Game.getObjectById('572377df163b3c8d24172434');
    let lab_zynthium = Game.getObjectById('5723b1fa2074713a74a033b5');
    let lab_zk = Game.getObjectById('572380d7511c137a240b0dab');
    let lab_xgh20 = Game.getObjectById('5734b899d19c687713dfd55e');
    let terminal = this.room.terminal;

    if((lab_keanium.mineralAmount + this.carryCapacity) <= lab_keanium.mineralCapacity) {
        if(_.sum(this.carry) !== this.carryCapacity) {
            this.moveTo(terminal);
            terminal.transfer(this, RESOURCE_KEANIUM);
        }
        else {
            this.moveTo(lab_keanium);
            this.transfer(lab_keanium, RESOURCE_KEANIUM);
        }
        return;
    }

    if((lab_zynthium.mineralAmount + this.carryCapacity) <= lab_zynthium.mineralCapacity) {
        if(_.sum(this.carry) !== this.carryCapacity) {
            this.moveTo(terminal);
            terminal.transfer(this, RESOURCE_ZYNTHIUM);
        }
        else {
            this.moveTo(lab_zynthium);
            this.transfer(lab_zynthium, RESOURCE_ZYNTHIUM);
        }
        return;
    }

    if(lab_zk.mineralAmount >= this.carryCapacity) {
        if(_.sum(this.carry) !== this.carryCapacity) {
            this.moveTo(lab_zk);
            lab_zk.transfer(this, RESOURCE_ZYNTHIUM_KEANITE);
        }
        else {
            this.moveTo(terminal);
            this.transfer(terminal, RESOURCE_ZYNTHIUM_KEANITE);
        }
        return;
    }

    if((lab_xgh20.mineralAmount + this.carryCapacity) <= lab_xgh20.mineralCapacity) {
        if(_.sum(this.carry) !== this.carryCapacity) {
            this.moveTo(terminal);
            terminal.transfer(this, RESOURCE_CATALYZED_GHODIUM_ACID);
        }
        else {
            this.moveTo(lab_xgh20);
            this.transfer(lab_xgh20, RESOURCE_CATALYZED_GHODIUM_ACID);
        }
    }
};

module.exports = MineralWorker;
