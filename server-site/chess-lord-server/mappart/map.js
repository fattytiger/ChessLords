const COMMANDS = require('../commands')
const clientManager = require('../handler/ClientManager')
const heroOptions = require('../databaseOption/HeroOptions')
const troopOptions = require('../databaseOption/TroopOptions')

const RED_CAMP = 'red'
const BLUE_CAMP = 'blue'
module.exports = {

    mapdata:function(client,parameters){
        //get hero id
        let heroID = parameters[0]
        console.log(heroID)

        //find the hero camp
        heroOptions.findHeroByHeroID(heroID)
        .then((document) => {
            return document.camp
        })
        //create the solider
        .then(camp => {
            if(camp === RED_CAMP){
                return troopOptions.createRedSoldierByHeroID(heroID)
            }
            if(camp === BLUE_CAMP){
                return troopOptions.createBlueSoldierByHeroID(heroID)
            }
        }).then((document) => {
            if(document.camp === RED_CAMP){
                return troopOptions.createRedCavalryByHeroID(heroID)
            }
            if(document.camp === BLUE_CAMP){
                return troopOptions.createBlueCavalryByHeroID(heroID)
            }
        }).then((document) => {
            if(document.camp === RED_CAMP){
                return troopOptions.createRedArcherByHeroID(heroID)
            }
            if(document.camp === BLUE_CAMP){
                return troopOptions.createBlueArcherByHeroID(heroID)
            }
        }).then((document) => {
            console.log(document)
        })

        //crate the cavalry

        //create the archer


        //save the troop information interms of the camp

        //give the troop correct position
    }
    
}