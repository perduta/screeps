"use strict";
// jshint esversion: 6, strict: global

function doTowerAttack(tower) {
    let hostileCreeps = tower.room.find(FIND_HOSTILE_CREEPS);
    let closestHostileCreep = tower.pos.findClosestByRange(hostileCreeps);
    if (!closestHostileCreep) return 1; // did not find any hostile creeps
    tower.attack(closestHostileCreep);
    return 0;
}

function doTowerHeal(tower) {
    return 1; // to be imlemented
}

function doTowerRepair(tower) {
    return 1; // to be implemented
}

module.exports = () => {
    let towers = _.filter(Game.structures, e => e.structureType === STRUCTURE_TOWER);
    for (let towerId in towers) {
        let tower = towers[towerId];
        doTowerAttack(tower);
    }
};
