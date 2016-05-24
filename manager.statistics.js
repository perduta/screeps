"use strict";

module.exports = function() {
    if(!Memory.stats) Memory.stats = {};

    _.forEach(Game.rooms, room => {
		Memory.stats["room." + room.name + ".energyAvailable"] = room.energyAvailable;
		Memory.stats["room." + room.name + ".energyCapacityAvailable"] = room.energyCapacityAvailable;
        if(room.controller)
            Memory.stats["room." + room.name + ".controllerProgress"] = room.controller.progress;

        // storage statistics
        if(room.storage) {
            Memory.stats["room." + room.name + ".storage.store.energy"] = room.storage.store.energy;
        }
    });

    for(let roleName in Game.creepsStats) {
        let cpuUsage = Game.creepsStats[roleName];
        Memory.stats["role." + roleName + ".cpuUsage"] = cpuUsage;
    }
};
