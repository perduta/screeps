"use strict";

let BaseCreep = require('role.BaseCreep');

function RemoteDefender(creep) {
    BaseCreep.call(this, creep);
}
RemoteDefender.prototype = new BaseCreep();
RemoteDefender.prototype.constructor = RemoteDefender;

RemoteDefender.prototype.assignToFlag = function() {
    if(this.memory.remoteRoom) return;
    let i = 0;
    while(true) {
        let remoteRoom = Game.flags[this.memory.originRoom + '_remoteRoom_' + i];
        i++;
        if(!remoteRoom) break;
        if(remoteRoom.memory.defender && Game.getObjectById(remoteRoom.memory.defender)) continue;
        this.memory.remoteRoom = remoteRoom.name;
        remoteRoom.memory.defender = this.id;
        break;
    }
};

RemoteDefender.prototype.attackFromRange = function(target) {
    if(!this.pos.inRangeTo(target, 4)) {
        this.moveTo(target);
        this.rangedAttack(target);
    }
    else {
        let pf = PathFinder.search(this.pos, {pos: target.pos, range: 3}, {flee: true});
        this.move(this.pos.getDirectionTo(pf.path[0]));
        this.rangedAttack(target);
    }
};

RemoteDefender.prototype.work = function() {
    this.assignToFlag();

    let remoteRoom = Game.flags[this.memory.remoteRoom];
    if(!remoteRoom) return;

    let hostileCreeps = this.room.find(FIND_HOSTILE_CREEPS);
    if(hostileCreeps.length !== 0) {
        let closestHostileCreep = this.pos.findClosestByPath(hostileCreeps);
        this.attackFromRange(this, closestHostileCreep);
        return;
    }

    if(this.room.name !== remoteRoom.pos.roomName) {
        this.moveTo(remoteRoom);
    }
    else {
        if(!this.pos.inRangeTo(this.room.controller, 3)) this.moveTo(this.room.controller);
    }
};

module.exports = RemoteDefender;
