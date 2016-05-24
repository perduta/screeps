"use strict";

let BaseCreep = require('role.BaseCreep');

function RemoteCarrier(creep) {
    BaseCreep.call(this, creep);
}
RemoteCarrier.prototype = new BaseCreep();
RemoteCarrier.prototype.constructor = RemoteCarrier;

RemoteCarrier.prototype.setDestinationId = function(creep, findFor, findOpts) {
    if (creep.memory.destinationId) return;
    var targetsWithNoEnergy = creep.room.find(findFor, findOpts);
    if (!targetsWithNoEnergy.length) return;
    var destination = creep.pos.findClosestByPath(targetsWithNoEnergy);
    if (!destination) return;
    creep.memory.destinationId = destination.id;
};

RemoteCarrier.prototype.checkState = function(creep) {
    if(!creep.memory.collecting && creep.carry.energy === 0)
        creep.memory.collecting = true;
    else if(creep.memory.collecting && creep.carry.energy === creep.carryCapacity)
        creep.memory.collecting = false;
};

RemoteCarrier.prototype.assignToFlag = function(creep) {
    let i = 0;
    while(true) {
        if(creep.memory.remoteRoom) return;
        let remoteRoom = Game.flags[creep.memory.originRoom + '_remoteRoom_' + i];
        i++;
        if(!remoteRoom) break;
        _.forEach(remoteRoom.memory.carriers, carrier => {
            if(carrier.carrier && Game.getObjectById(carrier.carrier)) return;
            creep.memory.remoteRoom = remoteRoom.name;
            carrier.carrier = creep.id;
            return false;
        });
    }
};

RemoteCarrier.prototype.xMoveTo = function(creep, pos) {
    if(!creep.memory.path) {
        let pf = PathFinder.search(creep.pos, {pos: pos, range: 1}, {
            plainCost: 2,
            swampCost: 10,
            roomCallback: function(roomName) {
                if(!Game.rooms[roomName]) return;
                let costs = new PathFinder.CostMatrix;

                let roads = creep.room.find(FIND_STRUCTURES, {filter: e => e.structureType === STRUCTURE_ROAD});
                _.forEach(roads, e => costs.set(e.pos.x, e.pos.y, 1));

                let otherStructures = creep.room.find(FIND_STRUCTURES, {filter: e => e.structureType !== STRUCTURE_ROAD && e.structureType !== STRUCTURE_RAMPART});
                _.forEach(otherStructures, e => costs.set(e.pos.x, e.pos.y, 0xff));

                let harvesters = creep.room.find(FIND_MY_CREEPS, {filter: e => e.memory.role === 'harvester' || e.memory.role === 'upgrader' || e.memory.role === 'builder'});
                _.forEach(harvesters, e => costs.set(e.pos.x, e.pos.y, 0xff));

                return costs;
            }
        });

        creep.memory.path = pf.path;
    }
    if(creep.memory.path) {
        let step = creep.memory.path[0];
        creep.move(creep.pos.getDirectionTo(step));
        delete creep.memory.path;
    }
};

RemoteCarrier.prototype.work = function() {
    this.assignToFlag(this);
    this.checkState(this);

    let remoteRoom = Game.flags[this.memory.remoteRoom];
    let destinationRoom = Game.flags[this.memory.originRoom];
    if(!remoteRoom || !destinationRoom) return;

    // if looking for energy and not in remote room
    if(this.memory.collecting && this.room.name !== remoteRoom.pos.roomName) {
        //xMoveTo(this, remoteRoom.pos);
        this.moveTo(remoteRoom.pos);
        return;
    }

    // if looking for energy and in remote room
    if(this.memory.collecting && this.room.name === remoteRoom.pos.roomName) {
        let droppedEnergy;
        if(!this.memory.energy) {
            let droppedEnergies = this.room.find(FIND_DROPPED_RESOURCES, {filter: e => e.amount >= 50 && e.resourceType === RESOURCE_ENERGY});
            droppedEnergy = this.pos.findClosestByPath(droppedEnergies);
            if(!droppedEnergy) return;
            this.memory.energy = droppedEnergy.id;
        }
        else {
            droppedEnergy = Game.getObjectById(this.memory.energy);
            if(!droppedEnergy) {
                delete this.memory.energy;
                return;
            }
        }
        //xMoveTo(this, droppedEnergy.pos);
        this.moveTo(droppedEnergy.pos);
        this.pickup(droppedEnergy);
        return;
    }

    // if has energy and not in destination room
    if(!this.memory.collecting && this.room.name !== destinationRoom.room.name) {
        let constructionSites = this.room.find(FIND_CONSTRUCTION_SITES, {filter: e => e.my && e.structureType === STRUCTURE_ROAD});
        if(constructionSites.length !== 0) {
            this.moveTo(constructionSites[0].pos);
            this.build(constructionSites[0]);
            return;
        }
        //xMoveTo(this, destinationRoom.pos);
        this.moveTo(destinationRoom.pos);
        let structure = this.pos.lookFor('structure')[0];
        if(structure) this.repair(structure);
        return;
    }

    // if has energy and in destination room
    if(!this.memory.collecting && this.room.name === destinationRoom.room.name) {
        this.setDestinationId(this, FIND_MY_STRUCTURES, {filter: (e) => (e.structureType == STRUCTURE_SPAWN || e.structureType == STRUCTURE_EXTENSION) && e.energy < e.energyCapacity});
        this.setDestinationId(this, FIND_MY_STRUCTURES, {filter: (e) => e.structureType == STRUCTURE_TOWER && e.energy < e.energyCapacity});
        this.setDestinationId(this, FIND_STRUCTURES, {filter: (e) => (e.structureType === STRUCTURE_TERMINAL) && e.store.energy < 10000});
        this.setDestinationId(this, FIND_STRUCTURES, {filter: (e) => (e.structureType === STRUCTURE_CONTAINER || e.structureType === STRUCTURE_STORAGE) && e.store.energy < e.storeCapacity});
        
        let destination = Game.getObjectById(this.memory.destinationId);
        if(!destination) { delete this.memory.destinationId; return; }
        //xMoveTo(this, destination.pos);
        this.moveTo(destination.pos);
        let returnCode = this.transfer(destination, RESOURCE_ENERGY);
        if (returnCode === OK || returnCode === ERR_FULL) delete this.memory.destinationId;
        return;
    }
};

module.exports = RemoteCarrier;
