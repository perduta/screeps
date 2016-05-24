"use strict";

module.exports = function() {
    let destinationLab = Game.getObjectById('572380d7511c137a240b0dab');
    
    let hydrogenLab = Game.getObjectById('572377df163b3c8d24172434');
    let zynthiumLab = Game.getObjectById('572377df163b3c8d24172434');
    
    let lemergiumLab = Game.getObjectById('5723b1fa2074713a74a033b5');
    let keaniumLab = Game.getObjectById('5723b1fa2074713a74a033b5');
    
    Game.rooms.E24S1.terminal.send(RESOURCE_ZYNTHIUM, 100, 'E25S2');
    Game.rooms.E28S2.terminal.send(RESOURCE_KEANIUM, 100, 'E25S2');

    //destinationLab.runReaction(hydrogenLab, lemergiumLab);
    destinationLab.runReaction(keaniumLab, zynthiumLab);
};
