const HeroOptions = require('../databaseOption/HeroOptions')
const TroopOptions = require('../databaseOption/TroopOptions')
const BaseOptions = require('../databaseOption/BaseOptions')
const COMMANDS = require('../commands')
const ClientManager = require('../handler/ClientManager')

module.exports = {
    heroRecennectServer: function (client,parameters) {
        this.client = client
        let heroID = parameters[0]

        //find your hero in database
        HeroOptions.findHeroByHeroID(heroID)
            .then(document => {
                this.self = document
                return HeroOptions.findHeroByHeroID(document.anamy)
            }).then(anamy => {
                this.anamy = anamy
                return BaseOptions.findBaseByObjectID(anamy.base)
            }).then(anamyBase => {
                this.anamyBase = anamyBase
                return BaseOptions.findBaseByObjectID(this.self.base)
            }).then(selfBase => {
                this.selfBase = selfBase
                this.findSelfTroops()  
                this.findAnamyTroops()
            })
    },

    findSelfTroops: function () {
        this.selfTroops = []
        let troops = this.self.troops
        for (let i = 0; i < troops.length; i++) {
            let troop = troops[i]
            TroopOptions.findTroopByObjecyID(troop).then(res => {
                this.selfTroops.push(res)
                if(this.selfTroops.length === 3 && this.anamyTroops.length === 3){
                    this.linkSendData()
                }
            })
        }
    },

    findAnamyTroops: function () {
        this.anamyTroops = []
        let troops = this.anamy.troops
        for (let i = 0; i < troops.length; i++) {
            let troop = troops[i]
            TroopOptions.findTroopByObjecyID(troop).then(res => {
                this.anamyTroops.push(res)
                if(this.selfTroops.length === 3 && this.anamyTroops.length === 3){
                    this.linkSendData()
                }
            })
        }
    },

    linkSendData:function(){
        let mapdata = {}
        mapdata.self = {}
        mapdata.anamy = {}
        //hero id
        mapdata.self.hero_id = this.self.hero_id
        mapdata.anamy.hero_id = this.anamy.hero_id
        //hero troops
        mapdata.self.troops =  this.selfTroops
        mapdata.anamy.troops = this.anamyTroops
        //hero base
        mapdata.self.base = this.selfBase
        mapdata.anamy.base = this.anamyBase

        ClientManager.sendSimpleData(this.client,COMMANDS.RECONNECT_RECEIVE,mapdata)
    }

}