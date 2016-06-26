'use strict';

class Kernel {
  constructor() {
    this.CPU_SAFE_LIMIT = 1;
    this.CPU_LOCK = Memory.CPU_LOCK;
    this.BUCKET_LOW = 5000;
    this.CPU_SAVE = 10;
    this.CPU_MAXIMUM = 500;
    this.queue = [];

    console.log('tick #' + Game.time + ' kernel initialization');
  }

  getLimit() {
    if(this.CPU_LOCK !== undefined) return this.CPU_LOCK;
    if(Game.cpu.bucket >= this.BUCKET_LOW) {
      return this.CPU_MAXIMUM - this.CPU_SAFE_LIMIT;
    }
    else {
      return Game.cpu.limit - this.CPU_SAVE - this.CPU_SAFE_LIMIT;
    }
  }

  queueProcess(className, opts) {
    let processData = {class: className, opts: opts};
    this.queue.push(processData);
  }

  loop() {
    let returnCode = this.run();
    if(returnCode === 1) {
      console.log('CPU limit reached!');
      console.log('Processes in queue: ' + this.queue.length);
    }
    console.log('CPU used: ' + Game.cpu.getUsed() + '/' + this.getLimit());
    console.log();
  }

  run() {
    if(Game.cpu.getUsed() >= this.getLimit()) {
      return 1;
    }
    if(this.queue.length === 0) {
      return 0;
    }
    let processData = this.queue.shift();
    let ProcessClass = require(processData.class);
    let process = new ProcessClass(processData.opts);
    try {
      process.run();
    } catch (err) {
      console.log('Error inside process ' + process.name + ':', err);
    }
    this.run();
  }
}

module.exports = Kernel;
