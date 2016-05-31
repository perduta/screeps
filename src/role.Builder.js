"use strict";

let BaseCreep = require('role.BaseCreep');

function BuilderCreep(creep) {
    BaseCreep.call(this, creep);
}
BuilderCreep.prototype = new BaseCreep();
BuilderCreep.prototype.constructor = BuilderCreep;



BuilderCreep.prototype.work = function() {
    if (this.carry.energy === 0) {
        this.memory.building = false;
    }
    else if (this.carry.energy === this.carryCapacity) {
        this.memory.building = true;
    }

    if(!this.memory.boosted && this.memory.originRoom === 'E25S2') {
        let reactionLab = Game.getObjectById('572380d7511c137a240b0dab');
        if(reactionLab.mineralType === RESOURCE_LEMERGIUM_HYDRIDE && reactionLab.mineralAmount > 0) {
            this.moveTo(reactionLab);
            let returnCode = reactionLab.boostCreep(this);
            if(returnCode === OK) this.memory.boosted = true;
            return;
        }
    }

    if ( this.memory.building ) {
        // choosing target
        
        // repair everything but walls and ramparts
        if ( !this.memory.target ) {
            let structuresThatNeedRepair = this.room.find(FIND_STRUCTURES, {filter: e =>
                (e.structureType !== STRUCTURE_WALL && e.structureType !== STRUCTURE_RAMPART) &&
                e.hits <= e.hitsMax * 0.75 && e.hitsMax !== 0
            });
            let closestStructureThatNeedRepair = this.pos.findClosestByPath(structuresThatNeedRepair);
            if ( closestStructureThatNeedRepair ) {
                this.memory.target = closestStructureThatNeedRepair.id;
                this.memory.mode = 'repair';
            }
        }

        // build anything but roads
        if ( !this.memory.target ) {
            let constructionSites = this.room.find(FIND_CONSTRUCTION_SITES, {filter: e =>
                e.structureType !== STRUCTURE_ROAD
            });
            let closestConstructionSite = this.pos.findClosestByPath(constructionSites);
            if ( closestConstructionSite ) {
                this.memory.target = closestConstructionSite.id;
                this.memory.mode = 'build';
            }
        }

        // build roads
        if ( !this.memory.target ) {
            let constructionSites = this.room.find(FIND_CONSTRUCTION_SITES, {filter: e => 
                e.structureType === STRUCTURE_ROAD
            });
            let closestConstructionSite = this.pos.findClosestByPath(constructionSites);
            if ( closestConstructionSite ) {
                this.memory.target = closestConstructionSite.id;
                this.memory.mode = 'build';
            }
        }

        // repair walls and ramparts
        if ( !this.memory.target ) {
            let structuresThatCanBeStrengthen = this.room.find(FIND_STRUCTURES, {filter: e =>
                (e.structureType === STRUCTURE_WALL || e.structureType === STRUCTURE_RAMPART) &&
                e.hits <= this.room.memory.durability
            });
            let closestStructureThatCanBeStrengthen = this.pos.findClosestByPath(structuresThatCanBeStrengthen);
            if ( closestStructureThatCanBeStrengthen ) {
                this.memory.target = closestStructureThatCanBeStrengthen.id;
                this.memory.mode = 'strengthen';
            }
            else {
                let structuresThatCanBeStrengthen = this.room.find(FIND_STRUCTURES, {filter: e =>
                    (e.structureType === STRUCTURE_WALL || e.structureType === STRUCTURE_RAMPART)
                });
                if ( structuresThatCanBeStrengthen.length ) this.room.memory.durability += 25000;
            }
        }

        // working on target
        let target = Game.getObjectById(this.memory.target);
        if ( target ) {
            if ( !this.pos.inRangeTo(target, 3) ) this.moveTo(target);
            switch ( this.memory.mode ) {
                case 'repair':
                    this.repair(target);
                    if ( target.hits === target.hitsMax ) delete this.memory.target;
                break;
                case 'build':
                    this.build(target);
                break;
                case 'strengthen':
                    this.repair(target);
                    if ( target.hits >= this.room.memory.durability) delete this.memory.target;
                break;
            }
        }
        else delete this.memory.target;
    }

    // going for some energy
    // TODO: add spawns as energyTanks
    else {
        let energyTanks = this.room.find(FIND_STRUCTURES, { filter: e =>
            (e.structureType === STRUCTURE_STORAGE || e.structureType === STRUCTURE_CONTAINER)
        });
        let closestEnergyTank = this.pos.findClosestByPath(energyTanks);
        if ( closestEnergyTank ) {
            this.moveTo(closestEnergyTank);
            if( this.pos.isNearTo(closestEnergyTank) ) closestEnergyTank.transfer(this.creep, RESOURCE_ENERGY);
            return;
        }

        let spawns = this.room.find(FIND_MY_STRUCTURES, {filter: e => e.structureType === STRUCTURE_SPAWN && e.energy === e.energyCapacity});
        let closestSpawn = this.pos.findClosestByPath(spawns);
        if ( closestSpawn ) {
            this.moveTo(closestSpawn);
            if ( this.pos.isNearTo(closestSpawn) ) closestSpawn.transferEnergy(this.creep);
            return;
        }
    }
};

module.exports = BuilderCreep;
