"use strict";

let BaseCreep = require('role.BaseCreep');

function TerminalWorker(creep) {
    BaseCreep.call(this, creep);
}
TerminalWorker.prototype = new BaseCreep();
TerminalWorker.prototype.constructor = TerminalWorker;

TerminalWorker.prototype.overflowAmount = 10000;

TerminalWorker.prototype.getTerminalResourceOverflow = function() {
    if(this.memory.overflowResource) {
        return this.memory.overflowResource;
    }
    let overflowResource;
    for(let resource in this.room.terminal.store) {
        let amount = this.room.terminal.store[resource];
        if(amount > this.overflowAmount) {
            overflowResource = resource;
            break;
        }
    }
    this.memory.overflowResource = overflowResource;
    return this.memory.overflowResource;
};

TerminalWorker.prototype.handleTerminalOverflow = function() {
    let terminalResourceOverflow = this.getTerminalResourceOverflow();
    if(_.sum(this.carry) === 0 && terminalResourceOverflow) {
        if(!this.pos.isNearTo(this.room.terminal)) {
            this.moveTo(this.room.terminal);
        }
        let overflowAmount = this.room.terminal.store[terminalResourceOverflow] - this.overflowAmount;
        if(overflowAmount > this.carryCapacity) {
            overflowAmount = this.carryCapacity;
        }
        this.room.terminal.transfer(this.creep, terminalResourceOverflow, overflowAmount);
    }
    else {
        if(!this.pos.isNearTo(this.room.storage)) {
            this.moveTo(this.room.storage);
        }
        let returnCode = this.transfer(this.room.storage, terminalResourceOverflow);
        if(returnCode === OK) delete this.memory.overflowResource;
    }
};

TerminalWorker.prototype.work = function() {
    this.handleTerminalOverflow();
};

module.exports = TerminalWorker;
