module.exports = (tower) {
  var structuresThatNeedsRepair = tower.room.find(FIND_STRUCTURES, {filter: structure => structure.hits < structure.hitsMax * 0.7});
  if(!structuresThatNeedsRepair) return;
  structuresThatNeedsRepair = _.sortBy(structuresThatNeedsRepair, structure => structure.hits);
  console.log(structuresThatNeedsRepair.map(str => str.hits));
  var structureThatMostNeedsRepair = structuresThatNeedsRepair[0];

  tower.repair(structureThatMostNeedsRepair);

}
