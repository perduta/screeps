"use strict";

let BaseCreep = require('role.BaseCreep');

function Harvester(creep) {
    BaseCreep.call(this, creep);
}
Harvester.prototype = new BaseCreep();
Harvester.prototype.constructor = Harvester;

Harvester.prototype.assignToSource = function() {
    if(!this.memory.source) {
        let closestSource = this.pos.findClosestByPath(this.findUnclaimedSources());
        if(!closestSource) return;
        this.memory.source = closestSource.id;
    }
};

Harvester.prototype.findUnclaimedSources = function() {
    let sources = this.room.find(FIND_SOURCES);
    let harvestersWithAssignedSources = _.filter(Game.creeps, c => c.memory.role === 'harvester' && c.memory.source);

    let unclaimedSources = sources;
    _.forEach(harvestersWithAssignedSources, function(c) {
        let harvesterSource = Game.getObjectById(c.memory.source);
        _.pull(unclaimedSources, harvesterSource);
    });

    return unclaimedSources;
};

Harvester.prototype.goAndHarvest = function() {
    let source = Game.getObjectById(this.memory.source);
    if(!source) return;

    if(!this.pos.isNearTo(source)) {
        this.moveTo(source);
    }
    this.harvest(source);
};

Harvester.prototype.work = function() {
    this.assignToSource();
    this.goAndHarvest();
};

module.exports = Harvester;
