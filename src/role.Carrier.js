"use strict";

let BaseCreep = require('role.BaseCreep');

function CarrierCreep(creep) {
    BaseCreep.call(this, creep);
}
CarrierCreep.prototype = new BaseCreep();
CarrierCreep.prototype.constructor = CarrierCreep;

CarrierCreep.prototype.checkState = function() {
    if(!this.memory.collecting && this.carry.energy === 0) {
        this.memory.collecting = true;
    }
    else if(this.memory.collecting && this.carry.energy === this.carryCapacity) {
        this.memory.collecting = false;
    }
};

CarrierCreep.prototype.getDroppedEnergy = function() {
    if(!this.memory.droppedEnergy) {
        let droppedEnergies = this.room.find(FIND_DROPPED_RESOURCES, {filter: o => o.resourceType === RESOURCE_ENERGY && o.amount >= 50});
        let closestDroppedEnergy = this.pos.findClosestByPath(droppedEnergies);
        if(closestDroppedEnergy) {
            this.memory.droppedEnergy = closestDroppedEnergy.id;
            return closestDroppedEnergy;
        }
    }
    else {
        let droppedEnergy = Game.getObjectById(this.memory.droppedEnergy);
        if(!droppedEnergy) delete this.memory.droppedEnergy;
        return droppedEnergy;
    }
};

CarrierCreep.prototype.getDeliveryTarget = function() {
    if(!this.memory.deliveryTarget) {
        let deliveryTarget = this.chooseDeliveryTarget();
        if(deliveryTarget) {
            this.memory.deliveryTarget = deliveryTarget.id;
            return deliveryTarget;
        }
    }
    else {
        let deliveryTarget = Game.getObjectById(this.memory.deliveryTarget);
        if(deliveryTarget.structureType === STRUCTURE_CONTAINER || deliveryTarget.structureType === STRUCTURE_STORAGE) {
            if(!deliveryTarget || _.sum(deliveryTarget.store) === deliveryTarget.storeCapacity) delete this.memory.deliveryTarget;
        }
        else {
            if(!deliveryTarget || deliveryTarget.energy === deliveryTarget.energyCapacity) delete this.memory.deliveryTarget;
        }
        return deliveryTarget;
    }
};

CarrierCreep.prototype.chooseDeliveryTarget = function() {
    let possibleTargets = [
        {find: FIND_MY_STRUCTURES, filter: o => o.structureType === STRUCTURE_TOWER && o.energy < o.energyCapacity / 2},
        {find: FIND_MY_STRUCTURES, filter: o => (o.structureType === STRUCTURE_SPAWN || o.structureType === STRUCTURE_EXTENSION) && o.energy < o.energyCapacity},
        {find: FIND_MY_STRUCTURES, filter: o => o.structureType === STRUCTURE_LAB && o.energy < o.energyCapacity},
        {find: FIND_MY_STRUCTURES, filter: o => o.structureType === STRUCTURE_TERMINAL && o.energy < o.energyCapacity * 0.1},
        {find: FIND_MY_STRUCTURES, filter: o => (o.structureType === STRUCTURE_CONTAINER || o.structureType === STRUCTURE_STORAGE) && _.sum(o.store) !== o.storeCapacity},
    ];

    let target;
    _.forEach(possibleTargets, o => {
        target = this.pos.findClosestByPath(this.room.find(o.find, {filter: o.filter}));
        if(target) return false;
    });
    return target;
};

CarrierCreep.prototype.collectEnergy = function() {
    if(!this.memory.collecting) return;
    let droppedEnergy = this.getDroppedEnergy();
    if(!droppedEnergy) return;
    if(!this.pos.isNearTo(droppedEnergy)) {
        this.moveTo(droppedEnergy);
    }
    this.pickup(droppedEnergy);
};

CarrierCreep.prototype.deliverEnergy = function() {
    if(this.memory.collecting) return;
    let deliveryTarget = this.getDeliveryTarget();
    if(!deliveryTarget) return;
    if(!this.pos.isNearTo(deliveryTarget)) {
        this.moveTo(deliveryTarget);
    }
    this.transfer(deliveryTarget, RESOURCE_ENERGY);
};

CarrierCreep.prototype.work = function() {
    this.checkState();
    this.collectEnergy();
    this.deliverEnergy();
};

module.exports = CarrierCreep;
