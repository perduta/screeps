var spawnsManager = require('manager.spawns');
var creepsManager = require('manager.creeps');

var garbageCollector = require('garbagecollector');

module.exports.loop = () => {
  garbageCollector();

  spawnsManager();
  creepsManager();
};
