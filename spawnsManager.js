"use strict";
// jshint esversion: 6, strict: global

function createCreep(spawn, role) {
    let bodyParts = calculateParts(spawn, creepsDefinitions[role].requiredParts, creepsDefinitions[role].optionalParts);
    spawn.createCreep(bodyParts, undefined, {role: role});
}

function calculateParts(s, required_parts, optional_parts) {
    var cost = 0;
    var maximum_cost = s.room.energyAvailable;
    var parts = [];
    for (var i in required_parts) {
        var part = required_parts[i];
        cost += BODYPART_COST[part];
        if (cost > maximum_cost) {
            throw 'cannot produce that creep';
        }
        parts.push(part);
    }
    
    while (true) {
        for(var i in optional_parts) {
            var part = optional_parts[i];
            cost += BODYPART_COST[part];
            if (cost > maximum_cost) {
                return parts;
            }
        }
        
        for(var i in optional_parts) {
            var part = optional_parts[i];
            parts.push(part);
        }
    }
    return parts;
}

let creepsDefinitions = require('creepsDefinitions');

module.exports = () => {
    for (var spawnName in Game.spawns) {
        var s = Game.spawns[spawnName];

        let creepsByRole = {};
        for (let creepName in Game.creeps) {
            let creep = Game.creeps[creepName];
            let creepRole = creep.memory.role;
            if (!creepsByRole[creepRole]) creepsByRole[creepRole] = 0;
            if (creep.room.name === s.room.name) creepsByRole[creepRole]++;
        }

        if (creepsByRole.scout < 1 && creepsByRole.harvester < 1 && creepsByRole.carrier < 1) createCreep(s, 'scout');
        else if (creepsByRole.harvester < 2) createCreep(s, 'harvester');
        else if (creepsByRole.carrier < 3) createCreep(s, 'carrier');
        else if (creepsByRole.upgrader < 3) createCreep(s, 'upgrader');
        else if (creepsByRole.builder < 3) createCreep(s, 'builder');

    }
};

