function findUnclaimedSourceFlagsIds() {
    var sourceFlagsIds = _.map(_.filter(Game.flags, e => e.color === COLOR_ORANGE && e.memory.sourceId), e => e.id);
    console.log('sourceFlagsIds ' + sourceFlagsIds);
    
    var harvestersWithClaimedSourceFlag = _.filter(Game.creeps, e => e.memory.role === 'remoteHarvester' && e.memory.flagId);
    console.log('harvestersWithClaimedSourceFlag ' + harvestersWithClaimedSourceFlag);

    var claimedSourceFlagsIds = _.map(harvestersWithClaimedSourceFlag, e => e.memory.flagId);
    console.log('claimedSourceFlagsIds ' + claimedSourceFlagsIds);

    var unclaimedSourceFlags = _.without(sourceFlagsIds, claimedSourceFlagsIds);
    console.log('unclaimedSourceFlags ' + claimedSourceFlagsIds);


    return unclaimedSourceFlags;
}

module.exports = c => {
    if (!c.memory.flagId) {
        var firstUnclaimedSourceFlag = Game.getObjectById(findUnclaimedSourceFlagsIds()[0]);
        
        c.memory.flagId = firstUnclaimedSourceFlag.id;
        c.memory.sourceId = firstUnclaimedSourceFlag.memory.sourceId;
    }
    
    var source = Game.getObjectById(c.memory.sourceId);
    var returnCode = c.harvest(source);
    if (returnCode === ERR_NOT_IN_RANGE) c.moveTo(source);
};

