module.exports = c => {
    // return;
    if (c.room.name === 'W7S26') {
        // in enemy room
        if(c.hits < c.hitsMax / 2) {
            c.move(BOTTOM);
        }
    }
    else if(c.room.name === 'W7S27' && c.memory.ready)
    {
        // in safe room
        if(c.hits == c.hitsMax) {
            c.move(TOP);
        }
        else {
            if(c.pos.y === 0) {
                c.move(BOTTOM);
            }
            else {
                c.heal(c);
            }
        }
    }
    else if(c.room.name === 'W7S27' && !c.memory.ready) {
        var safePosition = new RoomPosition(c.memory.safePosition.x, c.memory.safePosition.y, c.memory.safePosition.roomName);
        if(c.pos.isEqualTo(safePosition)) {
            c.memory.ready = true;
        }
        else c.moveTo(safePosition);
    }
    else {
        // in another room
        if(!c.memory.safePosition) {
            var anotherEdgeTankersCount = _.filter(Game.creeps, creep => creep.memory.role == 'edgeTanker').length - 1;
            var flag = Game.flags.Flag2;
            c.memory.safePosition = {};
            c.memory.safePosition.x = flag.pos.x - anotherEdgeTankersCount;
            c.memory.safePosition.y = flag.pos.y;
            c.memory.safePosition.roomName = flag.roomName;
            
        }
        var safePosition = new RoomPosition(c.memory.safePosition.x, c.memory.safePosition.y, c.memory.safePosition.roomName);
        c.moveTo(safePosition);
    }
};