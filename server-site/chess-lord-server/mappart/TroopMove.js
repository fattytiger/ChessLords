const COMMANDS = require('../commands')
const clientManager = require('../handler/ClientManager')
const troopOptions = require('../databaseOption/TroopOptions')

const SOLDIER_CONSUME = [ 
    { NAME:"soldier",CONSUME:20 ,RECOVERY_TIME: 10},
    { NAME:"cavalry",CONSUME:10 ,RECOVERY_TIME: 10},
    { NAME:"archer" ,CONSUME:25 ,RECOVERY_TIME: 5}
 ]

module.exports = {
    troopMove:function(parameters){

        let troopID = parameters[0]
        let changedStmina = parameters[1]
        let tileFrom = parameters[2]
        let tileTo  = parameters[3]

        troopOptions.updateTroopStaminaByID(troopID,changedStmina)
        .then((resolve,reject) => {
            if(!resolve){
                reject
            }
            return troopOptions.updateTroopTileFromByID(troopID,tileFrom)
        }).then((resolve,reject) => {
            if(!resolve){
                reject
            }
            return troopOptions.updateTroopTileToByID(troopID,tileTo)
        }).then((resolve,reject) => {
            if(!resolve){
                reject
            }
            return troopOptions.findTroopByObjecyID(troopID)
        }).then(document => {
            clientManager.sendBroadCastData(COMMANDS.RECEIVE_TROOP_MOVE,document)
        })
    },
}