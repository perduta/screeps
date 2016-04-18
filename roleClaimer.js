module.exports = c => {
    var f = Game.flags.Flag1;
    if(c.room.name !== f.roomName) {
        c.moveTo(f);
    }
    else {
        if(!c.pos.isNearTo(c.room.controller)) c.moveTo(c.room.controller);
        else c.claimController(c.room.controller);
    }
};