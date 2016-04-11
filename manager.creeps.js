var doHarvesterWork = require('role.harvester');
var doCarrierWork = require('role.carrier');
var doUpgraderWork = require('role.upgrader');
var doBuilderWork = require('role.builder');
var doAttackerWork = require('role.attacker');

module.exports = () => {
  if (Game.creeps) {
    for (var key in Game.creeps) {
      var c = Game.creeps[key];
      if(!c.memory.role) {
        console.log('Creep' + creep + 'has no role!');
        continue;
      }

   if(c.memory.role == 'harvester') { doHarvesterWork(c); continue; }
   if(c.memory.role == 'carrier') { doCarrierWork(c); continue; }
   if(c.memory.role == 'upgrader') { doUpgraderWork(c); continue; }
   if(c.memory.role == 'builder') { doBuilderWork(c); continue; }
   if(c.memory.role == 'attacker') { doAttackerWork(c); continue; }
   }
 }
}
