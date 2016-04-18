module.exports = (cr) => {
    return;
    console.log(cr.name);
    var flag = Game.flags.Flag3;
    if (cr.room.name !== flag.roomName) {
        var ret = cr.moveTo(flag);
    }
    else {
        var t = cr.pos.findClosestByPath(cr.room.find(FIND_HOSTILE_CREEPS, {filter: e => cr.pos.inRangeTo(e, 2)}));
        if(t) {
            Memory.attack = true;
            cr.move(LEFT);
        }
        else {
            cr.moveTo(flag);
        }
    }
};