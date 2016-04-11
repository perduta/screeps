module.exports = (c) => {
  var hostileSpawn = c.pos.findClosestByPath(c.room.find(FIND_HOSTILE_SPAWNS));
  var hostileCreep = c.pos.findClosestByRange(c.room.find(FIND_HOSTILE_CREEPS));
  if(!hostileSpawn && !hostileCreep) {
    var target = c.pos.findClosestByPath(c.room.find(FIND_EXIT_LEFT));
    c.moveTo(target);
    return;
  }
  if (hostileCreep && c.pos.inRangeTo(hostileCreep, 1)) { c.attack(hostileCreep); return; }
  var returnCode = c.attack(hostileSpawn);
  if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(hostileSpawn);
};

