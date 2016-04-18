module.exports = (c) => {
  if (!c.memory.source) {
    var sources = c.room.find(FIND_SOURCES).map(source => source.id);
    var harvestersWithTarget = c.room.find(FIND_MY_CREEPS).filter(c => c.memory.role == 'harvester' && c.memory.source);
    var claimedSources = harvestersWithTarget.map((creep) => creep.memory.source);
    var unclaimedSources = _.without(sources, claimedSources);
    if(!unclaimedSources) { console.log('No harvester sources available!'); return; }
    var closestSource = c.pos.findClosestByPath(unclaimedSources.map(Game.getObjectById));
    c.memory.source = closestSource.id;
  }
  var source = Game.getObjectById(c.memory.source);
  if(!c.pos.isNearTo(source)) console.log('er ' + c.moveTo(source));
  else c.harvest(source);
};

