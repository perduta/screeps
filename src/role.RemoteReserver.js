"use strict";

let BaseCreep = require('role.BaseCreep');

function RemoteReserver(creep) {
    BaseCreep.call(this, creep);
}
RemoteReserver.prototype = new BaseCreep();
RemoteReserver.prototype.constructor = RemoteReserver;

RemoteReserver.prototype.assignToFlag = function() {
    if(this.memory.remoteRoom) return;
    let i = 0;
    while(true) {
        let remoteRoom = Game.flags[this.memory.originRoom + '_remoteRoom_' + i];
        i++;
        if(!remoteRoom) break;
        if(remoteRoom.memory.reserver && Game.getObjectById(remoteRoom.memory.reserver)) continue;
        this.memory.remoteRoom = remoteRoom.name;
        remoteRoom.memory.reserver = this.id;
        break;
    }
};

RemoteReserver.prototype.work = function() {
    this.assignToFlag();

    let remoteRoom = Game.flags[this.memory.remoteRoom];
    if(!remoteRoom) return;

    if(this.room.name !== remoteRoom.pos.roomName) {
        this.moveTo(remoteRoom, {maxOps: 7000, reusePath: 20});
    }
    else {
        if(!this.pos.isNearTo(this.room.controller)) {
            this.moveTo(this.room.controller);
        }
        this.reserveController(this.room.controller);
    }
};

module.exports = RemoteReserver;
