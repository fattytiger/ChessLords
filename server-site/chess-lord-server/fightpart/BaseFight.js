const troopOption = require('../databaseOption/TroopOptions')
const baseOption  = require('../databaseOption/BaseOptions')
const clientManager = require('../handler/ClientManager')
const COMMANDS = require('../commands')

FIGHT_RELATIONSHIP = {
    ARCHER:10,
    SOLDIER:30,
    CAVALRY:20
}

module.exports = {
    baseFighting:function(parameters){
        let attackerID = parameters[0]
        let baseID = parameters[1]
        //find attack troop in database
        troopOption.findTroopByObjecyID(attackerID)
        .then((resolve,reject) => {
            if(!resolve){
                reject
            }
            this.attacker = resolve
            this.troopType = resolve.troop_type
            return true
        }).then((resolve,reject) => {
            if(resolve !== true){
                reject
            }
            return baseOption.findBaseByObjectID(baseID)
        }).then((resolve,reject) => {
            if(!resolve){
                reject
            }
            this.baseHP = resolve.base_hp
            return true
        }).then((resolve,reject) => {
            if(resolve !== true){
                reject
            }
            let changedHP = this.changeBaseHP()
            return baseOption.updateBaseHPByObjectID(changedHP,baseID)
        }).then((resolve,reject) => {
            if(!resolve){
                reject
            }
            return baseOption.findBaseByObjectID(baseID)
        }).then((resolve,reject) => {
            if(!resolve){
                reject
            }
            this.defender = resolve
            let senddata = this.encapsulateSendData(this.attacker,this.defender)
            clientManager.sendBroadCastData(COMMANDS.RECEIVE_FIGHT_BASE,senddata)
        })
    },

    encapsulateSendData:function(attacker,defender){
        let senddata = {}
        senddata.defender = defender
        senddata.attacker = attacker
        return senddata
    },

    changeBaseHP:function(){
        if(this.troopType === 1){
            this.baseHP -= FIGHT_RELATIONSHIP.SOLDIER
            return this.baseHP
        }
        if(this.troopType === 2){
            this.baseHP -= FIGHT_RELATIONSHIP.CAVALRY
            return this.baseHP
        }
        if(this.troopType === 3){
            this.baseHP -= FIGHT_RELATIONSHIP.ARCHER
            return this.baseHP
        }
    }
}