'use strict';

Room.prototype._find = Room.prototype.find;
Room.prototype.find = function(type, opts) {
  if(!this._findCache) this._findCache = {};

  let id = JSON.stringify([type, opts]);

  if(id in this._findCache) {
    return this._findCache[id];
  }
  this._findCache[id] = this._find(type, opts);
  return this._findCache[id];
};
