'use strict';

Creep.prototype.isFull = function () {
  return _.sum(this.carry) === this.carryCapacity;
};
