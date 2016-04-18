function setDestinationId(creep, findFor, findOpts) {
    if (creep.memory.destinationId) return;
    var targetsWithNoEnergy = creep.room.find(findFor, findOpts);
    if (!targetsWithNoEnergy.length) return;
    var destination = creep.pos.findClosestByPath(targetsWithNoEnergy);
    if (!destination) return;
    creep.memory.destinationId = destination.id;
}

module.exports = c => {
    // set flags
    if (!c.memory.sourceFlagId) {
        c.memory.sourceFlagId = Game.flags.Flag1.id;
        c.memory.destinationFlagId = Game.flags.Flag3.id;
    }
    
    // set "collecting" value
    if (c.memory.collecting && c.carry.energy === c.carryCapacity) {
        c.memory.collecting = false;
    }
    else if (!c.memory.collecting && c.carry.energy === 0) {
        c.memory.collecting = true;
    }
    
    var sourceFlag = Game.getObjectById(c.memory.sourceFlagId);
    var destinationFlag = Game.getObjectById(c.memory.destinationFlagId);
    
    // if looking for energy and not in source room
    if(c.memory.collecting && c.room.name !== sourceFlag.roomName) {
        c.moveTo(sourceFlag);
    }
    
    // if looking for energy in source room
    else if(c.memory.collecting && c.room.name === sourceFlag.roomName) {
        var droppedEnergy = c.pos.findClosestByPath(c.room.find(FIND_DROPPED_ENERGY, {filter: e => e.amount >= 50}));
        if (!droppedEnergy) return;
        var returnCode = c.pickup(droppedEnergy);
        if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(droppedEnergy);
    }
    
    // if delivering energy and not in destination room
    else if(!c.memory.collecting && c.room.name !== destinationFlag.roomName) {
        c.moveTo(destinationFlag);
    }
    
    // if delivering energy in destination room
    else if(!c.memory.collecting && c.room.name === destinationFlag.roomName) {
        setDestinationId(c, FIND_MY_STRUCTURES, {filter: (e) => e.structureType == STRUCTURE_TOWER && e.energy < e.energyCapacity / 2});
        setDestinationId(c, FIND_MY_STRUCTURES, {filter: (e) => (e.structureType == STRUCTURE_SPAWN || e.structureType == STRUCTURE_EXTENSION) && e.energy < e.energyCapacity});
        setDestinationId(c, FIND_STRUCTURES, {filter: (e) => (e.structureType === STRUCTURE_CONTAINER || e.structureType === STRUCTURE_STORAGE) && e.store.energy < e.storeCapacity});
        
        // then transfering him energy
        var destination = Game.getObjectById(c.memory.destinationId);
        if(!destination) { delete c.memory.destinationId; return; }
        var returnCode = c.transfer(destination, RESOURCE_ENERGY);
        if (returnCode === OK || returnCode === ERR_FULL) delete c.memory.destinationId;
        else if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(destination);
    }
};

