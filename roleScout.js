module.exports = (c) => {
    // set mode
    if (c.memory.harvesting && c.carry.energy === c.carryCapacity) {
        c.memory.harvesting = false;
    }
    else if (!c.memory.harvesting && c.carry.energy === 0) {
        c.memory.harvesting = true;
    }
    
    // harvesting
    if (c.memory.harvesting) {
        var source = c.pos.findClosestByPath(c.room.find(FIND_SOURCES));
        if (!source) return;
        if (!c.pos.isNearTo(source)) c.moveTo(source);
        else c.harvest(source);
    }
    
    // not harvesting
    else {
        var spawn = c.pos.findClosestByPath(c.room.find(FIND_MY_SPAWNS));
        if (!spawn) return;
        if (!c.pos.isNearTo(spawn)) c.moveTo(spawn);
        else c.transferEnergy(spawn);
    }
};

