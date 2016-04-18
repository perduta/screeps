module.exports = (c) => {
  if (c.carry.energy === 0) {
    c.memory.building = false;
  }
  else if (c.carry.energy === c.carryCapacity) {
    c.memory.building = true;
  }
  
  if(!c.memory.flagId) {
      var flag = Game.flags.Flag8;
      if(flag) {
          c.memory.flagId = flag.id;
          c.memory.roomName = flag.pos.roomName;
      }
  }
  
  if(c.memory.roomName == c.room.name) {
      if(c.memory.building) {
        // targeting construction sites and building them
        var closestConstructionSite = c.pos.findClosestByPath(c.room.find(FIND_CONSTRUCTION_SITES));
        if(closestConstructionSite) {
          var returnCode = c.build(closestConstructionSite);
          if (returnCode == ERR_NOT_IN_RANGE) c.moveTo(closestConstructionSite);
          else if(returnCode == ERR_INVALID_TARGET) c.moveTo(c.room.controller);
          return returnCode;
        }
      }
      else {
          var energy = c.room.find(FIND_DROPPED_ENERGY, {filter: e => e.energy >= 50})[0];
          var returnCode = c.pickup(energy);
          if(returnCode == ERR_NOT_IN_RANGE) c.moveTo(energy, {reusePath: 15});
          
      }
  }
  else {
      var flag = Game.getObjectById(c.memory.flagId);
      c.moveTo(flag);
  }
};

