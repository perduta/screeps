module.exports = (c) => {
  if (!c.memory.collecting && c.carry.energy === 0) {
    c.memory.collecting = true;
    delete c.memory.target;
  }
  else if (c.memory.collecting && c.carry.energy == c.carryCapacity) {
    c.memory.collecting = false;
    delete c.memory.target;
  }


  // carrier is looking for dropped energy thats more than nothing and pickups it
  if (c.memory.collecting) {
    if(!c.memory.energyId) {
      var droppedEnergy = c.room.find(FIND_DROPPED_ENERGY, {filter: (e) => e.amount >= 50});
      var closestDroppedEnergy = c.pos.findClosestByPath(droppedEnergy);
      if(!closestDroppedEnergy) return;
      c.memory.energyId = closestDroppedEnergy.id;
    }
    else {
      var targetedDroppedEnergy = Game.getObjectById(c.memory.energyId);
      if(!targetedDroppedEnergy) { delete c.memory.energyId; return; }
      var returnCode = c.pickup(targetedDroppedEnergy);
      if (returnCode === OK) delete c.memory.energyId;
      else if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(targetedDroppedEnergy);
    }
  }

  // carrier is looking for target that needs energy and transfers it
  else {
    // first looking for target
    if (!c.memory.destinationId) {
      var spawnsAndExtensionsWithNoEnergy = c.room.find(FIND_MY_STRUCTURES, {filter: (e) => (e.structureType == STRUCTURE_SPAWN || e.structureType == STRUCTURE_EXTENSION || e.structureType == STRUCTURE_TOWER) && e.energy < e.energyCapacity});
      if (spawnsAndExtensionsWithNoEnergy.length) {
        var destination = c.pos.findClosestByPath(spawnsAndExtensionsWithNoEnergy);
        if(!destination) return;
        c.memory.destinationId = destination.id;
      }
    }

    if (!c.memory.destinationId) {
      var creepsWithNoEnergy = c.room.find(FIND_MY_CREEPS, {filter: (e) => e.memory.needsEnergy === true});
      if (creepsWithNoEnergy.length) {
        var destination = c.pos.findClosestByPath(creepsWithNoEnergy);
        if(!destination) return;
        c.memory.destinationId = destination.id;
       }
    }

    if (!c.memory.destinationId) {
      var containersWithNoEnergy = c.room.find(FIND_STRUCTURES, {filter: (e) => e.structureType === STRUCTURE_CONTAINER && e.store.energy < e.storeCapacity});
      if (containersWithNoEnergy.length) {
        var destination = c.pos.findClosestByPath(containersWithNoEnergy);
        if(!destination) return;
        c.memory.destinationId = destination.id;
      }
    }

    // then transfering him energy
    var destination = Game.getObjectById(c.memory.destinationId);
    if(!destination) { delete c.memory.destinationId; return; }
    var returnCode = c.transfer(destination, RESOURCE_ENERGY);
    if (returnCode === OK || returnCode === ERR_FULL) delete c.memory.destinationId;
    else if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(destination);
  }
};
