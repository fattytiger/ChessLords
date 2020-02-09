const COMMANDS = require('../commands')
const player = require('../models/players/player')


module.exports = login_server = {

    /**
     * 
     * @method heroLoginServer  Trigger the HERO_LOGIN_SERVER event
     * @param {Array} parameters 2 elements ,the details as follow commands
     * @param {String} hero_id
     * @param {String} hero_name    
     * 
     * **/
    heroLoginServer: function (client,parameters) {

        let hero_id = parameters[0]
        let hero_name = parameters[1]

        //find player from the database
        player.findOne({
            hero_id: hero_id
        }, function (err, document) {

            //if the document not find .console the err message
            if (err) { console.log(err.message+'find hero failed') }
            //if the document is null. showing the hero was first login the game
            if (document === null) {
                //create the hero by player model
                let hero = new player({
                    hero_id     : hero_id,
                    hero_name   : hero_name,
                    login       : true,
                    ready       : false
                })
                hero.save(function (err, res) {
                    //save hero failed
                    if(err){ console.log(err+'save hero failed') }
                    //create now data
                    let nowDate = new Date()
                    //the result of the save data
                    let messageData = res
                    //the message will be send
                    let meessageSend = [COMMANDS.HERO_LOGIN_SERVER,nowDate,messageData]
                    //send the message to the client
                    client.send(JSON.stringify(meessageSend))
                    //bind the client a property called hero
                    client.hero = res.hero_id
                })
            }
            //if the document is exsited ,illustrate there already have player in database
            if(document){
                //serch condition for seraching hero in database
                let searchCondition = {'hero_id':hero_id}
                //the update condition for updating fields in database
                let updateCondition = {'login':true}
                //update the login filed as true
                player.updateOne(searchCondition,updateCondition,function(err,res){
                    //update error
                    if(err){console.log(err+'update hero error')}
                    //create now date
                    let nowDate = new Date()
                    //find player from the databse
                    player.findOne({hero_id:hero_id},function(err,res){
                        //find hero error
                        if(err){console.log(err+'find hero error')}
                        //the result of the data find from the database
                        let msgData = res
                        //the message which need to send
                        let meessageSend = [COMMANDS.HERO_LOGIN_SERVER,nowDate,msgData]
                        //send the data to client
                        client.send(JSON.stringify(meessageSend))
                        //bind the client a property called hero
                        client.hero = res.hero_id
                    })
                })
            }
        })

    },

    /**
     * @method heroReady Trigger the COMMANDS.HERO_READ event
     * @param {Object} client the client instance 
     * @param {Array} parameters have one element ,show as follow
     * @param {String} hero_id 
     * **/
    heroReady: function (client,parameters) {
        

        let hero_id = parameters[0]
        //find the hero from the database
        player.findOne({hero_id:hero_id},function(err,res){
            if(err){console.log(err+'find hero error');}
            let nowDate = new Date()
            //the detail data of the message
            let messageData = res
            //the message need to send to client
            let messageSend = [COMMANDS.HERO_READ,nowDate,nowDate,messageData]
            //send the data to client
            client.send(JSON.stringify(messageSend))
        })
    },

    /**
     * @param {Object} client the instance of the client
     * **/
    heroCloseServer: function (client) {
        //find all the data in client
        player.find({},function(err,res){
            if(err){console.log(err,'find the hero error')}
            //Traverse all hero in database
            for (let i = 0; i < res.length; i++) {
                //get hero_id from the element 
                let item = res[i].hero_id
                //find the closed client
                if(item === client.hero){
                    //search condition
                    let searchCondition = {hero_id:item}
                    //update condition
                    let updateCondition = {'login':false}
                    //update hero
                    player.updateOne(searchCondition,updateCondition,function(err,res){
                        if(err){console.log(err+'update error')}
                    })
                }
            }
        })
    }
}