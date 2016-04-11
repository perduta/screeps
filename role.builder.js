module.exports = (c) => {
  if (c.carry.energy === 0) {
    c.memory.building = false;
    c.memory.needsEnergy = true;
  }
  else if (c.carry.energy === c.carryCapacity) {
    c.memory.building = true;
    c.memory.needsEnergy = false;
  }

  if(c.memory.building) {
    // targeting construction sites and building them
    var closestConstructionSite = c.pos.findClosestByPath(c.room.find(FIND_CONSTRUCTION_SITES));
    if(closestConstructionSite) {
      var returnCode = c.build(closestConstructionSite);
      if (returnCode == ERR_NOT_IN_RANGE) c.moveTo(closestConstructionSite);
      return returnCode;
    }

    // targeting closest damaged structure
    var closestDamagedStructure = c.pos.findClosestByPath(c.room.find(FIND_STRUCTURES, {filter: (e) => e.hits < e.hitsMax * 0.75}));
    if (closestDamagedStructure) {
      var returnCode = c.repair(closestDamagedStructure);
      if (returnCode == ERR_NOT_IN_RANGE) c.moveTo(closestDamagedStructure);
      return returnCode;
    }
  }
};

