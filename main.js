"use strict";

let managerMemory = require('manager.memory');
let managerSpawns = require('manager.spawns');
let managerCreeps = require('manager.creeps');
let managerTowers = require('manager.towers');
let managerLabs = require('manager.labs');
let managerRemoteRoomBuilder = require('manager.remoteRoomBuilder');
let managerStatistics = require('manager.statistics');
let profiler = require('screeps-profiler');
//let lzString = require('lz-string.min');

profiler.enable();
module.exports.loop = () => {
    profiler.wrap(function() {
        managerMemory();
        managerCreeps();
        managerSpawns();
        managerTowers();
        managerLabs();
        managerRemoteRoomBuilder();
        managerStatistics();
    });
};
