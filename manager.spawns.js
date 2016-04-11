module.exports = () => {
  for (var key in Game.spawns) {
    var s = Game.spawns[key];
    var harvesters = _.filter(Game.creeps, c => c.memory.role == 'harvester');
    if (harvesters.length < 2) s.createCreep([MOVE, WORK, WORK, WORK, WORK, WORK], undefined, {role: 'harvester'});
    var upgraders = _.filter(Game.creeps, c => c.memory.role == 'upgrader');
    if (upgraders.length < 1) s.createCreep([MOVE, CARRY, WORK, WORK, WORK, WORK], undefined, {role: 'upgrader'});
    var builders = _.filter(Game.creeps, c => c.memory.role == 'builder');
    if (builders.length < 1) s.createCreep([MOVE, CARRY, WORK, WORK, WORK, WORK], undefined, {role: 'builder'});
    var carriers = _.filter(Game.creeps, c => c.memory.role == 'carrier');
    if (carriers.length < 4) s.createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY], undefined, {role: 'carrier'});
    var attackers = _.filter(Game.creeps, c => c.memory.role == 'attacker');
    if (attackers.length < 0) s.createCreep([MOVE, ATTACK], undefined, {role: 'attacker'});
  }
}
