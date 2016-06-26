'use strict';

var Kernel = require('kernel.Kernel');

require('prototypes.Room');
require('prototypes.Creep');

module.exports.loop = function () {
  global.kernel = new Kernel();

  kernel.queueProcess('controller.creeps.Controller');
  kernel.queueProcess('controller.rooms.Controller');

  kernel.loop();
};
