"use strict";

let BaseCreep = require('role.BaseCreep');

function Claimer(creep) {
    BaseCreep.call(this, creep);
}
Claimer.prototype = new BaseCreep();
Claimer.prototype.constructor = Claimer;

Claimer.prototype.work = function() {
    let flag = Game.flags[this.memory.originRoom + '_claimRoom'];
    if(!flag) return;
    if(this.room.name !== flag.pos.roomName) {
        this.moveTo(flag);
        return;
    }
    this.moveTo(this.room.controller);
    this.claimController(this.room.controller);
};

module.exports = Claimer;
