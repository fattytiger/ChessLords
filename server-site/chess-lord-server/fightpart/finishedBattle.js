
const troopOptiones = require('../databaseOption/TroopOptions')
const baseOptiones = require('../databaseOption/BaseOptions')
const heroOptiones = require('../databaseOption/HeroOptions')
const ClientManage = require('../handler/ClientManager')
const commands = require('../commands/index')
module.exports = {
    gameFinish:function(parameters){
        //get winner
        let winner = parameters[0]
        //get loser
        let loser = parameters[1]
        //delete the troopes 
        troopOptiones.deleteTroopesByHeroID(winner).then(res => {
            return troopOptiones.deleteTroopesByHeroID(loser)
        }).then(() => {
            return baseOptiones.deleteBaseByHeroID(winner)
        }).then(() => {
            return baseOptiones.deleteBaseByHeroID(loser)
        }).then(() => {
            return heroOptiones.updateHeroIngameByHeroID(winner)
        }).then(() => {
            return heroOptiones.updateHeroIngameByHeroID(loser)
        }).then(() => {
            return heroOptiones.deleteHeroTroopesByHeroID(winner)
        }).then(() => {
            return heroOptiones.deleteHeroTroopesByHeroID(loser)
        }).then(() => {
            return heroOptiones.deleteHeroBaseByHeroID(winner)
        }).then(() => {
            return heroOptiones.deleteHeroBaseByHeroID(loser)
        }).then(res => {
            console.log("hero in game" + res)
            let data = Object.create(null)
            data.winner = winner
            data.loser = loser
            ClientManage.sendBroadCastData(commands.FINISHED_BATTLE,data)
        })
        //delete the bases

        //send finish data to server
    },
}