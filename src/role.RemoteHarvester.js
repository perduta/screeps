"use strict";

let BaseCreep = require('role.BaseCreep');

function RemoteHarvester(creep) {
    BaseCreep.call(this, creep);
}
RemoteHarvester.prototype = new BaseCreep();
RemoteHarvester.prototype.constructor = RemoteHarvester;

RemoteHarvester.prototype.assignToFlag = function() {
    let i = 0;
    let remoteRooms = [];
    while(true) {
        if(this.memory.remoteRoom && this.memory.source) return;
        let remoteRoom = Game.flags[this.memory.originRoom + '_remoteRoom_' + i];
        i++;
        if(!remoteRoom) break;
        remoteRooms.push(remoteRoom);
    }

    _.forEach(remoteRooms, remoteRoom => {
        _.forEach(remoteRoom.memory.sources, source => {
            if(source.harvester && Game.getObjectById(source.harvester)) return;
            this.memory.remoteRoom = remoteRoom.name;
            this.memory.source = source.source;
            source.harvester = this.id;
            return false;
        });
    });
};

RemoteHarvester.prototype.work = function() {
    this.assignToFlag();
    let remoteRoom = Game.flags[this.memory.remoteRoom];
    if(!remoteRoom) return;

    if(this.room.name !== remoteRoom.pos.roomName) {
        this.moveTo(remoteRoom, {maxOps: 7000, reusePath: 20});
    }

    else {
        let source = Game.getObjectById(this.memory.source);
        if(!source) return;
        if(!this.pos.isNearTo(source)) {
            this.moveTo(source);
        }
        this.harvest(source);
    }
};

module.exports = RemoteHarvester;
