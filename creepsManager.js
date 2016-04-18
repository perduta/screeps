// jshint esversion: 6, strict: global
"use strict";

let doWork = {};
const ROLE_PREFIX = 'role';

module.exports = () => {
    if (!Game.creeps) return;
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];
        let role = creep.memory.role;
        if (!role) continue;
        if (!doWork[role]) {
            let moduleName = ROLE_PREFIX + role.charAt(0).toUpperCase() + role.slice(1);
            let roleDoWork = require(moduleName);
            doWork[role] = roleDoWork;
        }
        doWork[role](creep);
    }
};

