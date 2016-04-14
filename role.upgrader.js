/* jshint esversion: 6, globalstrict: true */
"use strict";

Creep.prototype.hasSetUp = function() {
    return this.memory.setUp === true && this.memory.controllerId && this.memory.storageId;
};

Creep.prototype.setUp = function() {
    // this version work only if storage is next to upgrader which is next to controller
    let storages = this.room.find(FIND_MY_STRUCTURES, {filter: e => e.structureType == STRUCTURE_STORAGE});
    if (storages.length) {
        let storage = this.pos.findClosestByPath(storages);
        this.memory.storageId = storage.id;
    }

    let controller = this.room.controller;
    this.memory.controllerId = controller.id;

    let upgradePerTick = this.getActiveBodyparts(WORK);
    this.memory.upgradePerTick = upgradePerTick;

    this.memory.setUp = true;
    return OK;
};

module.exports = (creep) => {
    if (!creep.hasSetUp()) { 
        creep.setUp(); 
        if (!creep.hasSetUp()) {
            return;
        }
    }
 
    if (creep.carry.energy <= creep.memory.upgradePerTick + 1) {
        let storage = Game.getObjectById(creep.memory.storageId);
        storage.transfer(creep, RESOURCE_ENERGY);
    }

    let controller = Game.getObjectById(creep.memory.controllerId);
    let returnCode = creep.upgradeController(controller);
    if (returnCode == ERR_NOT_IN_RANGE) creep.moveTo(controller);
};
