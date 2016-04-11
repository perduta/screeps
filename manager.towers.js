module.exports = () => {
  var tower = Game.getObjectById('570b6d133d9326564fd84c21');
  var structuresThatNeedsRepair = tower.room.find(FIND_STRUCTURES, {filter: e => e.structureType !== STRUCTURE_WALL && e.hits < e.hitsMax * 0.7});
  if(!structuresThatNeedsRepair) return;
  structuresThatNeedsRepair = _.sortBy(structuresThatNeedsRepair, e => e.hits);
  var structureThatMostNeedsRepair = structuresThatNeedsRepair[0];

  tower.repair(structureThatMostNeedsRepair);
};
