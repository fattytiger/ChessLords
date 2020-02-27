const COMMANDS = require('../commands')
const Troop    = require('../models/move/troop')
const Player   = require('../models/hero/HeroModel')

module.exports = map = {

    init:function(){
        this.BLUE_CAMP = {
            LOCATION:172
        },
        this.RED_CAMP = {
            LOCATION:72
        }
    },

    /**
     * @method init_map init the map data at begining
     * @param client client instance
     * @param param[0] the hero id
     * **/
    init_map:function(client,params){
        //init the constant varaibles
        this.init()
        //get the request data
        let hero_id = params[0]
        
        this.findPlayer(hero_id)
        //find player camp is red or blue
        .then((data) => {
            //blue camp
            if(data.first_join_game === true){
                //save the blue troop into the database
                let tile = this.BLUE_CAMP.LOCATION
                //create troop
                return this.createTroop(data.hero_id,tile)
            }
            //red camp
            if(data.first_join_game === false){
                //save the red troop into the database
                let tile = this.RED_CAMP.LOCATION
                //create troop
                return this.createTroop(data.hero_id,tile)
            }
        })
        //create troop success
        .then((data) => {
            let senddata = {}         
            senddata.players = []
            senddata.players[0] = data
            this.sendDataToclient(client,COMMANDS.MAP_DATA,senddata)
        })
    },

    sendDataToclient:function(client,commands,data){
        //get now date
        let nowDate = new Date()
        //data need to send to client
        let sentdata = [commands,nowDate,data]
        //transfer data
        let transferdata = JSON.stringify(sentdata)
        //send data to client
        client.send(transferdata)
    },

    findPlayer:function(hero_id){
        return new Promise((resolved,reject) => {
            Player.findOne({
                hero_id:hero_id
            },(err,document) => {
                if(err){reject(err)}
                resolved(document)
            })
        })
    },
    findTroop:function(hero_id){
        return new Promise((resolved,reject) => {
            Troop.findOne({
                hero_id:hero_id
            },(err,document) => {
                if(err){
                    reject(err)
                }else{
                    resolved(document)
                }
            })
        })
    },
    createTroop:function(hero_id,tile){
        return new Promise((resolved,reject) => {
            let troop = new Troop({
                hero_id:hero_id,
                tile_from:tile,
                tile_to:tile
            })
            troop.save((err,document) =>{
                if(err){reject(err)}
                resolved(document)
            })
        })
    }
}