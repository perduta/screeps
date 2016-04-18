module.exports = (creep) => {
    var flag = Game.flags.Flag8;
    if (creep.room.name != flag.roomName) {
        creep.moveTo(flag)
    }
    else {
        var returnCode = creep.reserveController(creep.room.controller)
        if (returnCode === ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
    }
};