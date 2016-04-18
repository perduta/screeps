module.exports = (c) => {
  var hostileCreep = c.pos.findClosestByPath(c.room.find(FIND_HOSTILE_CREEPS));
  var hostileSpawn = c.pos.findClosestByPath(c.room.find(FIND_HOSTILE_SPAWNS));
  if(!hostileCreep && !hostileSpawn) {
    var target = Game.flags.Flag1;
    c.moveTo(target);
  }
  else {
      if(hostileCreep) {
  var returnCode = c.attack(hostileCreep);
  if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(hostileCreep); }
  else if(hostileSpawn) {
        var returnCode = c.attack(hostileSpawn);
  if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(hostileSpawn);
  }
  }
};




