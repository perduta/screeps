// jshint esversion: 6
var garbageCollector = require('garbagecollector');
var roomMonitor = require('room.monitor');
var spawnsManager = require('manager.spawns');
var creepsManager = require('manager.creeps');
var towersManager = require('towersManager');

module.exports.loop = () => {
    //PathFinder.use(false);
    garbageCollector();
    roomMonitor();
    creepsManager();
    spawnsManager();
    towersManager();
};
