"use strict";

let BaseCreep = require('role.BaseCreep');

function PioneerCreep(creep) {
    BaseCreep.call(this, creep);
}
PioneerCreep.prototype = new BaseCreep();
PioneerCreep.prototype.constructor = PioneerCreep;

PioneerCreep.prototype.getFlag = function() {
    this.flag = Game.flags[this.memory.originRoom + '_claimRoom'];
};

PioneerCreep.prototype.isInsideFlagRoom = function() {
    return this.room.name === this.flag.pos.roomName;
};

PioneerCreep.prototype.checkState = function() {
    if(this.memory.harvesting && this.carry.energy === this.carryCapacity) {
        this.memory.harvesting = false;
    }
    else if(!this.memory.harvesting && this.carry.energy === 0) {
        this.memory.harvesting = true;
    }
};

PioneerCreep.prototype.goToTargetRoom = function() {
    if(this.isInsideFlagRoom()) return;
    this.moveTo(this.flag);
};

PioneerCreep.prototype.harvestEnergy = function() {
    if(!this.isInsideFlagRoom() || !this.memory.harvesting) return;
    let sources = this.room.find(FIND_SOURCES_ACTIVE);
    let closestSource = this.pos.findClosestByPath(sources);
    if(!closestSource) return;
    if(!this.pos.isNearTo(closestSource)) {
        this.moveTo(closestSource);
    }
    if(this.pos.isNearTo(closestSource)) {
        this.harvest(closestSource);
    }
};

PioneerCreep.prototype.buildStructuresAndUpgradeController = function() {
    if(!this.isInsideFlagRoom() || this.memory.harvesting) return;

    let constructionSites = this.room.find(FIND_MY_CONSTRUCTION_SITES);
    let closestConstructionSite = this.pos.findClosestByPath(constructionSites);
    if(closestConstructionSite) {
        if(!this.pos.inRangeTo(closestConstructionSite, 3)) {
            this.moveTo(closestConstructionSite);
        }
        if(this.pos.inRangeTo(closestConstructionSite, 3)) {
            this.build(closestConstructionSite);
        }
        return;
    }

    let controller = this.room.controller;
    if(controller) {
        if(!this.pos.inRangeTo(controller, 3)) {
            this.moveTo(controller);
        }
        if(this.pos.inRangeTo(controller, 3)) {
            this.upgradeController(controller);
        }
        return;
    }

};

PioneerCreep.prototype.work = function() {
    this.getFlag();
    if(!this.flag) return;
    this.checkState();
    this.goToTargetRoom();
    this.harvestEnergy();
    this.buildStructuresAndUpgradeController();
};

module.exports = PioneerCreep;
