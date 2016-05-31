"use strict";

function createCreep(spawn, role) {
    if(spawn.room.spawningCreep) return;
    spawn.room.spawningCreep = true;
    let bodyparts = calculateParts(spawn, creepsDefinitions[role]);
    if(spawn.canCreateCreep(bodyparts) === OK) {
        console.log(spawn, 'is spawning', role, 'creep.');
        spawn.createCreep(bodyparts, undefined, {role: role, originRoom: spawn.room.name});
    }
}

function calculateParts(s, creepDefinitions) {
    let cost = 0;
    let maximumCost = s.room.energyCapacityAvailable;
    let bodyparts = [];
   
    if(creepDefinitions.onlyParts) return creepDefinitions.onlyParts;

    if(creepDefinitions.perfectParts && s.canCreateCreep(creepDefinitions.perfectParts) === OK) return creepDefinitions.perfectParts;

    _.forEach(creepDefinitions.requiredParts, bodypart => {
        cost += BODYPART_COST[bodypart];
        bodyparts.push(bodypart);
    });
   
    let building = true;
    while (creepDefinitions.optionalParts && building) {
        _.forEach(creepDefinitions.optionalParts, bodypart => {
            cost += BODYPART_COST[bodypart];
            if (cost > maximumCost) building = false;
        });
        if(building && (bodyparts.length + creepDefinitions.optionalParts.length) <= 50)
            bodyparts = bodyparts.concat(creepDefinitions.optionalParts);
    }
    return bodyparts;
}

let creepsDefinitions = require('creepsDefinitions');

module.exports = () => {
    for (let spawnName in Game.spawns) {
        let s = Game.spawns[spawnName];
        if(s.spawning) continue;

        let creepsByRole = {};
        for (let creepName in Game.creeps) {
            let creep = Game.creeps[creepName];
            let creepRole = creep.memory.role;
            if (!creepsByRole[creepRole]) creepsByRole[creepRole] = 0;
            if (creep.memory.originRoom === s.room.name) creepsByRole[creepRole]++;
        }

        if (!creepsByRole.scout && !creepsByRole.harvester && !creepsByRole.carrier) { 
            createCreep(s, 'scout');
            return 0;
        }

        let creepsSpawnPriority = [
            'harvester',
            'carrier',
            'claimer',
            'pioneer',
            'remoteDefender',
            'remoteReserver',
            'remoteHarvester',
            'remoteCarrier',
            'upgrader',
            'builder',
            'mineralHarvester',
            'mineralWorker',
            'terminalWorker',
        ];
        for (let i in creepsSpawnPriority) {
            let creepRole = creepsSpawnPriority[i];
            let neededCreep = 'needed' + creepRole.charAt(0).toUpperCase() + creepRole.slice(1);
            if(!s.room.memory[neededCreep] || creepsByRole[creepRole] >= s.room.memory[neededCreep]) continue;
            createCreep(s, creepRole);
            break;
        }
    }
};

