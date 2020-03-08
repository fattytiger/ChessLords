const COMMANDS = require('../commands')
const troopOptions = require('../databaseOption/TroopOptions')
const clientManager = require('../handler/ClientManager')
const heroOptions = require('../databaseOption/HeroOptions')

const TROOP_RELATIONSHIP = {

    ARCHER_ATTACK_SOLDIER:30,
    ARCHER_ATTACK_KAVALRY:15,
    ARCHER_ATTACK_ARCHER:20,
    SOLDIER_ATTACK_KAVALRY:30,
    SOLDIER_ATTACK_ARCHER:15,
    SOLDIER_ATTACK_SOLDIER:20,
    KAVALRY_ATTACK_ARCHER:15,
    KAVALRY_ATTACK_SOLDIER:30,
    KAVALRY_ATTACK_KAVALRY:20
}



module.exports = {
    troopFighting:function(parameters){
        let attackerID = parameters[0]
        let defenderID = parameters[1]

        troopOptions.findTroopByObjecyID(attackerID)
        .then((document,reject) =>{
            if(!document){
                reject
            }
            this.attackerInfo = document
            this.attackerTroopType = document.troop_type
            return troopOptions.findTroopByObjecyID(defenderID)
        }).then((document,reject) => {
            if(!document){
                reject
            }
            this.defenderTroopType = document.troop_type
            return this.calculatelossHP(this.attackerTroopType,this.defenderTroopType)
        })
        //find the troop
        .then((result,reject) => {
            if(!result){
                reject
            }
            this.looseHP = result
            return troopOptions.findTroopByObjecyID(defenderID)
        })
        .then((document,reject) => {
            if(!document){
                reject
            }
            this.currentHP = document.troop_hp
            this.finalHP   = this.currentHP - this.looseHP
            return this.finalHP 
        })
        .then((result,reject) => {
            if(!result){
                reject
            }
            console.log(result)
            return troopOptions.updateTroopHPByID(defenderID,result)
        }).then((result,reject) => {
            if(!result){
                reject
            }
            return troopOptions.findTroopByObjecyID(defenderID)
        }).then((document,reject) => {
            if(!document){
                reject
            }
            this.defenderInfo = document
            let senddata = {}
            senddata.attacker = this.attackerInfo
            senddata.defender = this.defenderInfo
            clientManager.sendBroadCastData(COMMANDS.RECEIVE_TROOP_FIGHT,senddata)
        })
    },

    calculatelossHP:function(attacker_troop_type,defender_troop_type){
        return new Promise((resolve,reject) => {
            if(attacker_troop_type === 1 && defender_troop_type === 1){
                let loose = TROOP_RELATIONSHIP.SOLDIER_ATTACK_SOLDIER
                resolve(loose)
            }
            if(attacker_troop_type === 1 && defender_troop_type === 2){
                let loose = TROOP_RELATIONSHIP.SOLDIER_ATTACK_KAVALRY
                resolve(loose)
            }
            if(attacker_troop_type === 1 && defender_troop_type === 3){
                let loose = TROOP_RELATIONSHIP.SOLDIER_ATTACK_ARCHER
                resolve(loose)
            }
            if(attacker_troop_type === 2 && defender_troop_type === 1){
                let loose = TROOP_RELATIONSHIP.KAVALRY_ATTACK_SOLDIER
                resolve(loose)
            }
            if(attacker_troop_type === 2 && defender_troop_type === 2){
                let loose = TROOP_RELATIONSHIP.KAVALRY_ATTACK_KAVALRY
                resolve(loose)
            }
            if(attacker_troop_type === 2 && defender_troop_type === 3){
                let loose = TROOP_RELATIONSHIP.KAVALRY_ATTACK_ARCHER
                resolve(loose)
            }
            if(attacker_troop_type === 3 && defender_troop_type === 1){
                let loose = TROOP_RELATIONSHIP.ARCHER_ATTACK_SOLDIER
                resolve(loose)
            }
            if(attacker_troop_type === 3 && defender_troop_type === 2){
                let loose = TROOP_RELATIONSHIP.ARCHER_ATTACK_KAVALRY
                resolve(loose)
            }
            if(attacker_troop_type === 3 && defender_troop_type === 3){
                let loose = TROOP_RELATIONSHIP.ARCHER_ATTACK_ARCHER
                resolve(loose)
            }
        })
    }
}