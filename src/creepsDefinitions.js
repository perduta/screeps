"use strict";

module.exports = {
    scout: {onlyParts: [MOVE, WORK, CARRY]},
    pioneer: {optionalParts: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY]},
    remoteHarvester: {requiredParts: [MOVE, WORK, WORK], optionalParts: [MOVE, WORK, WORK], perfectParts: [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK]},
    harvester: {requiredParts: [MOVE, WORK, WORK], optionalParts: [MOVE, WORK, WORK], perfectParts: [MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK]},
    stealer: {optionalParts: [MOVE, CARRY, CARRY], perfectParts: [MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY]},
    carrier: {optionalParts: [MOVE, CARRY, CARRY], perfectParts: [MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY]},
    remoteCarrier: {optionalParts: [MOVE, CARRY, CARRY], perfectParts: [MOVE, WORK, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY]},
    upgrader: {requiredParts: [MOVE, CARRY, WORK], optionalParts: [WORK],
        perfectParts: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE]},
    builder: {optionalParts: [MOVE, CARRY, MOVE, CARRY, WORK],
        perfectParts: [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]},
    remoteBuilder: {optionalParts: [MOVE, CARRY, WORK]},
    attacker: {optionalParts: [MOVE, ATTACK]},
    claimer: {onlyParts: [MOVE, MOVE, CLAIM]},
    remoteReserver: {onlyParts: [MOVE, MOVE, MOVE, MOVE, CLAIM, CLAIM]},
    tanker: {onlyParts: [TOUGH, MOVE, HEAL, MOVE,  HEAL, MOVE, HEAL, MOVE]},
    dismantler: {optionalParts: [MOVE, WORK]},
    tankerHealer: {onlyParts: [
        MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, 
        HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL, HEAL]},
    remoteDefender: {onlyParts: [MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK, MOVE, RANGED_ATTACK]},
    mineralHarvester: {onlyParts: [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY]},
    mineralWorker: {onlyParts: [MOVE, CARRY, CARRY]},
    terminalWorker: {onlyParts: [MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]},
};
