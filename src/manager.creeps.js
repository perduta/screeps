"use strict";

let creepsObjects = {};

//let profiler = require('screeps-profiler');

module.exports = () => {
    if (!Game.creeps) return;
    Game.roleCpuUsage = {};
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let role = creep.memory.role;
        if (!role) continue;
        if (!creepsObjects[role]) {
            let roleDoWork = require('role.' + role.charAt(0).toUpperCase() + role.slice(1));
            creepsObjects[role] = roleDoWork;
        }
        if(!Game.roleCpuUsage[role]) Game.roleCpuUsage[role] = 0;
        let usedCpu = Game.cpu.getUsed();
        try {
            let creepObject = new creepsObjects[role](creep);
//          creepObject.work = profiler.registerFN(creepObject.work, role + '.work');
            creepObject.work();
        } catch(err) {
            if(err) {
                let error_message = '[error] ' + err.stack;
                console.log(error_message);
                Game.notify(error_message);
            }
        }
        Game.roleCpuUsage[role] += Game.cpu.getUsed() - usedCpu;
    }
};

