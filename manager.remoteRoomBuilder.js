"use strict";

function buildRoadBetween(start, end) {
    let pf = PathFinder.search(start, end, {plainCost: 1, swampCost: 1});
    _.forEach(pf.path, e => {
        e.createConstructionSite(STRUCTURE_ROAD);
    });
}

function buildRoadsToSources(remoteRoom) {
    _.forEach(remoteRoom.memory.sources, source => {
        source = Game.getObjectById(source.source);
        if(source)
            buildRoadBetween(remoteRoom.pos, {pos: source.pos, range: 1});
    });
}

function clearCS(remoteRoom) {
    remoteRoom.room.find(FIND_CONSTRUCTION_SITES).map(e => {
        e.remove();
    });
}

function remoteRoomBuilder(originRoom) {
    let i = 0;
    while(true) {
        let remoteRoom = Game.flags[originRoom + '_remoteRoom_' + i];
        i++;
        if(!remoteRoom) break;
        buildRoadsToSources(remoteRoom);
    }
}

module.exports = function() {
    if(Game.time % 100 !== 0) return;
    _.forEach(Game.rooms, room => {
        remoteRoomBuilder(room.name);
    });
};
