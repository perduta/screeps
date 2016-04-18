module.exports = c => {
    var f = Game.flags.Flag1;
    if(!f) return;
    if(c.room.name !== f.roomName) {
            c.moveTo(f);
    }
    else {
        var t = Game.getObjectById('57127f5dce8a302004b3a8fb');
        if(!t) var t = c.pos.findClosestByPath(c.room.find(FIND_HOSTILE_SPAWNS));
        if(!c.pos.isNearTo(t)) c.moveTo(t);
        else var ret = c.dismantle(t);
    }
};