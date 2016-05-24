"use strict";

function BaseCreep(creep) {
    if(!creep) return;
    this.creep = creep;

    this.pos = this.creep.pos;
    this.room = this.creep.room;

    this.body = this.creep.body;
    this.carry = this.creep.carry;
    this.carryCapacity = this.creep.carryCapacity;
    this.fatigue = this.creep.fatigue;
    this.hits = this.creep.hits;
    this.hitsMax = this.creep.hitsMax;
    this.id = this.creep.id;
    this.memory = this.creep.memory;
    this.my = this.creep.my;
    this.name = this.creep.name;
    this.owner = this.creep.owner;
    this.spawning = this.creep.spawning;
    this.ticksToLive = this.creep.ticksToLive;
}

BaseCreep.prototype.toString = function() {
    return '[creep ' + this.name + ']';
};

// Screeps Creep method wrappers

BaseCreep.prototype.attack = function(target) {
    return this.creep.attack(target);
};

BaseCreep.prototype.attackController = function(target) {
    return this.creep.attackController(target);
};

BaseCreep.prototype.build = function(target) {
    return this.creep.build(target);
};

BaseCreep.prototype.cancelOrder = function(methodName) {
    return this.creep.cancelOrder(methodName);
};

BaseCreep.prototype.claimController = function(target) {
    return this.creep.claimController(target);
};

BaseCreep.prototype.dismantle = function(target) {
    return this.creep.dismantle(target);
};

BaseCreep.prototype.drop = function(resourceType, amount) {
    return this.creep.drop(resourceType, amount);
};

BaseCreep.prototype.getActiveBodyparts = function(type) {
    return this.creep.getActiveBodyparts(type);
};

BaseCreep.prototype.harvest = function(target) {
    return this.creep.harvest(target);
};

BaseCreep.prototype.heal = function(target) {
    return this.creep.heal(target);
};

BaseCreep.prototype.move = function(direction) {
    return this.creep.move(direction);
};

BaseCreep.prototype.moveByPath = function(path) {
    return this.creep.moveByPath(path);
};

BaseCreep.prototype.moveTo = function(target, opts) {
    return this.creep.moveTo(target, opts);
};

BaseCreep.prototype.notifyWhenAttacked = function(enabled) {
    return this.creep.notifyWhenAttacked(enabled);
};

BaseCreep.prototype.pickup = function(target) {
    return this.creep.pickup(target);
};

BaseCreep.prototype.rangedAttack = function(target) {
    return this.creep.rangedAttack(target);
};

BaseCreep.prototype.rangedHeal = function(target) {
    return this.creep.rangedHeal(target);
};

BaseCreep.prototype.rangedMassAttack = function() {
    return this.creep.rangedMassAttack();
};

BaseCreep.prototype.repair = function(target) {
    return this.creep.repair(target);
};

BaseCreep.prototype.reserveController = function(target) {
    return this.creep.reserveController(target);
};

BaseCreep.prototype.say = function(text) {
    return this.creep.say(text);
};

BaseCreep.prototype.suicide = function() {
    return this.creep.suicide();
};

BaseCreep.prototype.transfer = function(target, resourceType, amount) {
    return this.creep.transfer(target, resourceType, amount);
};

BaseCreep.prototype.upgradeController = function(target) {
    return this.creep.upgradeController(target);
};

module.exports = BaseCreep;
