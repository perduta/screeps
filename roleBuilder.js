module.exports = c => {
    if (c.carry.energy === 0) {
        c.memory.building = false;
    }
    else if (c.carry.energy === c.carryCapacity) {
        c.memory.building = true;
    }

    if(c.memory.building) {
        // targeting construction sites and building them
        var closestConstructionSite = c.pos.findClosestByPath(c.room.find(FIND_CONSTRUCTION_SITES));
        if(closestConstructionSite) {
            var returnCode = c.build(closestConstructionSite);
            if (returnCode == ERR_NOT_IN_RANGE) c.moveTo(closestConstructionSite);
            else if(returnCode == ERR_INVALID_TARGET) c.moveTo(c.room.controller);
            return returnCode;
        }

        // targeting structures and repairing them up 
        var closestNeedForRepair = c.pos.findClosestByPath(c.room.find(FIND_STRUCTURES, {filter: (e) => e.structureType !== STRUCTURE_WALL && e.hits < e.hitsMax}));
        if(closestNeedForRepair) {
            var returnCode = c.repair(closestNeedForRepair);
            if (returnCode == ERR_NOT_IN_RANGE) c.moveTo(closestNeedForRepair);
            return returnCode;
        }
    }
    else {
        //targeting spawn to gain energy from it
        var spawn = c.pos.findClosestByPath(c.room.find(FIND_STRUCTURES, {filter: e => e.structureType === STRUCTURE_CONTAINER || e.structureType === STRUCTURE_STORAGE}));
        if(!spawn) {
            spawn = c.pos.findClosestByPath(c.room.find(FIND_MY_SPAWNS, {filter: e => e.energy === e.energyCapacity}));
            if (!spawn) return;
            spawn.transferEnergy(c);
            c.moveTo(spawn);
        }
        else {
        var returnCode = spawn.transfer(c, RESOURCE_ENERGY);
        if(returnCode == ERR_NOT_IN_RANGE) c.moveTo(spawn);
        }
    }
};
