"use strict";

function doTowerAttack(tower) {
    let hostileCreeps = tower.room.find(FIND_HOSTILE_CREEPS);
    let closestHostileCreep = tower.pos.findClosestByRange(hostileCreeps);
    if (!closestHostileCreep) return 1;
    tower.attack(closestHostileCreep);
    return 0;
}

function doTowerHeal(tower) {
    return 1; // to be imlemented
}

function repairIfInCriticalState(tower, structureType, hitsToBeInCriticalState) {
    let targetsInCriticalState = tower.room.find(FIND_STRUCTURES, {filter: e => e.structureType === structureType && e.hits <= hitsToBeInCriticalState});
    let closestTargetInCriticalState = tower.pos.findClosestByRange(targetsInCriticalState);
    if (closestTargetInCriticalState) {
        tower.repair(closestTargetInCriticalState);
        return 0;
    }
    return 1;
}



function doTowerRepair(tower) {
    repairIfInCriticalState(tower, STRUCTURE_RAMPART, RAMPART_DECAY_AMOUNT + 1);
    repairIfInCriticalState(tower, STRUCTURE_ROAD, ROAD_DECAY_AMOUNT + 1);
    repairIfInCriticalState(tower, STRUCTURE_WALL, 1);
}

module.exports = () => {
    let towers = _.filter(Game.structures, e => e.structureType === STRUCTURE_TOWER);
    for (let towerId in towers) {
        let tower = towers[towerId];
        doTowerAttack(tower);
        doTowerRepair(tower);
    }
};
