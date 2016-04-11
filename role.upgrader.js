module.exports = (c) => {
  if (c.carry.energy === c.carryCapacity) {
    c.memory.upgrading = true;
    c.memory.needsEnergy = false;
  }
  else if (c.carry.energy === 0) {
    c.memory.upgrading = false;
    c.memory.needsEnergy = true;
  }

  if (c.memory.upgrading) {
    var ret = c.upgradeController(c.room.controller);
    if (ret === ERR_NOT_IN_RANGE) c.moveTo(c.room.controller);
  }
}

