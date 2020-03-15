const COMMANDS = require('../commands')
const clientManager = require('../handler/ClientManager')
const heroOptions = require('../databaseOption/HeroOptions')
const troopOptions = require('../databaseOption/TroopOptions')
const baseOptions = require('../databaseOption/BaseOptions')

const RED_CAMP = 'red'
const BLUE_CAMP = 'blue'
module.exports = {

    mapdata: function (client, parameters) {
        //get hero id
        let heroID = parameters[0]

        //find the hero camp
        heroOptions.findHeroByHeroID(heroID)
            .then((document) => {
                let troops = document.troops
                let heroCamp = document.camp
                if (troops.length === 0) {
                    this.originMapData(heroID, heroCamp)
                }
                if (troops.length !== 0) {
                    this.masterMapData(heroID, heroCamp)
                }
            })
    },

    originMapData: function (hero_id) {
        let heroID = hero_id
        //create the solider

        //init your troops
        heroOptions.findHeroByHeroID(heroID)
            .then(document => {
                this.camp = document.camp
                if (this.camp === RED_CAMP) {
                    return troopOptions.createRedSoldierByHeroID(heroID)
                }
                if (this.camp === BLUE_CAMP) {
                    return troopOptions.createBlueSoldierByHeroID(heroID)
                }
            }).then(document => {
                if (document.camp === RED_CAMP) {
                    return heroOptions.pushTroopByHeroID(document.hero_id, document._id)
                }
                if (document.camp === BLUE_CAMP) {
                    return heroOptions.pushTroopByHeroID(document.hero_id, document._id)
                }
            }).then(res => {
                if (this.camp === RED_CAMP) {
                    return troopOptions.createRedCavalryByHeroID(heroID)
                }
                if (this.camp === BLUE_CAMP) {
                    return troopOptions.createBlueCavalryByHeroID(heroID)
                }
            }).then(document => {
                if (this.camp === RED_CAMP) {
                    return heroOptions.pushTroopByHeroID(document.hero_id, document._id)
                }
                if (this.camp === BLUE_CAMP) {
                    return heroOptions.pushTroopByHeroID(document.hero_id, document._id)
                }
            }).then(res => {
                if (this.camp === RED_CAMP) {
                    return troopOptions.createRedArcherByHeroID(heroID)
                }
                if (this.camp === BLUE_CAMP) {
                    return troopOptions.createBlueArcherByHeroID(heroID)
                }
            }).then(document => {
                return heroOptions.pushTroopByHeroID(document.hero_id, document._id)
            })

            //init the base info
            .then(() => {
                if (this.camp === RED_CAMP) {
                    return baseOptions.createRedBaseByHeroID(heroID)
                }
                if (this.camp === BLUE_CAMP) {
                    return baseOptions.createBlueBaseByHeroID(heroID)
                }
            }).then(document => {
                console.log(document)
                return heroOptions.updateBaseByHeroID(heroID,document._id)
            }).then((res) => {
                return heroOptions.findHeroByHeroID(heroID)
            }).then(document => {
                this.sendMapData(document.hero_id, document.troops, document.base)
            })
    },

    sendMapData: function (hero_id, troops, base) {
        let heroID = hero_id
        let troopArr = []
        troops.forEach(troop => {
            troopOptions.findTroopByObjecyID(troop)
                .then(document => {
                    //push the troops
                    troopArr.push(document)
                    if (troopArr.length === 3) {

                        baseOptions.findBaseByHeroID(heroID)
                            .then(document => {
                                let map = {}
                                map.hero = {}
                                map.base = document
                                map.hero.hero_id = heroID
                                map.hero.troops = troopArr
                                //send map data
                                clientManager.sendBroadCastData(COMMANDS.MAP_DATA, map)
                            })                        
                    }
                })
        });
    },


    masterMapData: function (hero_id, hero_camp) {
        let heroID = hero_id
        heroOptions.findHeroByHeroID(heroID)
            .then(document => {
                this.sendMapData(heroID, document.troops)
            })
    }

}