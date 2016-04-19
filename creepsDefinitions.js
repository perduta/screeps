module.exports = {
    scout: {requiredParts: [MOVE, WORK, CARRY], optionalParts: [MOVE, WORK, CARRY]},
    harvester: {requiredParts: [MOVE, WORK, WORK], optionalParts: [MOVE, WORK, WORK]},
    carrier: {requiredParts: [MOVE, CARRY, CARRY], optionalParts: [MOVE, CARRY, CARRY]},
    upgrader: {requiredParts: [MOVE, CARRY], optionalParts: [WORK]},
    builder: {requiredParts: [MOVE, CARRY, WORK], optionalParts: [MOVE, CARRY, WORK]},
};
