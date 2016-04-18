module.exports = {
    scout: {requiredParts: [MOVE, WORK, CARRY], optionalParts: []},
    harvester: {requiredParts: [MOVE, WORK], optionalParts: [MOVE, WORK]},
    carrier: {requiredParts: [MOVE, CARRY], optionalParts: [MOVE, CARRY]},
    upgrader: {requiredParts: [MOVE, CARRY], optionalParts: [WORK]},
    builder: {requiredParts: [MOVE, CARRY, WORK], optionalParts: [MOVE, CARRY, WORK]},
};
