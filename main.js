// SPAWN MODULE
for (var key in Game.spawns) {
  var s = Game.spawns[key];
  //THATS REALLY STUPID AND NON-SCALING
  var harvesters = _.filter(Game.creeps, c => c.memory.role == 'harvester');
  if (harvesters.length < 2) {
    s.createCreep([MOVE, WORK], undefined, {role: 'harvester'});
  }
  var upgraders = _.filter(Game.creeps, c => c.memory.role == 'upgrader');
  if (upgraders.length < 0) {
    s.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK, WORK, WORK, WORK, WORK], undefined, {role: 'upgrader'});
  }
  var builders = _.filter(Game.creeps, c => c.memory.role == 'builder');
  if (builders.length < 0) {
    s.createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, WORK, WORK], undefined, {role: 'builder'});
  }
  var carriers = _.filter(Game.creeps, c => c.memory.role == 'carrier');
  if (carriers.length < 1) {
    s.createCreep([MOVE, MOVE, CARRY, CARRY], undefined, {role: 'carrier'});
  }
}

// MAINTAINING TOWERS MODULE
//stupid stupid stupid!!!!!!
var tower = Game.getObjectById('id268930');
//towerRepair(tower);


// MAINTAINING CREEPS MODLUE
if (Game.creeps) {
  for (var key in Game.creeps) {
    var c = Game.creeps[key];
    work(c);
  }
}

function work(c) {
  if(!c.memory.role) {
    console.log('Creep ' + c + ' has no role!');
    return;
  }

  //TO CHANGE IT, IT SUCKS A LOT
  if(c.memory.role == 'harvester') { harvesterWork(c); return; }
  if(c.memory.role == 'carrier') { carrierWork(c); return; }
  if(c.memory.role == 'upgrader') { upgraderWork(c); return; }
  if(c.memory.role == 'builder') { builderWork(c); return; }
}


// HARVESTER MODULE
function harvesterWork(c) {
  if (!c.memory.target_source) {
    var sources = c.room.find(FIND_SOURCES).map(e => e.id);
    var harvesters_targets = c.room.find(FIND_MY_CREEPS)
    .filter(c => c.memory.room == 'harvester' && c.memory.target_source);
    var unassigned_sources = sources.filter(source => source != harvesters_targets);
    if(!unassigned_sources) { console.log('No unassigned harvester sources available!'); return; }
    var closestSource = c.pos.findClosestByPath(unassigned_sources.map(Game.getObjectById));
    c.memory.target_source = closestSource.id;
  }
  var t = Game.getObjectById(c.memory.target_source);
  var ret = c.harvest(t);
  if(ret == ERR_NOT_IN_RANGE) c.moveTo(t);
}


// CARRIER MODULE
function carrierWork(c) {
  if (!c.memory.collecting && c.carry.energy === 0) {
    c.memory.collecting = true;
    delete c.memory.target;
  }
  else if (c.memory.collecting && c.carry.energy == c.carryCapacity) {
    c.memory.collecting = false;
    delete c.memory.target;
  }

  if (c.memory.collecting) {
    if (!c.memory.target) {
      var t = c.pos.findClosestByPath(c.room.find(FIND_DROPPED_ENERGY, {filter: energy => energy.amount >= 50}));
      if(t) c.memory.target = t.id;
    }
    var t = Game.getObjectById(c.memory.target);
    if (t) {
      var ret = c.pickup(t);
      if (ret === ERR_NOT_IN_RANGE) {
        c.moveTo(t);
      }
    }
    else {
      delete c.memory.target;
    }
  }
  else {
    if (!c.memory.target) {
      var t = c.pos.findClosestByPath(c.room.find(FIND_MY_STRUCTURES, {filter: structure => structure.energy < structure.energyCapacity}));
      if(t) c.memory.target = t.id;
      else {
        var t = c.pos.findClosestByPath(c.room.find(FIND_MY_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_CONTAINER}));
        if(t) c.memory.target = t.id;
      }
    }
    var t = Game.getObjectById(c.memory.target);
    if (t) {
      var ret = c.transfer(t, RESOURCE_ENERGY);
      delete c.memory.target;
      if (ret === ERR_NOT_IN_RANGE) {
        c.moveTo(t);
      }
    }
  }
}


//UPGRADER MODULE
function upgraderWork(c) {
  if (!c.memory.upgrading && c.carry.energy === c.carryCapacity) {
    c.memory.upgrading = true;
  }
  if (c.memory.upgrading && c.carry.energy === 0) {
    c.memory.upgrading = false;
  }

  if (c.memory.upgrading) {
    var ret = c.upgradeController(c.room.controller);
    if (ret === ERR_NOT_IN_RANGE) c.moveTo(c.room.controller);
  }
  else {
    var closestSpawn = c.pos.findClosestByPath(c.room.find(FIND_MY_SPAWNS));
    if(!closestSpawn || closestSpawn.energy === 0) return 0;
    var ret = closestSpawn.transferEnergy(c);
    if (ret === ERR_NOT_IN_RANGE) c.moveTo(closestSpawn);
  }
}


//BUILDER MODULE
function builderWork(c) {
  if (c.memory.building && c.carry.energy === 0) {
    c.memory.building = false;
  }
  if (!c.memory.building && c.carry.energy === c.carryCapacity) {
    c.memory.building = true;
  }

  if (!c.memory.building) {
    var closestSpawn = c.pos.findClosestByPath(c.room.find(FIND_MY_SPAWNS));
    var ret = closestSpawn.transferEnergy(c);
    if (ret === ERR_NOT_IN_RANGE) c.moveTo(closestSpawn);
  }
  else {
    var closestConstructionSite = c.pos.findClosestByPath(c.room.find(FIND_CONSTRUCTION_SITES));
    var ret = c.build(closestConstructionSite);
    if (ret == ERR_NOT_IN_RANGE) c.moveTo(closestConstructionSite);
  }
}


//TOWER MODULE
function towerRepair(tower) {
  var structuresThatNeedsRepair = tower.room.find(FIND_STRUCTURES, {filter: structure => structure.hits < structure.hitsMax * 0.7});
  if(!structuresThatNeedsRepair) return;
  structuresThatNeedsRepair = _.sortBy(structuresThatNeedsRepair, structure => structure.hits);
  console.log(structuresThatNeedsRepair.map(str => str.hits));
  var structureThatMostNeedsRepair = structuresThatNeedsRepair[0];

  tower.repair(structureThatMostNeedsRepair);
}
