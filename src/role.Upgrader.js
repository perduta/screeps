"use strict";

let BaseCreep = require('role.BaseCreep');

function Upgrader(creep) {
    BaseCreep.call(this, creep);
}
Upgrader.prototype = new BaseCreep();
Upgrader.prototype.constructor = Upgrader;

Upgrader.prototype.work = function() {
    let controller = this.room.controller;
    let storage = this.room.storage;

    if(!this.pos.inRangeTo(controller, 3)) {
        this.moveTo(controller);
    }

    if(!this.pos.isNearTo(storage)) {
        this.moveTo(storage);
    }
    if(this.pos.isNearTo(storage) && this.carry.energy <= this.getActiveBodyparts(WORK)) {
        storage.transfer(this.creep, RESOURCE_ENERGY);
    }

    this.upgradeController(controller);
};

module.exports = Upgrader;
