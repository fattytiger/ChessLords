const COMMANDS = require('../commands')
const LOGIN_SERVER = require('../heropart/LoginServer')
const clientManager = require('../handler/ClientManager')
const troopMove = require('../mappart/TroopMove')
const troopFight = require('../fightpart/TroopFight')
const baseFight  = require('../fightpart/BaseFight')
const reconnectServer = require('../heropart/ReconnectServer')
const finishedBattle = require('../fightpart/finishedBattle')
const MAP = require('../mappart/map')

module.exports = {
    onClientMessage: function (client) {
        //listen the message
        client.on("message", function message(message) {
            //transfer the data from the client
            let transferData = JSON.parse(message)
            //the request code
            let messageID = transferData[0]
            //the request parameters
            let parameters = transferData[1]

            //when hero login the server
            if (messageID === COMMANDS.HERO_LOGIN) {
                LOGIN_SERVER.login(client, parameters)
            }
            //when hero ready for game
            if (messageID === COMMANDS.HERO_READY) {
                
                LOGIN_SERVER.ready(client, parameters)
            }
            //when player login in the game
            if (messageID === COMMANDS.MAP_DATA) {
                MAP.mapdata(client, parameters)
            }

            //Troop move
            if(messageID === COMMANDS.SEND_TROOP_MOVE){
                troopMove.troopMove(parameters)
            }

            //Troop fight
            if(messageID === COMMANDS.REQUEST_TROOP_FIGHT){
                troopFight.troopFighting(parameters)
            }

            //Base fight (parameters[0] === attackerID,parameters[1] === baseID)
            if(messageID === COMMANDS.REQUEST_FIGHT_BASE){
                baseFight.baseFighting(parameters)
            }

            if(messageID === COMMANDS.RECONNECT_REQUEST){
                reconnectServer.heroRecennectServer(client,parameters)
            }

            //Finished battle ,have one 
            if(messageID === COMMANDS.FINISHED_BATTLE){
                finishedBattle.gameFinish(parameters)
            }

        })
    },
    onClientClose: function (client) {
        //listen the websoket close
        client.on("close", function close() {
            //illustrate the hero is closed of the game
            LOGIN_SERVER.heroCloseServer(client)
            //delete the client instance
            clientManager.deleteClient(client)
        })
    },
}

