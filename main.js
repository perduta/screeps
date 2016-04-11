var garbageCollector = require('garbagecollector');
var spawnsManager = require('manager.spawns');
var creepsManager = require('manager.creeps');
var towersManager = require('manager.towers');

module.exports.loop = () => {
  garbageCollector();
  spawnsManager();
  creepsManager();
  towersManager();
};
