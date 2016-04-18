"use strict";
// jshint esversion: 6
var garbageCollector = require('garbagecollector');
var roomMonitor = require('room.monitor');
var spawnsManager = require('manager.spawns');
var creepsManager = require('creepsManager');
var towersManager = require('towersManager');

module.exports.loop = () => {
    garbageCollector();
    roomMonitor();
    creepsManager();
    spawnsManager();
    towersManager();
};
