module.exports = (c) => {
    // set mode
    if (c.memory.harvesting && c.carry.energy === c.carryCapacity) {
        c.memory.harvesting = false;
    }
    else if (!c.memory.harvesting && c.carry.energy === 0) {
        c.memory.harvesting = true;
    }
    
    var f = Game.flags.Flag1;
    if (c.room.name === f.roomName) {
    // harvesting
    if (c.memory.harvesting) {
        var source = c.pos.findClosestByPath(c.room.find(FIND_SOURCES));
        if (!source) return;
        if (!c.pos.isNearTo(source)) c.moveTo(source);
        else c.harvest(source);
    }
    
    // not harvesting
    else {
        var spawn = Game.getObjectById('5712ad527856220075675e28');
        if (!spawn) return;
        if (!c.pos.isNearTo(spawn)) c.moveTo(spawn);
        else c.build(spawn);
    }
    }
    else {
        var r = c.moveTo(f);
    }
};

