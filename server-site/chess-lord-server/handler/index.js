const COMMANDS = require('../commands')
const LOGIN_SERVER = require('../hero_part/login_server')
module.exports = handle = {
    
    receiveRequest:function(client){
        //listen the message
        client.on("message",function message(message){
            //transfer the data from the client
            let transferData = JSON.parse(message)
            //the request code
            let messageID    = transferData[0]
            //the request parameters
            let parameters   = transferData[1]

            //when hero login the server
            if(messageID === COMMANDS.HERO_LOGIN_SERVER){
                //populate the parameter as client and parameters
                LOGIN_SERVER.heroLoginServer(client,parameters)
            }

            //when hero ready for game
            if(messageID === COMMANDS.HERO_READ){
                //illustrat the hero is ready for game
                LOGIN_SERVER.heroReady(client,parameters)
            }
        })


        //listen the websoket close
        client.on("close",function close(){
            //illustrate the hero is closed of the game
            LOGIN_SERVER.heroCloseServer(client)
        })
    },

}

